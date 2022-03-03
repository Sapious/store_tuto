import { GET_PRODUCTS, PRODUCT_ERROR } from "../constants/actions";
const initialState = {
	products: [],
	product: null,
	isLoading: false,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_PRODUCTS:
			return {
				...state,
				products: payload,
			};
		case PRODUCT_ERROR:
			return {
				isLoading: false,
				products: [],
				product: null,
				error: payload,
			};
		default:
			return state;
	}
}
