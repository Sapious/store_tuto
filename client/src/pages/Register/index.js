import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../actions/auth.actions";
const Register = () => {
	const dispatch = useDispatch();
	const [Form, setForm] = useState({
		firstName: "",
		lastName: "",
		password: "",
		confirmPassword: "",
		email: "",
		city: "",
		zipCode: "",
		street: "",
	});
	const onInputChange = (e) => {
		e.preventDefault();
		setForm({ ...Form, [e.target.name]: e.target.value });
	};
	const onSubmitForm = (e) => {
		e.preventDefault();

		dispatch(register(Form));
		setForm({
			firstName: "",
			lastName: "",
			password: "",
			confirmPassword: "",
			email: "",
			city: "",
			zipCode: "",
			street: "",
		});
	};
	return (
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
				<div className="flex justify-between gap-4">
					<div className=" w-1/2">
						<label
							htmlFor="firstName"
							className=" text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
							First name
						</label>
						<div className="mt-1 sm:mt-0">
							<input
								required
								onChange={(e) => onInputChange(e)}
								type="text"
								name="firstName"
								id="firstName"
								autoComplete="givenName"
								className="w-full py-2 px-4 outline-none border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
							/>
						</div>
					</div>

					<div className=" w-1/2">
						<label
							htmlFor="lastName"
							className=" text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
							Last name
						</label>
						<div className="mt-1 sm:mt-0">
							<input
								required
								onChange={(e) => onInputChange(e)}
								type="text"
								name="lastName"
								id="lastName"
								autoComplete="familyName"
								className="w-full py-2 px-4 outline-none border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
							/>
						</div>
					</div>
				</div>
				<div className="w-full">
					<label
						htmlFor="email"
						className=" text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
						Email address
					</label>
					<div className="mt-1 sm:mt-0">
						<input
							required
							onChange={(e) => onInputChange(e)}
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							className=" w-full  py-2 px-4 outline-none border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>
				<div className="flex justify-between gap-4">
					<div className=" w-1/2">
						<label
							htmlFor="password"
							className=" text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
							Password
						</label>
						<div className="mt-1 sm:mt-0">
							<input
								required
								onChange={(e) => onInputChange(e)}
								type="password"
								name="password"
								id="password"
								className="w-full py-2 px-4 outline-none border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
							/>
						</div>
					</div>

					<div className="w-1/2">
						<label
							htmlFor="confirmPassword"
							className=" text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
							Confirm Password
						</label>
						<div className="mt-1 sm:mt-0">
							<input
								required
								onChange={(e) => onInputChange(e)}
								type="password"
								name="confirmPassword"
								id="confirmPassword"
								className="w-full py-2 px-4 outline-none border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-between gap-4">
					<div className="w-1/3">
						<label
							htmlFor="street"
							className=" text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
							Street address
						</label>
						<div className="mt-1 sm:mt-0">
							<input
								required
								onChange={(e) => onInputChange(e)}
								type="text"
								name="street"
								id="street"
								autoComplete="street"
								className=" w-full  py-2 px-4 outline-none border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
							/>
						</div>
					</div>

					<div className="w-1/3">
						<label
							htmlFor="city"
							className=" text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
							City
						</label>
						<div className="mt-1 sm:mt-0">
							<input
								required
								onChange={(e) => onInputChange(e)}
								type="text"
								name="city"
								id="city"
								autoComplete="address-level2"
								className="w-full py-2 px-4 outline-none border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
							/>
						</div>
					</div>
					<div className="w-1/3">
						<label
							htmlFor="zipCode"
							className=" text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
							ZIP / Postal code
						</label>
						<div className="mt-1 sm:mt-0">
							<input
								required
								onChange={(e) => onInputChange(e)}
								type="text"
								name="zipCode"
								id="zipCode"
								autoComplete="zipCode"
								className="w-full py-2 px-4 outline-none border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
							/>
						</div>
					</div>
				</div>
				<button
					className="bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
					type="submit">
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
