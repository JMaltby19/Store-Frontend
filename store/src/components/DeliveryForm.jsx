export const DeliveryForm = () => {
	return (
		<div className="flex-1 bg-white text-black p-5 rounded-lg shadow-lg">
			<h2 className="text-2xl font-bold mb-10">Shipping</h2>
			<form>
				<div className="mb-5">
					<div className="w-1/2">
						<label
							htmlFor="firstName"
							className="block mb-2 text-sm font-medium text-gray-600"
						></label>
						<input
							type="text"
							id="firstName"
							placeholder="First Name"
							className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
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
							className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
							required
						/>
					</div>
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
						className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
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
						className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
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
							className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
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
							className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
							required
						/>
					</div>
				</div>

				<div className="flex items-center mb-5">
					<input
						type="checkbox"
						id="sameAddress"
						className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
					/>
					<label
						htmlFor="sameAddress"
						className="ml-2 text-sm font-medium text-gray-900"
					>
						Billing address is the same as shipping address
					</label>
				</div>
			</form>
		</div>
	);
};
