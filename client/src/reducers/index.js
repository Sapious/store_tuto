import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import productReducers from "./product.reducers";
import categoryReducers from "./category.reducers";
import cartReducers from "./cart.reducers";
import orderReducers from "./order.reducers";
export default combineReducers({
	authReducers,
	productReducers,
	categoryReducers,
	cartReducers,
	orderReducers,
});
