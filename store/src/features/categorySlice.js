// features/selectedCategoriesSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
	name: "category",
	initialState: [],
	reducers: {
		setCategories: (state, action) => action.payload,
		addCategory: (state, action) => {
			// Add category if not already present
			if (!state.includes(action.payload)) {
				state.push(action.payload);
			}
		},
		removeCategory: (state, action) => {
			// Remove category if present
			const index = state.indexOf(action.payload);
			if (index !== -1) {
				state.splice(index, 1);
			}
		},
		resetCategories: () => [], // Reset the categories selection
	},
});

export const { setCategories, addCategory, removeCategory, resetCategories } =
	categoriesSlice.actions;

export default categoriesSlice.reducer;

// // features/selectedCategoriesSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// export const categoriesSlice = createSlice({
// 	name: "selectedCategories",
// 	initialState: [],
// 	reducers: {
// 		setCategories: (state, action) => action.payload,
// 	},
// });

// export const { setCategories } = categoriesSlice.actions;

// export default categoriesSlice.reducer;
