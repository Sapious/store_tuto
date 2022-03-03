import axios from "axios";
import { GET_PRODUCTS, PRODUCT_ERROR } from "../constants/actions";

export const getProducts = () => async (dispatch) => {
	try {
		const res = await axios.get("/products");
		dispatch({
			type: GET_PRODUCTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_ERROR,
			payload: err,
		});
	}
};
