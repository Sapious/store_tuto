import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/product.actions";
import { Link, useLocation } from "react-router-dom";
import Spinner from "../../shared/Spinner";
const Search = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const queries = new URLSearchParams(location.search);

	useEffect(() => {
		dispatch(
			getProducts({
				q: queries.has("q") ? queries.get("q") : "",
				category: queries.has("category") ? queries.get("category") : "",
			})
		);
	}, [queries.get("q")]);
	const { isLoading, products } = useSelector((state) => {
		return state.productReducers;
	});
	return isLoading ? (
		<Spinner />
	) : (
		<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
			<div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
				{products.map((product) => (
					<div key={product._id}>
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
								type="button"
								className="flex w-full bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200">
								Add to bag
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Search;
