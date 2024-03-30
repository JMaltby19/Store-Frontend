import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCategory } from "../features/categorySlice"; // Adjust this to the action you want to use
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Categories = ({ category }) => {
	const dispatch = useDispatch();

	const handleCategoryClick = () => {
		dispatch(addCategory(category.category)); // Assuming you want to add this category
	};

	gsap.registerPlugin(useGSAP, ScrollTrigger);
	const categoryRef = useRef(null);

	useGSAP(() => {
		gsap.from(categoryRef.current, {
			duration: 1,
			y: 100,
			opacity: 0,
			scrollTrigger: {
				trigger: categoryRef.current,
				start: "top 85%",
				end: "bottom 60%",
				toggleActions: "play none none reverse",
			},
			stagger: 0.15,
		});
		// gsap.from(categoryRef.current, {
		// 	duration: 3,
		// 	y: -150,
		// 	opacity: 0,
		// 	ease: "power4.out",
		// 	stagger: 0.2,
		// });
	});

	return (
		<div
			className="bg-white rounded-lg w-72 md:w-72 lg:max-w-6xl xl:max-w-7xl"
			onClick={handleCategoryClick}
			ref={categoryRef}
		>
			<div className=" mx-auto px-4 py-10 sm:px-6 sm:py-12 lg:max-w-screen-7xl">
				<div className="">
					{/* {products.map((product) => ( */}
					<Link to={`/products/${category.category}`}>
						<div key={category.catergory} className="group">
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
								<img
									src={category.image_url}
									className="h-full w-full object-cover object-center group-hover:opacity-75"
								/>
							</div>
							<h3 className="mt-4 text-lg font-bold text-center text-gray-700">
								{category.category}
							</h3>
						</div>
					</Link>
					{/* ))} */}{" "}
				</div>
			</div>
		</div>
	);
};

// import React from "react";
// import { Link } from "react-router-dom";

// export const Categories = ({ category }) => {
// 	// function filterProductsByCategory(category) {
// 	// 	return product.filter((product) => product.category === category);
// 	// }

// 	return (
// 		<div className="bg-white rounded-lg w-72 md:w-72 lg:max-w-6xl xl:max-w-7xl">
// 			<div className="mx-auto px-4 py-10 sm:px-6 sm:py-12 lg:max-w-screen-7xl">
// 				<div className="">
// 					{/* {products.map((product) => ( */}
// 					<Link to={`/products/${category.category}`}>
// 						<div key={category.catergory} className="group">
// 							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
// 								<img
// 									src={category.image_url}
// 									className="h-full w-full object-cover object-center group-hover:opacity-75"
// 								/>
// 							</div>
// 							<h3 className="mt-4 text-lg font-bold text-center text-gray-700">
// 								{category.category}
// 							</h3>
// 						</div>
// 					</Link>
// 					{/* ))} */}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
