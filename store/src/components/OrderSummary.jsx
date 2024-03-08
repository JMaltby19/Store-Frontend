import { useSelector } from "react-redux";

export const OrderSummary = () => {
	const basketItems = useSelector((state) => state.basket.basketItems);
	const totalPrice = useSelector((state) => state.basket.totalPrice);

	return (
		<div className="w-full lg:w-[448px] bg-white text-black p-5 rounded-lg shadow-lg">
			{/* <h2 className="text-2xl font-bold mb-6">Order Summary</h2> */}
			{/* Replace with actual product details */}
			{basketItems &&
				basketItems.map((product) => (
					<li key={product.id} className="flex justify-between border-b py-3">
						<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
							<img
								src={product.image_url}
								alt={product.image_url}
								className="h-full w-full object-cover object-center"
							/>
						</div>
						<div className="flex flex-col justify-start items-center mb-4">
							<span>{product.name}</span>
							<span className=" text-slate-400">£{product.price}</span>
						</div>

						<div className="flex flex-col justify-between items-start border-t mt-6 pt-6 text-black">
							<div className="flex justify-between mb-4">
								<span>Qty</span>
								<span>{product.qty}</span>
							</div>
							<div className="flex justify-between mb-4">
								Subtotal-
								<span> £{product.price * product.qty}</span>
							</div>
							<div className="flex justify-between mb-4">
								<span>Discount-</span>
								<span>£16.00</span>
							</div>

							<div className="flex justify-between mb-4">
								<span>Shipping-</span>
								<span>FREE</span>
							</div>
						</div>
					</li>
				))}
			<div className="flex justify-between font-bold">
				<span>Total</span>
				<span>£{totalPrice}</span>
			</div>
		</div>
	);
};
