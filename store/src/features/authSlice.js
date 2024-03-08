import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userInfo: localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
		: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginUser: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem("userInfo", JSON.stringify(action.payload));
		},
		logoutUser: (state) => {
			state.userInfo = null;
			localStorage.removeItem("userInfo");
		},
		registerUser: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem("userInfo", JSON.stringify(action.payload));
		},
	},
});

export const { loginUser, logoutUser, registerUser } = authSlice.actions;

export default authSlice.reducer;
