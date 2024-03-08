import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/authSlice";
import { useRegisterMutation } from "../features/userApiSlice";

export const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user_name, setUser_name] = useState("");

	const [register, { isLoading, isError }] = useRegisterMutation();
	const { userInfo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await register({ user_name, email, password }).unwrap();
			dispatch(registerUser(res));
			navigate("/");
		} catch (error) {
			// Handle error appropriately
			console.log("Error in login:", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
			<div className=" max-w-7xl w-full">
				<h3 className=" text-6xl font-bold text-black">Create Account</h3>
				<h6 className=" text-xl font-medium text-slate-500 pb-4">
					Please enter your details
				</h6>
				<form onSubmit={handleLogin} className="space-y-6">
					<div>
						<label
							htmlFor="username"
							className=" flex justify-start px-1 text-sm font-medium text-gray-700"
						>
							Username
						</label>
						<input
							type="username"
							placeholder="Username"
							id="user_name"
							name="user_name"
							value={user_name}
							onChange={(e) => setUser_name(e.target.value)}
							required
							className="mt-1 block w-full md:w-[32rem] px-3 py-2 bg-white border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>
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
							Create Account
						</button>
					</div>
				</form>
				<div className=" text-slate-400 py-6">
					Already have an account?
					<Link to={"/login"}>
						<span className=" underline "> Login</span>
					</Link>
				</div>
			</div>
		</div>
	);
};
