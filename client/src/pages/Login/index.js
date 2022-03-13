import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../actions/auth.actions";
import Spinner from "../../shared/Spinner";
const Login = () => {
	const dispatch = useDispatch();
	const { isLoading, isAuthenticated } = useSelector((state) => {
		return state.authReducers;
	});
	const [Form, setForm] = useState({
		password: "",
		email: "",
	});
	const onInputChange = (e) => {
		e.preventDefault();
		setForm({ ...Form, [e.target.name]: e.target.value });
	};
	const onSubmitForm = (e) => {
		e.preventDefault();

		dispatch(login(Form));
		setForm({
			email: "",
			password: "",
		});
	};

	if (isAuthenticated) {
		return <Navigate to={"/"} />;
	}
	return isLoading ? (
		<Spinner />
	) : (
		<div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5 max-w-2xl mx-auto">
			<div>
				<h3 className="text-lg leading-6 font-medium text-gray-900">
					Personal Information
				</h3>
				<p className="mt-1 max-w-2xl text-sm text-gray-500">
					Use a permanent address where you can receive mail.
				</p>
			</div>
			<form
				onSubmit={(e) => onSubmitForm(e)}
				className="space-y-6 sm:space-y-5">
				<div className="w-full">
					<label
						htmlFor="email"
						className=" text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
						Email address
					</label>
					<div className="mt-1 sm:mt-0">
						<input
							required
							value={Form.email}
							onChange={(e) => onInputChange(e)}
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							className=" w-full  py-2 px-4 outline-none border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>
				<div className="w-full">
					<label
						htmlFor="password"
						className=" text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
						Password
					</label>
					<div className="mt-1 sm:mt-0">
						<input
							required
							value={Form.password}
							onChange={(e) => onInputChange(e)}
							id="password"
							name="password"
							type="password"
							autoComplete="password"
							className=" w-full  py-2 px-4 outline-none border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>
				<button
					className="bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
					type="submit">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
