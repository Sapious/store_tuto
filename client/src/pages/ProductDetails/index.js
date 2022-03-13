import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/product.actions";
import Spinner from '../../shared/Spinner'
const ProductDetails = () => {
	const { slug } = useParams();
	const dispatch = useDispatch();
	const { isLoading, product } = useSelector((state) => state.productReducers);
	useEffect(() => {
		dispatch(getProduct(slug));
	}, [slug]);
	return isLoading ? (
		<Spinner />
	) : (
		<div className="bg-white">
			<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
				{/* Product details */}
				<div className="lg:max-w-lg lg:self-end">
					<div className="mt-4">
						<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							{product?.title}
						</h1>
					</div>

					<section aria-labelledby="information-heading" className="mt-4">
						<h2 id="information-heading" className="sr-only">
							Product information
						</h2>

						<div className="flex items-center">
							<p className="text-lg font-bold text-gray-900 sm:text-xl">
								${product?.price}
							</p>

							{/* <div className="ml-4 pl-4 border-l border-gray-300">
								<h2 className="sr-only">Reviews</h2>
								<div className="flex items-center">
									<p className="ml-2 text-sm text-gray-500">
										{reviews.totalCount} reviews
									</p>
								</div>
							</div> */}
						</div>

						<div className="my-4">
							<p className="text-base text-gray-500">{product?.description}</p>
						</div>

						<div className="flex justify-start items-center gap-3">
							<i class="fas fa-check text-green-500"></i>
							<div className="ml-2 text-sm text-gray-500">
								In stock and ready to ship
							</div>
						</div>
					</section>
				</div>

				{/* Product image */}
				<div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
					<div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
						<img
							src={product?.image}
							alt={product?.imageAlt}
							className="w-full h-full object-center object-cover"
						/>
					</div>
				</div>

				{/* Product form */}
				<div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
					<section aria-labelledby="options-heading">
						<h2 id="options-heading" className="sr-only">
							Product options
						</h2>

						<button
							type="button"
							className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
							Add to bag
						</button>
					</section>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
