import axios from "axios";
import {
	CHECKOUT_ORDER,
	ORDER_ERROR,
	ORDER_LOADING,
	EMPTY_CART,
} from "../constants/actions";

export const checkoutOrder = () => async (dispatch) => {
	dispatch({
		type: ORDER_LOADING,
	});

	try {
		const res = await axios.get("/orders/checkout");
		dispatch({
			type: CHECKOUT_ORDER,
			payload: res.data,
		});
		dispatch({
			type: EMPTY_CART,
		});
	} catch (err) {
		dispatch({
			type: ORDER_ERROR,
			payload: err,
		});
	}
};
