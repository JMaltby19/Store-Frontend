import { createSlice } from "@reduxjs/toolkit";
import { addDecimals } from "../utils";

// Utility function to update and save the basket state
const updateAndSaveBasket = (state) => {
	state.itemsPrice = state.basketItems.reduce(
		(acc, item) => acc + item.price * item.qty,
		0
	);
	state.totalPrice = addDecimals(state.itemsPrice);
	localStorage.setItem("basket", JSON.stringify(state));
};

// Initial state setup
const initialState = localStorage.getItem("basket")
	? JSON.parse(localStorage.getItem("basket"))
	: { basketItems: [], itemsPrice: 0, totalPrice: 0 };

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		addToBasket: (state, { payload: newItem }) => {
			const existingItem = state.basketItems.find(
				(item) => item.id === newItem.id
			);

			if (existingItem) {
				existingItem.qty += newItem.qty;
			} else {
				state.basketItems.push(newItem);
			}

			updateAndSaveBasket(state);
		},
		increaseQuantity: (state, { payload: itemId }) => {
			const item = state.basketItems.find((item) => item.id === itemId);
			if (item) item.qty += 1;

			updateAndSaveBasket(state);
		},
		decreaseQuantity: (state, { payload: itemId }) => {
			const item = state.basketItems.find((item) => item.id === itemId);
			if (item && item.qty > 1) item.qty -= 1;

			updateAndSaveBasket(state);
		},
		removeFromBasket: (state, { payload: itemId }) => {
			state.basketItems = state.basketItems.filter(
				(item) => item.id !== itemId
			);

			updateAndSaveBasket(state);
		},
		clearBasket: (state) => {
			state.basketItems = [];
			state.totalPrice = 0;
			localStorage.removeItem("basket");
		},

		// Include clearBasket in your reducers
	},
});

export const {
	addToBasket,
	increaseQuantity,
	decreaseQuantity,
	removeFromBasket,
	clearBasket,
} = basketSlice.actions;

export default basketSlice.reducer;

// Selector for basket item count
export const selectBasketItemCount = (state) => state.basket.basketItems.length;
