// src/features/api/productsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
	reducerPath: "userApiSlice",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://bpbsdsgcweyqzmxdthyb-mysql.services.clever-cloud.com/api/",
	}),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: "users/login",
				method: "POST",
				body: data,
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: "users/",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = userApiSlice;
