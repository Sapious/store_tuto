import {
	ADD_TO_CART,
	CART_ERROR,
	REMOVE_FROM_CART,
	EMPTY_CART,
	GET_OWN_CART,
} from "../constants/actions";
const initialState = {
	items: [],
	totalPrice: 0,
	totalPriceWithTax: 0,
	taxPercentage: 0,
	isLoading: false,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_OWN_CART:
			return {
				...state,
				...payload,
				isLoading: false,
			};
		case EMPTY_CART:
			localStorage.removeItem("cart");
			return {
				...state,
				items: [],
				totalPrice: 0,
				totalPriceWithTax: 0,
				isLoading: false,
				error: {},
			};
		case ADD_TO_CART:
			let _state = state;
			const itemIndex = _state.items
				.map((itemElement) => itemElement.product.toString())
				.indexOf(payload.product);
			if (itemIndex !== -1) {
				_state.items[itemIndex].quantity =
					_state.items[itemIndex].quantity + payload.quantity;
				_state.items[itemIndex].total =
					_state.items[itemIndex].quantity * _state.items[itemIndex].price;
			} else {
				_state.items.push(payload);
			}
			const newAddCart = JSON.stringify({
				items: _state.items,
				totalPrice: _state.totalPrice,
				totalPriceWithTax: _state.totalPriceWithTax,
				taxPercentage: _state.taxPercentage,
			});
			localStorage.setItem("cart", newAddCart);
			return {
				..._state,
				isLoading: false,
			};
		case REMOVE_FROM_CART:
			let _items = state.items.filter(
				(item) => item.product.toString() !== payload
			);
			const newRemoveCart = JSON.stringify({
				items: _items,
				totalPrice: state.totalPrice,
				totalPriceWithTax: state.totalPriceWithTax,
				taxPercentage: state.taxPercentage,
			});
			localStorage.setItem("cart", newRemoveCart);
			return {
				..._state,
				items: _items,
				isLoading: false,
			};
		case CART_ERROR:
			return {
				items: [],
				totalPrice: 0,
				totalPriceWithTax: 0,
				taxPercentage: 0,
				isLoading: false,
				error: payload,
			};
		default:
			return state;
	}
}
