import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGetProductByIdQuery } from "../features/apiSlice";
import { StarIcon } from "@heroicons/react/solid";
import { addToBasket } from "../features/basketSlice";
import { useDispatch, useSelector } from "react-redux";

export const ProductDetails = () => {
	const { id: productId } = useParams();

	const [qty, setQty] = useState(1);

	const { data: product, error, isLoading } = useGetProductByIdQuery(productId);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.toString()}</div>;
	if (!product) return <div>Product not found</div>;

	const dispatch = useDispatch();

	const addToBasketHandler = () => {
		dispatch(addToBasket({ ...product, qty }));
	};

	return (
		<div className=" bg-white w-full relative rounded-xl top-10">
			<div className="mx-auto px-2 pb-16 pt-10 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:px-2 lg:py-24 ">
				{/* Image gallery */}
				<div className="mx-auto max-w-sm lg:max-w-2xl">
					<div className="overflow-hidden rounded-lg">
						<img
							src={product.image_url}
							alt={product.image_url}
							className="h-full w-full object-cover object-center"
						/>
					</div>
				</div>

				{/* Product info */}
				<div className="mx-auto max-w-2xl px-4 sm:px-6 ">
					<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
						{product.name}
					</h1>
					{/* Price and other short info */}
					<div className="mt-4">
						<h2 className="sr-only">Product information</h2>
						<p className="text-3xl tracking-tight text-gray-900">
							£{product.price}
						</p>
						{/* Reviews */}
						<div className="mt-6">
							<h3 className="sr-only">Reviews</h3>
							<div className="flex items-center">
								<p className="sr-only">{product.rating} out of 5 stars</p>
								{/* <StarIcon /> */}
								<div className="flex flex-row">
									{Array.from({ length: 5 }, (_, i) => (
										<svg
											key={i}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill={i < product.rating ? "teal" : "gray"}
											className="w-4 h-4"
										>
											<path
												fillRule="evenodd"
												d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
												clipRule="evenodd"
											/>
										</svg>
									))}

									<a
										href={product.rating.href}
										className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
									>
										{product.reviews} reviews
									</a>
								</div>
							</div>
						</div>
					</div>

					{/* Description and details */}
					<div className="py-10">
						{/* Description */}
						<div className="mt-4 space-y-6">
							<p className="text-base text-gray-900">{product.description}</p>
						</div>
					</div>
					{/* Details */}
					<div className=" mt-28">
						{/* <h2 className="text-sm font-medium text-gray-900">Details</h2> */}
						<div className="">
							<p className="text-sm text-gray-600">
								{product.stock_count > 0 ? "Currenty in stock" : "Out of stock"}
							</p>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-green-500 hover:text-black focus:outline-green-500 focus:outline-offset-2 focus:outline-2 "
							disabled={product.stock_count === 0}
							onClick={addToBasketHandler}
						>
							Add to bag
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
