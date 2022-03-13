import axios from "axios";
import {
	AUTH_CHECK,
	AUTH_ERROR,
	AUTH_LOADING,
	LOGIN,
	LOGOUT,
	REGISTER,
} from "../constants/actions";
import { setAuthToken } from "../utils/setAuthToken";

export const authcheck = () => async (dispatch) => {
	dispatch({
		type: AUTH_LOADING,
	});

	if (localStorage.getItem("token")) {
		setAuthToken(localStorage.getItem("token"));
	}
	try {
		const res = await axios.get("/auth/check");
		dispatch({
			type: AUTH_CHECK,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
			payload: err,
		});
	}
};
export const login = (data) => async (dispatch) => {
	dispatch({
		type: AUTH_LOADING,
	});
	try {
		const res = await axios.post("/auth/login", data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		setAuthToken(res.data.token);
		dispatch({
			type: LOGIN,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
			payload: err,
		});
	}
};
export const register = (data) => async (dispatch) => {
	dispatch({
		type: AUTH_LOADING,
	});
	try {
		const res = await axios.post("/auth/register", data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		dispatch({
			type: REGISTER,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
			payload: err,
		});
	}
};

export const logout = () => async (dispatch) => {
	dispatch({
		type: AUTH_LOADING,
	});
	dispatch({
		type: LOGOUT,
	});
};
