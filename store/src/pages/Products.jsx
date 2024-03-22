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
								<p className="px-1 text-xs md:text-base">{category}</p>
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
