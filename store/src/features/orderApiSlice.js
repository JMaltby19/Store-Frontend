import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../utils"; // Adjust the path as necessary

export const orderApiSlice = createApi({
	reducerPath: "orderApiSlice",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://store-backend-wheat.vercel.app/api/",
		// prepareHeaders: (headers) => {
		// 	const token = getTokenFromLocalStorage();
		// 	if (token) {
		// 		headers.set("token", ` ${token}`);
		// 	}
		// 	return headers;
		// },
	}),
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (orderData) => ({
				url: "orders/",
				method: "POST",
				body: orderData,
			}),
		}),
		getOrders: builder.query({
			query: () => ({
				url: "/orders/orders",
				method: "GET",
				headers: {
					token: `${getTokenFromLocalStorage()}`,
				},
			}),
		}),
		getOrderDetails: builder.query({
			query: (id) => ({
				url: `/orders/order-details/${id}`,
				method: "GET",
				headers: {
					token: `${getTokenFromLocalStorage()}`,
				},
			}),
		}),
	}),
});

export const {
	useCreateOrderMutation,
	useGetOrdersQuery,
	useGetOrderDetailsQuery,
} = orderApiSlice;
