import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../actions/cart.actions";
const ProductItem = ({ product }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state) => state.authReducers);
	return (
		<div>
			<Link to={`/products/${product.slug}`}>
				<div className="relative">
					<img
						src={product.image}
						alt={product.imageAlt}
						className="w-full h-72 object-center object-cover"
					/>

					<div className="mt-4">
						<h3 className="text-sm font-medium text-gray-900 truncate">
							{product.title}
						</h3>
						<p className="mt-1 text-sm text-gray-500">{product.color}</p>
					</div>
					<div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
						<div
							aria-hidden="true"
							className="absolute inset-x-0 bottom-0 h-72 w-full bg-gradient-to-t from-black opacity-50"
						/>
						<p className=" relative text-lg font-semibold text-white">
							${product.price}
						</p>
					</div>
				</div>
			</Link>
			<div className="mt-6">
				<button
					onClick={() => {
						if (isAuthenticated) {
							dispatch(
								addToCart({
									product: product._id,
									price: product.price,
									quantity: 1,
								})
							);
						} else {
							navigate("/login");
						}
					}}
					type="button"
					className="flex w-full bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200">
					Add to bag
				</button>
			</div>
		</div>
	);
};

export default ProductItem;
