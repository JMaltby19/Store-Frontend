// orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentOrder: null,
	previousOrders: [],
	// ... other initial state properties
};

export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		setOrder: (state, action) => {
			const { orderData, orderId } = action.payload;
			state.currentOrder = { ...orderData, orderId };
		},
		clearOrders: (state) => {
			state.previousOrders = [];
			state.currentOrder = null;
		},

		setPastOrders: (state, action) => {
			state.previousOrders = action.payload;
		},
		// ... other reducers like addToPastOrders, etc.
	},
	// ... extraReducers if needed
});

export const { setOrder, clearOrder, setPastOrders } = orderSlice.actions;
export default orderSlice.reducer;
