import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const HeroSection = () => {
	const titleRef = useRef(null);
	const subTitleRef = useRef(null);
	const buttonRef = useRef(null);

	gsap.registerPlugin(useGSAP);

	useGSAP(() => {
		gsap.from(".title", {
			duration: 3,
			y: -150,
			opacity: 0,
			ease: "power4.out",
			stagger: 0.2,
		});
		gsap.from(subTitleRef.current, {
			duration: 3,
			y: -100,
			opacity: 0,
			ease: "power4.out",
			stagger: 0.2,
		});
		gsap.from(buttonRef.current, {
			duration: 3,
			x: -200,
			opacity: 0,
			ease: "power4.out",
			stagger: 0.2,
		});
		gsap.from(".hero-image", {
			duration: 3,
			scale: 1.3,
			ease: "power2.out",
		});
	});

	return (
		<div className="relative w-full max-w-screen-2xl object-contain">
			<img
				src="https://res.cloudinary.com/ddijiwxw5/image/upload/v1705258121/f-4d62f49966d4af93a651379f09657fba6cc3c770_usiraj.jpg"
				alt="iPhone 15 Pro"
				className="hero-image h-auto object-cover brightness-[.60]"
			/>
			<div className="absolute top-20 flex justify-center w-full z-1 p-1 md:bottom-10 md:left-15">
				<div>
					<h1
						ref={titleRef}
						className="title text-xl font-semibold md:text-5xl"
					>
						iPhone 15 Pro
					</h1>
					<h2 ref={subTitleRef} className="text-xl font-normal md:text-3xl">
						Titanium. So strong. So light. So Pro
					</h2>
				</div>
			</div>
			<div className="absolute bottom-3 left-6 flex justify-start w-full z-10 p-1 md:bottom-10 md:left-15">
				<div className="max-w-sm">
					<Link to={"/products/Smartphones"}>
						<button
							ref={buttonRef}
							className="bg-white text-black py-1 px-2 rounded text-sm md:py-2 md:px-4 md:text-base"
						>
							Shop now
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

// import React from "react";
// import { Link } from "react-router-dom";

// export const HeroSection = () => {
// 	return (
// 		<div className="relative w-full max-w-screen-2xl object-contain ">
// 			<img
// 				src="https://res.cloudinary.com/ddijiwxw5/image/upload/v1705258121/f-4d62f49966d4af93a651379f09657fba6cc3c770_usiraj.jpg"
// 				alt="iPhone 15 Pro"
// 				className=" h-auto object-cover brightness-[.60]"
// 			/>
// 			<div className="absolute top-20 flex justify-center w-full z-1 p-1 md:bottom-10 md:left-15">
// 				<div>
// 					<h1 className="text-xl font-semibold md:text-5xl">iPhone 15 Pro</h1>
// 					<h2 className="text-xl font-normal md:text-3xl">
// 						Titanium. So strong. So light. So Pro
// 					</h2>
// 				</div>
// 			</div>
// 			<div className="absolute bottom-3 left-6 flex justify-start w-full z-10 p-1 md:bottom-10 md:left-15">
// 				<div className=" max-w-sm">
// 					<Link to={"/products/Smartphones"}>
// 						<button className="bg-white text-black py-1 px-2 rounded text-sm md:py-2 md:px-4 md:text-base">
// 							Shop now
// 						</button>
// 					</Link>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
