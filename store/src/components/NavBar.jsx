import React, { useState, useEffect, useRef } from "react";
import { GiBasketballBasket } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { Basket } from "./Basket";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBasketItemCount } from "../features/basketSlice";
import { Dropdown } from "./Dropdown";

// export const NavBar = () => {

export const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isBasketOpen, setIsBasketOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown

	const iconStylingClass = "font-bold stroke-2 hover:cursor-pointer";

	const menuRef = useRef(); // Ref for the menu container

	const navItems = [{ title: "Home", path: "/" }];

	const toggleBasket = () => {
		setIsBasketOpen(!isBasketOpen);
		// setBasketItemCount(newCount);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Close the dropdown if clicked outside of it
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuRef]);

	const basketItemCount = useSelector(selectBasketItemCount);
	const { userInfo } = useSelector((state) => state.auth);
	console.log(userInfo);

	return (
		<nav className="fixed z-20 top-0 left-0 w-full max-w-screen-2xl flex items-center justify-between py-3 bg-white border-b-2 border-slate-950">
			<div className="ml-2 flex justify-between items-center space-x-5">
				<button className="md:hidden" onClick={toggleMenu}>
					{/* Burger icon can be added here */}
					<div>Menu</div>
				</button>

				<div
					ref={menuRef}
					className={`${
						isMenuOpen ? "flex flex-col w-36 mx-2" : "hidden"
					} absolute top-full left-0 mt-2 py-2 bg-white shadow-lg w-full md:w-auto md:flex md:flex-row md:relative md:top-auto md:shadow-none md:bg-transparent`}
				>
					{navItems.map((item) => (
						<div
							key={item.title}
							className="nav-item mb-1 text-lg font-bold duration-300 hover:scale-105 md:mb-0 md:mr-6"
						>
							<Link to={item.path} onClick={() => setIsMenuOpen(false)}>
								<p className="text-gray-700">{item.title}</p>
							</Link>
						</div>
					))}
				</div>

				{/* Search Bar and other content */}
				{/* <div className="relative left-24 mr-3 md:mr-2 hidden lg:block">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<svg
							className="w-5 h-5 text-gray-500"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clipRule="evenodd"
							></path>
						</svg>
					</div>
					<input
						type="text"
						id="email-adress-icon"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
						placeholder="Search..."
					/>
				</div> */}
				<SearchBar />
			</div>

			<div className="flex flex-row items-center mx-5">
				{/* Icons */}
				<div className="flex mx-5">
					<div className="flex flex-row justify-normal items-center space-x-3">
						<Dropdown />
						<div className="">
							<GiBasketballBasket
								color="black"
								size={30}
								className={iconStylingClass}
								onClick={toggleBasket}
							/>
							{basketItemCount > 0 && (
								<span className="absolute top-4 right-8 bg-red-600 text-white text-sm rounded-full px-2">
									{basketItemCount}
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
			<Basket isOpen={isBasketOpen} onClose={() => setIsBasketOpen(false)} />
		</nav>
	);
};
