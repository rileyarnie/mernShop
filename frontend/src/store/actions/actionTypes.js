import * as actionTypes from "./actions";
import axios from "axios";

const BASE_URL = "http://localhost:5000/";

export const gettingProducts = () => (dispatch) => {
  const token = localStorage.getItem("access_token");
  try {
    if (!token) {
    }
  } catch (error) {
    console.log(error);
  }
  axios
    .get(`${BASE_URL}products`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => dispatch(getProducts(res.data.products)))
    .catch((err) => {
      console.log(err);
    });
};

export const getProducts = (data) => {
  return {
    type: actionTypes.GET_PRODUCTS,
    payload: data,
  };
};

export const addToCart = (item) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: item,
  };
};

export const authSignup = (username, email, password) => (dispatch) => {
  dispatch(authStart());
  axios
    .post(`${BASE_URL}auth/register`, { username, email, password })
    .then((res) => {
      dispatch(authSuccess(res.data.access_token));
    })
    .catch((err) => {
      dispatch(authFail(err.response.data));
    });
};

export const checkTokenValidity = (expirationDate) => (dispatch) => {
  setTimeout(() => {
    dispatch(authLogout());
  }, expirationDate * 1000);
};

export const authLogin = (email, password) => (dispatch) => {
  dispatch(authStart());
  axios
    .post(`${BASE_URL}auth/login`, { email, password })
    .then((res) => {
      dispatch(authSuccess(res.data.access_token));
      const expirationDate = new Date(new Date().getTime() + 1000 * 3600);
      localStorage.setItem("expiration_date", expirationDate);
      dispatch(checkTokenValidity(3600));
    })
    .catch((err) => {
      dispatch(authFail(err.response.data));
    });
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  localStorage.setItem("access_token", token);

  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("expiration_date");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem("access_token");
  if (!token || token === "null") {
    dispatch(authLogout());
  }
  const expirationDate = new Date(localStorage.getItem("expiration_date"));
  if (expirationDate <= new Date()) {
    dispatch(authLogout);
  } else {
    dispatch(authSuccess(token));
    dispatch(
      checkTokenValidity(
        (expirationDate.getTime() - new Date().getTime()) / 1000
      )
    );
  }
};
