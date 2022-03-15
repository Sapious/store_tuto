import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../actions/auth.actions";
import { getOwnedCart } from "../../actions/cart.actions";
const Header = () => {
	const navigation = [{ name: "categories", to: "/categories" }];
	const [Query, setQuery] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const { isAuthenticated } = useSelector((state) => state.authReducers);
	const { items } = useSelector((state) => state.cartReducers);
	const dispatch = useDispatch();
	const goToSearch = (e) => {
		let queryString = "";
		const regex = /q=.*$/i;
		if (location.search.search("q=") !== -1) {
			queryString = location.search.replace(regex, `q=${Query}`);
		} else {
			queryString += location.search ? location.search : "?" + `&q=${Query}`;
		}
		navigate(`/search${queryString}`);
	};

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(getOwnedCart());
		}
	}, [isAuthenticated]);
	const getNumberOfItems = (items) => {
		let sum = 0;
		items.forEach((element) => {
			sum += element.quantity;
		});
		return sum;
	};
	return (
		<header className="bg-indigo-600">
			<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
				<div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
					<div className="flex items-center">
						<Link to="/">
							<span className="sr-only">Workflow</span>
							<img
								className="h-10 w-auto"
								src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
								alt=""
							/>
						</Link>
						<div className="flex justify-start items-center gap-4">
							<div className="hidden ml-10 space-x-8 lg:block">
								{navigation.map((link) => (
									<Link
										key={link.name}
										to={link.to}
										className="text-base capitalize font-medium text-white hover:text-indigo-50">
										{link.name}
									</Link>
								))}
							</div>
						</div>
					</div>
					<div className="flex justify-center items-center">
						<input
							className="outline-none px-4 py-2 border border-solid border-gray-600 rounded-l-md"
							type="text"
							onChange={(e) => setQuery(e.target.value)}
							value={Query}
							placeholder="search"
						/>
						<button
							onClick={(e) => goToSearch(e)}
							className="bg-white py-2 px-4 border-gray-600 border border-solid border-l-0 rounded-r-md">
							Search
						</button>
					</div>
					<div className="ml-10 flex justify-end items-center gap-2">
						{isAuthenticated ? (
							<Fragment>
								<Link to="/cart" className="relative p-2 cursor-pointer">
									<i className="fas fa-shopping-cart text-white text-3xl"></i>
									<span className="bg-red-200 rounded-full font-bold px-1.5 py-0.5 right-0 absolute text-xs">
										{items ? getNumberOfItems(items) : 0}
									</span>
								</Link>
								<button
									onClick={() => dispatch(logout())}
									className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
									Logout
								</button>
							</Fragment>
						) : (
							<Fragment>
								<Link
									to="/register"
									className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
									Sign up
								</Link>
								<Link
									to="/login"
									className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
									Sign in
								</Link>
							</Fragment>
						)}
					</div>
				</div>
				<div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
					{navigation.map((link) => (
						<Link
							key={link.name}
							to={link.to}
							className="text-base capitalize font-medium text-white hover:text-indigo-50">
							{link.name}
						</Link>
					))}
				</div>
			</nav>
		</header>
	);
};

export default Header;
