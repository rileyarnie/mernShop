import { combineReducers } from "redux";
import productReducer from "./products";
import authReducer from "./auth"

const rootReducer = combineReducers({
 productReducer,
 authReducer
});

export default rootReducer;
