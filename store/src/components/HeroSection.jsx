// import React from "react";

// export const HeroSection = () => {
// 	return (
// 		<div className="relative max-w-screen-2xl object-contain ">
// 			<img
// 				src="https://res.cloudinary.com/ddijiwxw5/image/upload/v1704925030/Apple-iPhone-15-Pro-Hero-Gear_ulsohl.jpg"
// 				alt=""
// 				className="w-full"
// 			/>
// 			<div className="absolute bottom-5 left-5 z-10">
// 				<button className="bg-white text-black py-2 px-4 rounded">
// 					Shop now
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

import React from "react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
	return (
		<div className="relative w-full max-w-screen-2xl object-contain ">
			<img
				src="https://res.cloudinary.com/ddijiwxw5/image/upload/v1705258121/f-4d62f49966d4af93a651379f09657fba6cc3c770_usiraj.jpg"
				alt="iPhone 15 Pro"
				className=" h-auto object-cover brightness-[.60]"
			/>
			<div className="absolute top-20 flex justify-center w-full z-1 p-1 md:bottom-10 md:left-15">
				<div>
					<h1 className=" font-semibold">iPhone 15 Pro</h1>
					<h2 className=" font-normal text-3xl">
						Titanium. So strong. So light. So Pro
					</h2>
				</div>
			</div>
			<div className="absolute bottom-10 left-10 flex justify-start w-full z-10 p-1 md:bottom-10 md:left-15">
				<div className=" max-w-sm">
					<Link to={"/products/Smartphones"}>
						<button className="bg-white text-black py-2 px-4 rounded text-sm md:text-base">
							Shop now
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
