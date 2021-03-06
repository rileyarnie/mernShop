import * as actionTypes from "../actions/actions";
const initialState = {
  products: [],
  cart: {
    items: [],
    totalPrice: 0,
  },
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      return { ...state, products: action.payload };
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [...state.cart.items, action.payload],
          totalPrice: (state.cart.totalPrice += action.payload.price),
        },
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter(
            (item, index) => index !== action.payload.index
          ),
          totalPrice: (state.cart.totalPrice -= action.payload.item.price),
        },
      };
    default:
      return state;
  }
};

export default productReducer;
