import * as actionTypes from "../actions/actions";

const initialState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, loading: true };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
        error: action.payload.error,
      };
    case actionTypes.AUTH_LOGOUT:
      return initialState
    default:
      return state;
  }
};

export default authReducer;
