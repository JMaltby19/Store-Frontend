import { Menu, Transition } from "@headlessui/react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { Link } from "react-router-dom";
import { clearOrder } from "../features/orderSlice";
import { clearBasket, removeFromBasket } from "../features/basketSlice";

export const Dropdown = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	// Reusable Link component
	const DropdownLink = ({ to, children, onClick }) => (
		<Menu.Item>
			{({ active }) => (
				<Link
					className={`${
						active ? "bg-blue-500" : ""
					} block px-4 py-2 text-sm text-gray-700`}
					to={to}
					onClick={onClick}
				>
					{children}
				</Link>
			)}
		</Menu.Item>
	);

	const handleLogout = () => {
		dispatch(clearBasket());
		dispatch(logoutUser());
		dispatch(clearOrder());
	};

	return (
		<Menu>
			<Menu.Button className="text-black hover:cursor-pointer">
				{userInfo ? (
					userInfo.payload.user_name
				) : (
					<FaUserCircle size={30} color="black" />
				)}
			</Menu.Button>

			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<Menu.Items className="  absolute right-0 top-5 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="px-1 py-1 flex flex-col">
						{userInfo ? (
							<>
								{/* <DropdownLink to="/account-settings">
									Account settings
								</DropdownLink> */}
								<DropdownLink to="/orders">Orders</DropdownLink>
								<DropdownLink to="/" onClick={handleLogout}>
									Logout
								</DropdownLink>
							</>
						) : (
							<>
								<DropdownLink to="/login">Login</DropdownLink>
								{/* <DropdownLink to="/documentation">Documentation</DropdownLink> */}
							</>
						)}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
