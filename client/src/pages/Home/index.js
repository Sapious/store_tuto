import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/product.actions";
import { Link } from "react-router-dom";
import Spinner from "../../shared/Spinner";
import ProductItem from "../../shared/ProductItem";
const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts({ limit: 12 }));
	}, []);
	const { isLoading, products } = useSelector((state) => {
		return state.productReducers;
	});
	return isLoading ? (
		<Spinner />
	) : (
		<div className="">
			<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 className="text-xl font-bold text-gray-900">
					Customers also bought
				</h2>

				<div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
					{Array.isArray(products) &&
						products.map((product) => (
							<ProductItem key={product._id} product={product} />
						))}
				</div>
			</div>
		</div>
	);
};

export default Home;
