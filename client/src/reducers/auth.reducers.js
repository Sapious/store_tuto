import {
	LOGIN,
	REGISTER,
	AUTH_ERROR,
	AUTH_LOADING,
	AUTH_CHECK,
	LOGOUT,
} from "../constants/actions";

const initialState = {
	token: localStorage.getItem("token"),
	user: null,
	error: {},
	isLoading: false,
	isAuthenticated: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case AUTH_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case AUTH_CHECK:
			return {
				...state,
				user: payload,
				isAuthenticated: true,
				isLoading: false,
			};
		case LOGIN:
			return {
				...state,
				user: payload.user,
				token: payload.token,
				isAuthenticated: true,
				isLoading: false,
			};
		case REGISTER:
			return {
				...state,
				user: payload,
				isLoading: false,
			};
		case AUTH_ERROR:
			localStorage.removeItem("token");
			return {
				isAuthenticated: false,
				user: null,
				token: null,
				error: payload,
				isLoading: false,
			};
		case LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				isAuthenticated: false,
				user: null,
				token: null,
				isLoading: false,
			};
		default:
			return state;
	}
}
