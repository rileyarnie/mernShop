import * as actionTypes from "./actions";
import axios from "axios";

const BASE_URL = "http://localhost:5000/";

export const gettingProducts = () => (dispatch) => {
  axios
    .get(`${BASE_URL}products`)
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
