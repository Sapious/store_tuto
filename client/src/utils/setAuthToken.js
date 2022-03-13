import axios from "axios";

export const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["access_token"] = token;
		localStorage.setItem("token", token);
	} else {
		delete axios.defaults.headers.common["access_token"];
		localStorage.removeItem("token");
	}
};
