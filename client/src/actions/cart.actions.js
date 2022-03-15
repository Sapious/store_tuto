import axios from "axios";
import {
	ADD_TO_CART,
	CART_ERROR,
	CART_LOADING,
	EMPTY_CART,
	GET_OWNED_CART,
	REMOVE_FROM_CART,
} from "../constants/actions";

export const addToCart = (itemData) => async (dispatch) => {
	dispatch({
		type: CART_LOADING,
	});

	try {
		const res = await axios.put("/api/carts/add", { item: itemData });
		dispatch({
			type: ADD_TO_CART,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: CART_ERROR,
			payload: err,
		});
	}
};
export const removeToCart = (itemId) => async (dispatch) => {
	dispatch({
		type: CART_LOADING,
	});

	try {
		const res = await axios.put("/api/carts/remove", { item: itemId });
		dispatch({
			type: REMOVE_FROM_CART,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: CART_ERROR,
			payload: err,
		});
	}
};

export const emptyCart = () => async (dispatch) => {
	dispatch({
		type: CART_LOADING,
	});

	try {
		await axios.delete("/api/carts/empty");
		dispatch({
			type: EMPTY_CART,
		});
	} catch (err) {
		dispatch({
			type: CART_ERROR,
			payload: err,
		});
	}
};
export const getOwnedCart = () => async (dispatch) => {
	dispatch({
		type: CART_LOADING,
	});

	try {
		const res = await axios.get("/api/carts/me");
		dispatch({
			type: GET_OWNED_CART,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: CART_ERROR,
			payload: err,
		});
	}
};
