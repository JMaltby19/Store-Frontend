import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import { HomeScreen } from "./pages/HomeScreen.jsx";
import { ProductDetails } from "./pages/ProductDetails.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { Checkout } from "./pages/Checkout.jsx";
import { Orders } from "./pages/Orders.jsx";
import { OrderDetails } from "./pages/OrderDetails.jsx";
import { Products } from "./pages/Products.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomeScreen />} />
			<Route path="/product/:id" element={<ProductDetails />} />
			<Route path="/products/:category" element={<Products />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/checkout" element={<Checkout />} />
			<Route path="/orders" element={<Orders />} />
			<Route path="/order-details/:id" element={<OrderDetails />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
