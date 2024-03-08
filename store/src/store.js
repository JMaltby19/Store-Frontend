import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import basketSliceReducer from "./features/basketSlice";
import authSliceReducer from "./features/authSlice";
import { userApiSlice } from "./features/userApiSlice";
import { orderApiSlice } from "./features/orderApiSlice";
import orderSliceReducer from "./features/orderSlice";
import categorySliceReducer from "./features/categorySlice";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		[userApiSlice.reducerPath]: userApiSlice.reducer,
		[orderApiSlice.reducerPath]: orderApiSlice.reducer,
		basket: basketSliceReducer,
		auth: authSliceReducer,
		order: orderSliceReducer,
		category: categorySliceReducer,
	},
	// Adding the api middleware enables caching, invalidation, polling, and other features of `rtk-query`
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(apiSlice.middleware)
			.concat(userApiSlice.middleware)
			.concat(orderApiSlice.middleware),
});
