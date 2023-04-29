import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { cartActions } from "./store/cart-slice";

let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const showCart = useSelector((state) => state.ui.cartIsVisible);
	const cart = useSelector((state) => state.cart);

	const notification = useSelector((state) => state.ui.notification);

	const fetchData = async () => {
		const response = await fetch(
			"https://react-redux-cart-620d4-default-rtdb.firebaseio.com/cart.json"
		);
		if (!response.ok) {
			throw new Error("could not fetch cart data!");
		}
		const data = await response.json();

		dispatch(cartActions.replaceCart(data));
	};
	// useEffect(() => {

	// }, [dispatch]);
	useEffect(() => {
		const sentCartData = async () => {
			dispatch(
				uiActions.showNotification({
					status: "pending",
					title: "Sending...",
					message: "Sending Cart data",
				})
			);
			const response = await fetch(
				"https://react-redux-cart-620d4-default-rtdb.firebaseio.com/cart.json",
				{ method: "PUT", body: JSON.stringify(cart) }
			);
			if (!response.ok) {
				throw new Error("Sending cart data failed");
			}
			// const responseData = await response.json();

			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success!",
					message: "Sent Cart data successfully!",
				})
			);
		};

		if (isInitial) {
			isInitial = false;
			fetchData();
			return;
		}

		sentCartData().catch((err) => {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!!",
					message: "Error message",
				})
			);
		});
	}, [cart, dispatch]);
	return (
		<>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{showCart && <Cart />}
				<Products />
			</Layout>
		</>
	);
}

export default App;
