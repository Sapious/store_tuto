import axios from "axios";
import { AUTH_ERROR, LOGIN, REGISTER } from "../constants/actions";

export const login = (data) => async (dispatch) => {
	try {
		const res = await axios.post("/auth/login", data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
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
