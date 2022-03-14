import {
	CHECKOUT_ORDER,
	ORDER_ERROR,
	ORDER_LOADING,
} from "../constants/actions";
const initialState = {
	orders: [],
	order: null,
	isLoading: false,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ORDER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case CHECKOUT_ORDER:
			return {
				...state,
				order: payload,
				isLoading: false,
			};
		case ORDER_ERROR:
			return {
				isLoading: false,
				orders: [],
				order: null,
				error: payload,
			};
		default:
			return state;
	}
}
