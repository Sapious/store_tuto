import axios from "axios";
import {
	GET_CATEGORIES,
	CATEGORY_ERROR,
	CATEGORY_LOADING,
} from "../constants/actions";
export const getCategories = () => async (dispatch) => {
	dispatch({
		type: CATEGORY_LOADING,
	});
	try {
		const res = await axios.get(`/categories`);
		dispatch({
			type: GET_CATEGORIES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: CATEGORY_ERROR,
			payload: err,
		});
	}
};
