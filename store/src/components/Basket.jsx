import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	increaseQuantity,
	decreaseQuantity,
	removeFromBasket,
} from "../features/basketSlice";

export const Basket = ({ isOpen, onClose }) => {
	// const [open, setOpen] = useState(true);

	// const handleClose = () => {
	// 	setOpen(false);
	// 	if (onClose) {
	// 		onClose(); // Call the onClose function passed from NavBar
	// 	}
	// };

	const basketItems = useSelector((state) => state.basket.basketItems);
	const totalPrice = useSelector((state) => state.basket.totalPrice);
	const { userInfo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const totalQuantity = basketItems.reduce(
		(total, item) => total + item.qty,
		0
	);

	const handleIncrease = (id) => {
		dispatch(increaseQuantity(id));
	};

	const handleDecrease = (id) => {
		dispatch(decreaseQuantity(id));
	};

	const handleRemoveFromBasket = (id) => {
		dispatch(removeFromBasket(id));
	};

	const handleSubmit = () => {
		// e.preventDefault();
		navigate("/checkout");
		onClose();
	};

	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto w-screen max-w-sm md:max-w-md ">
									<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
										<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
											<div className="flex items-start justify-between">
												<Dialog.Title className="text-lg font-medium text-gray-900">
													Shopping cart
												</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
														onClick={onClose}
													>
														<span className="absolute -inset-0.5" />
														<span className="sr-only">Close panel</span>
														<FaXmark className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>

											<div className="mt-8">
												<div className="flow-root">
													<ul
														role="list"
														className="-my-6 divide-y divide-gray-200"
													>
														{basketItems &&
															basketItems.map((product) => (
																<li key={product.id} className="flex py-6">
																	<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
																		<img
																			src={product.image_url}
																			alt={product.image_url}
																			className="h-full w-full object-cover object-center"
																		/>
																	</div>

																	<div className="ml-4 flex flex-1 flex-col">
																		<div>
																			<div className="flex justify-between text-base font-medium text-gray-900">
																				<h3>
																					<Link to={`/product/${product.id}`}>
																						{product.name}
																					</Link>
																				</h3>
																				<p className="ml-4">
																					£{product.price * product.qty}
																				</p>
																			</div>
																			<p className="mt-1 text-sm text-gray-500">
																				£{product.price}
																			</p>
																		</div>
																		<div className="flex flex-1 items-end justify-between text-sm">
																			<div className="flex flex-1 flex-row justify-start items-center gap-4 ">
																				<button
																					className=" bg-white text-slate-950 hover:bg-black hover:text-white "
																					disabled={basketItems.length < 1}
																					onClick={() =>
																						handleDecrease(product.id)
																					}
																				>
																					-
																				</button>
																				<p className="text-gray-500">
																					{product.qty}
																				</p>
																				<button
																					className=" bg-white text-slate-950 hover:bg-black hover:text-white "
																					onClick={() =>
																						handleIncrease(product.id)
																					}
																				>
																					+
																				</button>
																			</div>
																			<div className="flex">
																				<button
																					type="button"
																					className="font-medium text-indigo-600 hover:text-indigo-500"
																					onClick={() =>
																						handleRemoveFromBasket(product.id)
																					}
																				>
																					Remove
																				</button>
																			</div>
																		</div>
																	</div>
																</li>
															))}
													</ul>
												</div>
											</div>
										</div>

										<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
											<div className="flex justify-between text-base font-medium text-gray-900">
												<p>Subtotal</p>
												<p>£{totalPrice}</p>
											</div>
											<p className="mt-0.5 text-sm text-gray-500">
												Shipping and taxes calculated at checkout.
											</p>
											<div className="mt-6">
												<button
													href="#"
													className={`${
														userInfo
															? "w-full flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-500"
															: "w-full flex items-center justify-center rounded-md border border-transparent bg-slate-700 px-6 py-3 text-base font-medium text-white shadow-sm "
													} `}
													disabled={userInfo === null}
													onClick={handleSubmit}
												>
													Checkout(<span>{totalQuantity}</span>)
												</button>
											</div>
											<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
												<p>
													or
													<button
														type="button"
														className="font-medium text-indigo-600 hover:text-indigo-500"
														onClick={onClose}
													>
														Continue Shopping
														<span aria-hidden="true"> &rarr;</span>
													</button>
												</p>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
