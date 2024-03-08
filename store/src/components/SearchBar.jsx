import React, { useState, useRef, useEffect } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { FaSearch } from "react-icons/fa";
import { useGetProductsQuery } from "../features/apiSlice";
import { Link } from "react-router-dom";

const SearchBar = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const { data: products = [], isLoading } = useGetProductsQuery();
	const searchBarRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				searchBarRef.current &&
				!searchBarRef.current.contains(event.target)
			) {
				setIsExpanded(false);
				setSearchTerm(""); // Reset search term
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleFocus = () => {
		setIsExpanded(true);
	};

	const filteredProducts = searchTerm
		? products.filter((product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: [];

	return (
		<div ref={searchBarRef} className="relative">
			{" "}
			<div
				className={`flex justify-center items-center border-2 rounded-md ${
					isExpanded ? "w-48" : "w-12"
				} h-12 duration-500 ease-in-out`}
			>
				<input
					type="text"
					className={`${
						isExpanded ? "w-full" : "hidden"
					} h-full px-2 transition-all duration-200 ease-in-out`}
					placeholder={isExpanded ? "Search..." : ""}
					onFocus={handleFocus}
					onChange={(e) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<FaSearch
					className="mx-2 text-center text-black"
					size={15}
					onClick={() => setIsExpanded((prev) => !prev)}
				/>
			</div>
			{isExpanded && searchTerm && (
				<div className="absolute w-full bg-white border mt-1 max-h-60 overflow-auto">
					{filteredProducts.length > 0 ? (
						filteredProducts.map((product) => (
							<Link
								key={product.id}
								to={`/product/${product.id}`}
								className="block p-2 text-gray-700 hover:text-gray-700 hover:bg-gray-100"
							>
								<h3>{product.name}</h3>
							</Link>
						))
					) : (
						<div className="p-2">No products found</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchBar;
