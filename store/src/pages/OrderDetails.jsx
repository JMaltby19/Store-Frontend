import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetOrderDetailsQuery } from "../features/orderApiSlice";
import { useParams, Link } from "react-router-dom";

export const OrderDetails = () => {
	const { id: productId } = useParams();

	const dispatch = useDispatch();
	const {
		data: orders,
		isLoading,
		isError,
	} = useGetOrderDetailsQuery(productId);
	const { userInfo } = useSelector((state) => state.auth);

	console.log(orders);
	return (
		<section className="relative top-20 text-black md:w-[50rem]">
			{orders && (
				<section>
					<section className="flex flex-col justify-start items-start gap-2 py-4 bg-white shadow-lg rounded-lg p-10 m-4">
						<h1 className="font-semibold text-2xl">ORDER DETAILS</h1>
						<h3>Thank you for your order! Check out the deails below:</h3>
						<h3 className="pt-4 font-extrabold text-gray-500">
							ORDER NO: <span className=" font-normal">{orders.orderId}</span>
						</h3>
						<h3 className="font-extrabold text-gray-500">
							{" "}
							ORDER DATE:{" "}
							<span className=" font-normal">
								{new Date(orders.orderDate).toLocaleDateString()}
							</span>
						</h3>
					</section>

					<section className="flex flex-col justify-start items-start gap-4 py-4 bg-white shadow-lg rounded-lg p-10 m-4">
						<h3 className=" text-xl font-semibold">DELIVERY DETAILS</h3>
						<p>{orders.shippingAddress.firstName}</p>
						<p>{orders.shippingAddress.lastName}</p>
						<p>{orders.shippingAddress.addressLine}</p>
						<p>{orders.shippingAddress.city}</p>
						<p>{orders.shippingAddress.postcode}</p>
						<p>{orders.shippingAddress.phone}</p>
					</section>
					<section>
						<div className="flex flex-col md:flex-row justify-evenly items-center gap-4 py-4 bg-white shadow-lg rounded-lg p-10 m-4">
							{orders.products.map((product) => (
								<div key={product.orderId}>
									<img
										key={product.productId}
										src={product.imageUrl}
										alt={product.name}
										className=" w-36 h-36 object-cover rounded-md ml-2"
									/>
									<div className="flex flex-col justify-center items-center gap-10">
										<Link to={`/product/${product.productId}`}>
											<p className="text-gray-700">{product.name}</p>
										</Link>
										<p className=" font-semibold">£{product.price}</p>
										<p>
											Total:{" "}
											<span className=" font-semibold">
												£{product.totalProductPrice}
											</span>
										</p>

										<p>Qty:{product.quantity}</p>
									</div>
								</div>
							))}
						</div>
					</section>
					<section className="flex flex-col gap-8 py-4 bg-white shadow-lg rounded-lg p-10 m-4 divide-y divide-solid">
						<h1 className="text-left text-xl font-semibold">ORDER TOTAL</h1>
						<div className="flex justify-between items-center text-gray-600 font-semibold">
							SUB-TOTAL <span>£{orders.totalPrice}</span>{" "}
						</div>
						<div className="flex justify-between items-center text-gray-600 font-semibold">
							DELIVERY <span>FREE</span>{" "}
						</div>

						<div className="flex justify-between items-center font-semibold">
							TOTAL: <span>£{orders.totalPrice}</span>
						</div>
					</section>
				</section>
			)}
		</section>
	);
};
