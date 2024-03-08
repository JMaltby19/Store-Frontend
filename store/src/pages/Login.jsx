import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useLoginMutation } from "../features/userApiSlice";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [login, { isLoading, isError }] = useLoginMutation();
	const { userInfo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await login({ email, password }).unwrap();
			dispatch(loginUser(res));
			navigate("/");
		} catch (error) {
			// Handle error appropriately
			console.log("Error in login:", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
			<div className=" max-w-7xl w-full">
				<h3 className=" text-6xl font-bold text-black pb-6">Login</h3>
				<form onSubmit={handleLogin} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className=" flex justify-start px-1 text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							placeholder="Email"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="mt-1 block w-full md:w-[32rem] px-3 py-2 bg-white border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className=" flex justify-start px-1 text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							placeholder="Password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="mt-1 block w-full md:w-[32rem] px-3 py-2 bg-white border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>
					<div>
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Sign in
						</button>
					</div>
				</form>
				<div className=" text-slate-400 py-6">
					New here?
					<Link to={"/register"}>
						<span className=" underline "> Create Account</span>
					</Link>
				</div>
			</div>
		</div>
	);
};
