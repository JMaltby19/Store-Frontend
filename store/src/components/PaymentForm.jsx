import { Fragment, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../features/orderApiSlice";
import { clearBasket } from "../features/basketSlice";
import { setOrder } from "../features/orderSlice";
import { useNavigate } from "react-router-dom";

export const PaymentForm = () => {
	const [sameAddress, setSameAddress] = useState(true);
	// const [address_line, setAddress_line] = useState("");
	// const [first_name, setFirst_name] = useState("");
	// const [last_name, setLast_name] = useState("");
	// const [city, setCity] = useState("");
	// const [postcode, setPostcode] = useState("");
	const [createOrder] = useCreateOrderMutation();
	const basket = useSelector((state) => state.basket);
	const { userInfo } = useSelector((state) => state.auth);

	const dispatchOrder = useDispatch();
	const navigate = useNavigate();

	const initialState = {
		first_name: "",
		last_name: "",
		address_line: "",
		city: "",
		postcode: "",
		phone: "",
		email: "",
		cardNumber: "",
		cardCvc: "",
		errors: {},
	};
	const [state, dispatch] = useReducer(formReducer, initialState);

	function formReducer(state, action) {
		switch (action.type) {
			case "SET_FIELD":
				return {
					...state,
					[action.field]: action.value,
				};
			case "SET_ERROR":
				return {
					...state,
					errors: {
						...state.errors,
						[action.field]: action.value,
					},
				};
			default:
				return state;
		}
	}

	const handleInputChange = (e, validator) => {
		const { id, value } = e.target;
		dispatch({ type: "SET_FIELD", field: id, value });

		const isValid = validator(value);
		dispatch({
			type: "SET_ERROR",
			field: id,
			value: isValid ? null : `Invalid${id}`,
		});
	};

	const handleCreateOrder = async (e) => {
		e.preventDefault();

		const {
			first_name,
			last_name,
			address_line,
			city,
			postcode,
			phone,
			email,
			cardNumber,
			cardCvc,
			errors,
			...otherData
		} = state;

		// Basic validation checks
		if (!first_name.trim()) return alert("First name is required");
		if (!last_name.trim()) return alert("Last name is required");
		if (postcode.length <= 5)
			return alert("Postcode needs to be more than 5 characters");

		// Assuming email, phone, cardNumber, and cardCvc are state variables
		// if (!email.includes("@")) return alert("Email must include '@'");
		// if (phone.length !== 11) return alert("Phone number must be 11 digits");
		// if (cardNumber.length !== 16) return alert("Card number must be 16 digits");
		// if (cardCvc.length !== 3) return alert("CVC must be 3 digits");

		if (Object.values(state.errors).some((error) => error !== null)) {
			alert("Please correct the errors before submitting.");
			return;
		}

		const orderData = {
			user_id: userInfo.payload.user_id,
			first_name,
			last_name,
			address_line,
			city,
			postcode,
			items: basket.basketItems,
			total_price: basket.totalPrice,
		};

		try {
			const res = await createOrder(orderData).unwrap();
			// Example: Display a success message or redirect
			console.log(orderData, res.payload[0]);
			alert(`Order created successfully! Order ID: ${res.payload[0]}`);
			// Optionally clear the basket here or navigate to another page

			dispatchOrder(setOrder({ orderData, orderId: res.payload[0] }));
			dispatchOrder(clearBasket());
			navigate("/");
		} catch (error) {
			console.error("Order creation error:", error);
			alert(
				`Failed to create order: ${
					error.data ? error.data.message : "Unknown error"
				}`
			);
		}
	};

	return (
		<div className="lg:w-[40rem] bg-white text-black p-5  rounded-lg shadow-lg">
			<section>
				<h2 className="text-2xl font-bold mb-10">Delivery</h2>
				<form>
					<div className="mb-5 flex flex-row gap-3">
						<div className="w-1/2 ">
							<label
								htmlFor="firstName"
								className="block mb-2 text-sm font-medium text-gray-600"
							></label>
							<input
								type="text"
								id="first_name"
								value={state.first_name}
								// onChange={(e) => setFirst_name(e.target.value)}
								onChange={(e) => handleInputChange(e, first_name)}
								placeholder="First Name"
								className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
								required
							/>
						</div>
						<div className="w-1/2">
							<label
								htmlFor="lastName"
								className="block mb-2 text-sm font-medium text-gray-600"
							></label>
							<input
								type="text"
								id="last_name"
								value={state.last_name}
								// onChange={(e) => setLast_name(e.target.value)}
								onChange={(e) => handleInputChange(e, last_name)}
								placeholder="Last Name"
								className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
								required
							/>
						</div>
					</div>

					<div className="mb-5">
						<label
							htmlFor="address"
							className="block mb-2 text-sm font-medium text-gray-600"
						></label>
						<input
							type="text"
							id="address_line"
							value={state.address_line}
							// onChange={(e) => setAddress_line(e.target.value)}
							onChange={(e) => handleInputChange(e, address_line)}
							placeholder="Address"
							className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
							required
						/>
					</div>

					<div className="mb-5 flex flex-row gap-3">
						<div className="w-1/2 ">
							<label
								htmlFor="city"
								className="block mb-2 text-sm font-medium text-gray-600"
							></label>
							<input
								type="text"
								id="city"
								value={state.city}
								// onChange={(e) => setCity(e.target.value)}
								onChange={(e) => handleInputChange(e, city)}
								placeholder="City"
								className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
								required
							/>
						</div>
						<div className="w-1/2">
							<label
								htmlFor="postcode"
								className="block mb-2 text-sm font-medium text-gray-600"
							></label>
							<input
								type="text"
								id="postcode"
								value={state.postcode}
								// onChange={(e) => setPostcode(e.target.value)}
								onChange={(e) => handleInputChange(e, postcode)}
								placeholder="Postcode"
								className={`block w-full p-3 rounded bg-gray-200 ${
									state.errors.postcode ? "border-red-500" : "border-gray-300"
								} focus:outline-none focus:ring-2 focus:ring-black`}
								required
							/>
							{state.errors.postcode && (
								<p className="text-red-500">{state.errors.postcode}</p>
							)}
						</div>
					</div>

					<div className="mb-5">
						<label
							htmlFor="phone"
							className="block mb-2 text-sm font-medium text-gray-600"
						></label>
						<input
							type="tel"
							id="phone"
							placeholder="Phone"
							className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
							required
						/>
					</div>
				</form>
			</section>

			<section>
				<h2 className="text-2xl font-bold mb-10">Payment</h2>
				<form>
					<div className="mb-5">
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium text-gray-600"
						></label>
						<input
							type="email"
							id="email"
							placeholder="Email Address"
							className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
							required
						/>
					</div>

					<div className="mb-5">
						<label
							htmlFor="cardName"
							className="block mb-2 text-sm font-medium text-gray-600"
						></label>
						<input
							type="text"
							id="cardName"
							placeholder="Cardholder Name"
							className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
							required
						/>
					</div>

					<div className="mb-5">
						<label
							htmlFor="cardNumber"
							className="block mb-2 text-sm font-medium text-gray-600"
						></label>
						<input
							type="text"
							inputMode="numeric"
							placeholder="Card Number"
							id="cardNumber"
							className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
							required
						/>
					</div>

					<div className="flex gap-3 mb-5">
						<div className="w-1/2">
							<label
								htmlFor="cardExpiration"
								className="block mb-2 text-sm font-medium text-gray-600"
							></label>
							<input
								type="text"
								inputMode="numeric"
								id="cardExpiration"
								placeholder="MM/YY"
								className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
								required
							/>
						</div>
						<div className="w-1/2">
							<label
								htmlFor="cardCvc"
								className="block mb-2 text-sm font-medium text-gray-600"
							></label>
							<input
								type="text"
								inputMode="numeric"
								id="cardCvc"
								placeholder="CVC"
								className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
								required
							/>
						</div>
					</div>

					<div className="flex items-center mb-5">
						<input
							type="checkbox"
							id="sameAddress"
							checked={sameAddress}
							onChange={(e) => setSameAddress(e.target.checked)}
							className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
						/>
						<label
							htmlFor="sameAddress"
							className="ml-2 text-sm font-medium text-gray-900"
						>
							Billing address is the same as shipping address
						</label>
					</div>
					{!sameAddress && (
						<section>
							<h2 className="text-2xl font-bold mb-10">Billing</h2>
							<form>
								<div className="mb-5 flex flex-row gap-3">
									<div className="w-1/2 ">
										<label
											htmlFor="firstName"
											className="block mb-2 text-sm font-medium text-gray-600"
										></label>
										<input
											type="text"
											id="firstName"
											placeholder="First Name"
											className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
											required
										/>
									</div>
									<div className="w-1/2">
										<label
											htmlFor="lastName"
											className="block mb-2 text-sm font-medium text-gray-600"
										></label>
										<input
											type="text"
											id="lastName"
											placeholder="Last Name"
											className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
											required
										/>
									</div>
								</div>

								<div className="mb-5">
									<label
										htmlFor="address"
										className="block mb-2 text-sm font-medium text-gray-600"
									></label>
									<input
										type="text"
										id="address"
										placeholder="Address"
										className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
										required
									/>
								</div>

								<div className="mb-5 flex flex-row gap-3">
									<div className="w-1/2 ">
										<label
											htmlFor="city"
											className="block mb-2 text-sm font-medium text-gray-600"
										></label>
										<input
											type="text"
											id="city"
											placeholder="City"
											className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
											required
										/>
									</div>
									<div className="w-1/2">
										<label
											htmlFor="postcode"
											className="block mb-2 text-sm font-medium text-gray-600"
										></label>
										<input
											type="text"
											id="postcode"
											placeholder="Postcode"
											className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
											required
										/>
									</div>
								</div>

								<div className="mb-5">
									<label
										htmlFor="phone"
										className="block mb-2 text-sm font-medium text-gray-600"
									></label>
									<input
										type="tel"
										id="phone"
										placeholder="Phone"
										className="block w-full p-3 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
										required
									/>
								</div>
							</form>
						</section>
					)}

					<button
						type="submit"
						className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
						onClick={handleCreateOrder}
					>
						Process Order
					</button>
				</form>
			</section>
		</div>
	);
};
