import axios from "axios";
import {
	GET_PRODUCTS,
	PRODUCT_ERROR,
	GET_PRODUCT,
	PRODUCT_LOADING,
} from "../constants/actions";

export const getProducts = (queries) => async (dispatch) => {
	dispatch({
		type: PRODUCT_LOADING,
	});
	let queryString = "?";

	for (const key in queries) {
		queryString += key + "=" + queries[key] + "&";
	}

	try {
		const res = await axios.get(`/api/products${queryString}`);
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

export const getProduct = (slug) => async (dispatch) => {
	dispatch({
		type: PRODUCT_LOADING,
	});
	try {
		const res = await axios.get(`/api/products/${slug}`);
		dispatch({
			type: GET_PRODUCT,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_ERROR,
			payload: err,
		});
	}
};
