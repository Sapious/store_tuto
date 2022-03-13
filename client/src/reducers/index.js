import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import productReducers from "./product.reducers";
import categoryReducers from "./category.reducers";
export default combineReducers({
	authReducers,
	productReducers,
	categoryReducers,
});
