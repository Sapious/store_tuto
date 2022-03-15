import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { emptyCart, getOwnedCart } from "../../actions/cart.actions";
import Spinner from "../../shared/Spinner";
import { checkoutOrder } from "../../actions/order.actions";
const Cart = () => {
	const { items, isLoading, totalPrice, totalPriceWithTax, taxPercentage } =
		useSelector((state) => state.cartReducers);
	const { isAuthenticated } = useSelector((state) => state.authReducers);
	const dispatch = useDispatch();
	useEffect(() => {
		if (isAuthenticated) {
			dispatch(getOwnedCart());
		}
	}, [isAuthenticated]);
	return isLoading ? (
		<Spinner />
	) : (
		<div className="bg-white">
			<div className="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
					Shopping Cart
				</h1>

				<form className="mt-12">
					<div>
						<h2 className="sr-only">Items in your shopping cart</h2>

						<ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
							{items.length &&
								items.map((product) => (
									<li key={product.product._id} className="flex py-6 sm:py-10">
										<div className="flex-shrink-0">
											<img
												src={product.product.image}
												alt={product.imageAlt}
												className="w-24 h-24 rounded-lg object-center object-cover sm:w-32 sm:h-32"
											/>
										</div>

										<div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
											<div>
												<div className="flex justify-between sm:grid sm:grid-cols-2">
													<div className="pr-6">
														<h3 className="text-sm">
															<Link
																to={`/products/${product.product.slug}`}
																className="font-medium text-gray-700 hover:text-gray-800">
																{product.product.title}
															</Link>
														</h3>
														<p className="mt-1 text-sm text-gray-500">
															{product.color}
														</p>
														{product.size ? (
															<p className="mt-1 text-sm text-gray-500">
																{product.size}
															</p>
														) : null}
													</div>

													<p className="text-sm font-medium text-gray-900 text-right">
														{product.price} $
													</p>
												</div>

												<div className="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/2 sm:mt-0">
													<div className="max-w-[120px] ">
														<input
															id={product.product._id}
															name={product.product._id}
															type="number"
															className=" w-full  py-2 px-4 outline-none border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
														/>
													</div>

													<button
														type="button"
														className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3">
														Remove
													</button>
												</div>
											</div>

											<p className="mt-4 flex text-sm text-gray-700 space-x-2">
												{product.inStock ? (
													<i className="fas fa-check text-green-500"></i>
												) : (
													<i className="fas fa-times text-gray-300"></i>
												)}
											</p>
										</div>
									</li>
								))}
						</ul>
					</div>

					{/* Order summary */}
					<div className="mt-10 w-full">
						<div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
							<h2 className="sr-only">Order summary</h2>

							<div className="flow-root">
								<dl className="-my-4 text-sm divide-y divide-gray-200">
									<div className="py-4 flex items-center justify-between">
										<dt className="text-gray-600">Subtotal</dt>
										<dd className="font-medium text-gray-900">
											{totalPrice.toFixed(2)} $
										</dd>
									</div>
									<div className="py-4 flex items-center justify-between">
										<dt className="text-gray-600">Tax</dt>
										<dd className="font-medium text-gray-900">
											{taxPercentage} %
										</dd>
									</div>
									<div className="py-4 flex items-center justify-between">
										<dt className="text-base font-medium text-gray-900">
											Order total
										</dt>
										<dd className="text-base font-medium text-gray-900">
											{totalPriceWithTax.toFixed(2)} $
										</dd>
									</div>
								</dl>
							</div>
						</div>
						<div className="mt-10">
							<button
								onClick={() => {
									dispatch(checkoutOrder());
								}}
								type="button"
								className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
								Checkout
							</button>
						</div>

						<div className="mt-6 text-sm text-center text-gray-500">
							<div className="mb-4">or</div>
							<Link
								to="/"
								className="text-indigo-600 font-medium hover:text-indigo-500">
								Continue Shopping<span aria-hidden="true"> &rarr;</span>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Cart;
