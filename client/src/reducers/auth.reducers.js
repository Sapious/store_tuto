import { LOGIN, REGISTER, AUTH_ERROR } from "../constants/actions";

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
		case LOGIN:
			return {
				...state,
				user: payload.user,
				token: payload.token,
				isAuthenticated: true,
			};
		case REGISTER:
			return {
				...state,
				user: payload,
			};
		case AUTH_ERROR:
			localStorage.removeItem("token");
			return {
				isAuthenticated: false,
				user: null,
				token: null,
				error: payload,
			};
		default:
			return state;
	}
}
