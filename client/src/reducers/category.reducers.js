import {
	GET_CATEGORY,
	GET_CATEGORIES,
	CATEGORY_ERROR,
	CATEGORY_LOADING,
} from "../constants/actions";
const initialState = {
	categories: [],
	category: null,
	isLoading: false,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CATEGORY_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_CATEGORIES:
			return {
				...state,
				categories: payload,
				isLoading: false,
			};
		case GET_CATEGORY:
			return {
				...state,
				category: payload,
				isLoading: false,
			};
		case CATEGORY_ERROR:
			return {
				isLoading: false,
				categories: [],
				category: null,
				error: payload,
			};
		default:
			return state;
	}
}
