import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { products } from "../products";
// import { ProductCard } from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGetProductsQuery } from "../features/apiSlice";
import { HeroSection } from "../components/HeroSection";
import { Categories } from "../components/Categories";
import { Products } from "../pages/Products";
// components/Carousel.jsx

export const HomeScreen = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const { data: products, error, isLoading } = useGetProductsQuery();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.toString()}</div>;
	console.log(products);

	// const settings = {

	// 	dots: true,
	// 	infinite: true,
	// 	speed: 500,
	// 	slidesToShow: 3,
	// 	slidesToScroll: 3,
	// 	responsive: [
	// 		{
	// 			breakpoint: 1024,
	// 			settings: {
	// 				slidesToShow: 2,
	// 				slidesToScroll: 2,
	// 				infinite: true,
	// 				dots: true,
	// 			},
	// 		},
	// 		{
	// 			breakpoint: 600,
	// 			settings: {
	// 				slidesToShow: 1,
	// 				slidesToScroll: 1,
	// 			},
	// 		},
	// 	],
	// };

	// const productCategories = [{ products }];

	// Step 1: Group Products by Category
	const productsByCategory = products.reduce((acc, product) => {
		if (!acc[product.category]) {
			acc[product.category] = [];
		}
		acc[product.category].push(product);
		return acc;
	}, {});

	// Step 2: Select a Representative Image for Each Category
	const categoryImages = Object.keys(productsByCategory).map((category) => {
		// For simplicity, selecting the first product's image in each category
		const representativeImage = productsByCategory[category][0].image_url;

		return {
			category,
			image_url: representativeImage,
		};
	});

	// Display or use the categoryImages as needed
	console.log(categoryImages);

	// Handle category click
	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
	};

	// Filter products based on selected category
	const filteredProducts = selectedCategory
		? productsByCategory[selectedCategory]
		: products;

	return (
		<div className=" overflow-x-hidden">
			<HeroSection />
			<section className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl  xl:max-w-screen-2xl">
				{/* <div className="grid grid-cols-1 justify-items-center  gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-20  ">
					{products?.map((product) => (
						<div key={product.id} className="px-2">
							<ProductCard product={product} />
						</div>
					))}
				</div> */}
				<div className="grid grid-cols-1 justify-items-center  gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-20  ">
					{categoryImages.map((category) => (
						<div
							key={category.category}
							className="px-2"
							onClick={() => handleCategoryClick(category.category)}
						>
							<Categories category={category} />
						</div>
					))}
				</div>
				{/* <Products products={filteredProducts} /> */}
			</section>
		</div>

		//     <section className="mx-auto px-2 py-16 sm:py-24 lg:px-4 lg:max-w-full">
		//     <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-10">
		//         {products &&
		//             products.map((product) => (
		//                 <div key={product.id} className="px-2">
		//                     <ProductCard product={product} />
		//                 </div>
		//             ))}
		//     </div>
		// </section>
	);
};
