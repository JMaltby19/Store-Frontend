import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetOrdersQuery } from "../features/orderApiSlice";
import { setPastOrders } from "../features/orderSlice";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";
import { LuShoppingBag } from "react-icons/lu";

export const Orders = () => {
	const dispatch = useDispatch();
	const { data: orders, isLoading, isError } = useGetOrdersQuery();
	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (orders) {
			dispatch(setPastOrders(orders));
		}
	}, [orders, dispatch]);

	if (isLoading) return <div>Loading orders...</div>;
	if (isError) return <div>Error fetching orders.</div>;

	console.log(orders);

	return (
		<section className="relative w-full h-full top-20">
			<section className="text-black mx-auto">
				<div className=" bg-white shadow-lg rounded-lg p-10 m-4 lg:w-[48rem]">
					<LuShoppingBag size={40} />
					<h2 className=" text-left font-semibold text-4xl py-4">My Orders</h2>
					{userInfo && (
						<div className="flex flex-row justify-center items-center gap-10">
							<h2>
								User Name: <span>{userInfo.payload.user_name}</span>
							</h2>

							<h2>
								Email: <span>{userInfo.payload.email}</span>
							</h2>

							<h2>
								ID: <span>{userInfo.payload.user_id}</span>
							</h2>
						</div>
					)}
				</div>

				<div>Displaying {orders.length} orders</div>
			</section>
			<section className=" max-w-7xl mx-auto">
				{orders.map((order) => (
					<div className=" bg-white shadow-lg rounded-lg p-10 m-4 lg:w-[48rem]">
						<div className="flex flex-col md:flex-row justify-between items-center px-4">
							<div>
								<Link
									to={`/order-details/${order.orderId}`}
									state={{ orderDetails: order }}
								>
									<h2 className="text-xl text-gray-600 font-semibold hover:text-blue-500">
										Order #{order.orderId}
									</h2>
								</Link>
								<p className="text-gray-600">
									Date: {new Date(order.orderDate).toLocaleDateString()}
								</p>
								<p className="text-gray-600">Total: £{order.totalPrice}</p>
								<p
									className={`text-sm ${
										order.paymentStatus === "Paid"
											? "text-green-500"
											: "text-red-500"
									}`}
								>
									Status: {order.paymentStatus}
								</p>
							</div>
							<div className="flex">
								{order.products.map((product) => (
									<img
										key={product.productId}
										src={product.imageUrl}
										alt={product.name}
										className=" w-32 h-32 object-cover rounded-md ml-2"
									/>
								))}
							</div>
						</div>
					</div>
				))}
			</section>
		</section>
	);
};
