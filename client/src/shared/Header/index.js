import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Header = () => {
	const navigation = [{ name: "categories", to: "/categories" }];
	const [Query, setQuery] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const goToSearch = (e) => {
		const queries = new URLSearchParams(location.search);
		let queryString = "?";
		queries.forEach((query, key) => {
			queryString += key + "=" + query + "&";
		});
		navigate(`/search${queryString}q=${Query}`);
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
						{/* <Link to={"/cart"} className="relative p-2 cursor-pointer">
							<i className="fas fa-shopping-cart text-white text-3xl"></i>
							<span className="bg-red-200 rounded-full font-bold px-1.5 py-0.5 right-0 absolute text-xs">
								1
							</span>
						</Link> */}
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
