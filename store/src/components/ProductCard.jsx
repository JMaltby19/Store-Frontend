import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
	return (
		<div className="bg-white rounded-lg w-72 h-fit md:w-72 lg:max-w-6xl xl:max-w-7xl">
			<div className="mx-auto px-4 py-10 sm:px-6 sm:py-12 lg:max-w-screen-7xl">
				<div className="">
					{/* {products.map((product) => ( */}
					<div key={product.id} className="group">
						<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
							<Link to={`/product/${product.id}`}>
								<img
									src={product.image_url}
									className="h-full w-full object-cover object-center group-hover:opacity-75"
								/>
							</Link>
						</div>
						<h3 className="mt-4 text-sm text-left text-gray-700">
							{product.name}
						</h3>
						<p className="mt-1 text-lg text-left font-medium text-gray-900">
							£{product.price}
						</p>
					</div>
					{/* ))} */}
				</div>
			</div>
		</div>
	);
};
