import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/category.actions";
import { Link } from "react-router-dom";
import Spinner from "../../shared/Spinner";
const Categories = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategories());
	}, []);
	const { isLoading, categories } = useSelector((state) => {
		return state.categoryReducers;
	});
	return isLoading ? (
		<Spinner />
	) : (
		<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
			<div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
				{categories.length &&
					categories.map((category) => (
						<Link
							key={category?._id}
							to={`/search?category=${category?.slug}`}
							className="relative w-56 h-80 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto">
							<span
								aria-hidden="true"
								className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
							/>
							<span className="relative mt-auto text-center text-xl font-bold text-white">
								{category?.title}
							</span>
						</Link>
					))}
			</div>
		</div>
	);
};

export default Categories;
