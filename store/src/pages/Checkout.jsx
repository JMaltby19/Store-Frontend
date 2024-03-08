import React from "react";
import { PaymentForm } from "../components/PaymentForm";
import { OrderSummary } from "../components/OrderSummary";
import { DeliveryForm } from "../components/DeliveryForm";

export const Checkout = () => {
	return (
		<div className="relative after:bg-gray-100 p-10 min-h-full lg:min-h-screen top-16">
			<div className="lg:max-w-screen-2xl mx-auto">
				<div className="flex flex-col lg:flex-row gap-10">
					<PaymentForm />
					<OrderSummary />
				</div>
				<Footer />
			</div>
		</div>
	);
};

const Footer = () => {
	return (
		<p className="text-center text-sm text-gray-500 mt-10">
			Payment details stored in plain text
		</p>
	);
};
