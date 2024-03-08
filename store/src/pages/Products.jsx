// Products.js with RTK state management
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ProductCard } from "../components/ProductCard";
// import { useGetProductsQuery } from "../features/apiSlice";
// import {
// 	addCategory,
// 	removeCategory,
// 	resetCategories,
// } from "../features/categorySlice";

// export const Products = () => {
// 	const { data: products, error, isLoading } = useGetProductsQuery();
// 	const selectedCategories = useSelector(
// 		(state) => state.category.selectedCategories
// 	);
// 	const dispatch = useDispatch();

// 	if (isLoading) return <div>Loading...</div>;
// 	if (error) return <div>Error: {error.toString()}</div>;

// 	const handleCheckboxChange = (category) => {
// 		if (selectedCategories.includes(category)) {
// 			dispatch(removeCategory(category));
// 		} else {
// 			dispatch(addCategory(category));
// 		}
// 	};

// 	const handleResetFilters = () => {
// 		dispatch(resetCategories());
// 	};

// 	const categories = [...new Set(products.map((product) => product.category))];
// 	const filteredProducts = products.filter(
// 		(product) =>
// 			selectedCategories.length === 0 ||
// 			selectedCategories.includes(product.category)
// 	);

// 	return (
// 		<div>
// 			<div>
// 				{categories.map((category) => (
// 					<label key={category}>
// 						<input
// 							type="checkbox"
// 							checked={selectedCategories.includes(category)}
// 							onChange={() => handleCheckboxChange(category)}
// 						/>
// 						{category}
// 					</label>
// 				))}
// 				<button onClick={handleResetFilters}>Reset Filters</button>
// 			</div>
// 			<div>
// 				{filteredProducts.map((product) => (
// 					<ProductCard key={product.id} product={product} />
// 				))}
// 			</div>
// 		</div>
// 	);
// };

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/ProductCard";
import { useGetProductsQuery } from "../features/apiSlice";
import {
	addCategory,
	removeCategory,
	resetCategories,
} from "../features/categorySlice";

export const Products = () => {
	const { data: products = [], error, isLoading } = useGetProductsQuery();
	const selectedCategories = useSelector((state) => state.category);
	const dispatch = useDispatch();

	const handleCheckboxChange = (category) => {
		if (selectedCategories.includes(category)) {
			dispatch(removeCategory(category));
		} else {
			dispatch(addCategory(category));
		}
	};

	const handleResetFilters = () => {
		dispatch(resetCategories());
	};

	const categories = [...new Set(products.map((product) => product.category))];
	const filteredProducts = products.filter(
		(product) =>
			selectedCategories.length === 0 ||
			selectedCategories.includes(product.category)
	);

	return (
		<div className="relative top-20">
			<div className=" flex flex-row">
				<div className="w-1/4 flex flex-col items-start text-black">
					<button onClick={handleResetFilters} className=" text-white">
						Reset Filters
					</button>
					{categories.map((category) => (
						// <label
						// 	key={category}
						// 	style={{
						// 		backgroundColor: selectedCategories.includes(category)
						// 			? "#f0f0f0"
						// 			: "transparent",
						// 		// paddingTop: "1px",
						// 		// paddingBottom: "1px",
						// 		marginTop: "5rem",
						// 		// marginBottom: "1px",
						// 		// borderRadius: "1px",
						// 	}}
						// >
						<div className="static mt-5">
							<label
								key={category}
								className={`${
									selectedCategories.includes(category)
										? "bg-gray-200"
										: "bg-transparent"
								} p-1 my-1 rounded cursor-pointer flex items-center`}
							>
								<input
									type="checkbox"
									checked={selectedCategories.includes(category)}
									onChange={() => handleCheckboxChange(category)}
								/>
								{category}
							</label>
						</div>
					))}
				</div>

				<div className=" w-3/4 grid grid-cols-1 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-20">
					{filteredProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
};

// import React, { useState, useEffect } from "react";
// import { ProductCard } from "../components/ProductCard";
// import { Link } from "react-router-dom";
// import { useGetProductsQuery } from "../features/apiSlice";

// export const Products = () => {
// 	const { data: products, error, isLoading } = useGetProductsQuery();
// 	const [selectedCategories, setSelectedCategories] = useState([]);

// 	if (isLoading) return <div>Loading...</div>;
// 	if (error) return <div>Error: {error.toString()}</div>;

// 	// Extract a list of unique categories
// 	const categories = [...new Set(products.map((product) => product.category))];

// 	// Handle checkbox change
// 	const handleCheckboxChange = (category) => {
// 		setSelectedCategories((prevCategories) => {
// 			if (prevCategories.includes(category)) {
// 				return prevCategories.filter((cat) => cat !== category);
// 			} else {
// 				return [...prevCategories, category];
// 			}
// 		});
// 	};

// 	// Filter products based on selected categories
// 	const filteredProducts = products.filter(
// 		(product) =>
// 			selectedCategories.length === 0 ||
// 			selectedCategories.includes(product.category)
// 	);

// 	return (
// 		<div className="relative top-20">
// 			<div className="mb-4">
// 				{/* Category Filters */}
// 				{categories.map((category) => (
// 					<label key={category} className="cursor-pointer">
// 						<input
// 							type="checkbox"
// 							checked={selectedCategories.includes(category)}
// 							onChange={() => handleCheckboxChange(category)}
// 							style={{ marginRight: "8px" }} // Add spacing between checkbox and label text
// 						/>
// 						{category}
// 					</label>
// 				))}

// 				{/* Reset Filter Button */}
// 				<button
// 					onClick={() => setSelectedCategories([])}
// 					className="text-blue-600 hover:text-blue-800"
// 				>
// 					Reset Filters
// 				</button>
// 			</div>
// 			<div className="grid grid-cols-1 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-20">
// 				{filteredProducts.map((product) => (
// 					<div key={product.id} className="px-2">
// 						<ProductCard product={product} />
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// // import React from "react";
// // import { ProductCard } from "../components/ProductCard";
// // import { useParams, Link } from "react-router-dom";
// // import { useGetProductsQuery } from "../features/apiSlice";

// // export const Products = () => {
// // 	const { category } = useParams();
// // 	const { data: products, error, isLoading } = useGetProductsQuery();

// // 	if (isLoading) return <div>Loading...</div>;
// // 	if (error) return <div>Error: {error.toString()}</div>;

// // 	// Filter products based on URL parameter or show all if category is 'all'
// // 	const filteredProducts =
// // 		category === "all"
// // 			? products
// // 			: products.filter((product) => product.category === category);

// // 	return (
// // 		<div>
// // 			<div className="mb-4">
// // 				{/* Reset Filter Button */}
// // 				<Link to="/products/all" className="text-blue-600 hover:text-blue-800">
// // 					Show All Products
// // 				</Link>
// // 			</div>
// // 			<div className="grid grid-cols-1 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-20">
// // 				{filteredProducts.map((product) => (
// // 					<div key={product.id} className="px-2">
// // 						<ProductCard product={product} />
// // 					</div>
// // 				))}
// // 			</div>
// // 		</div>
// // 	);
// // };
