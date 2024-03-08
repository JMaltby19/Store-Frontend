// src/features/api/productsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "apiSlice",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://store-backend-wheat.vercel.app/api/",
	}),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => "/products",
		}),
		getProductById: builder.query({
			query: (id) => `products/${id}`,
		}),
	}),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = apiSlice;
