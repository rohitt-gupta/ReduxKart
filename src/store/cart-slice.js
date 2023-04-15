import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: { items: [], totalQuantity: 0 },
	reducers: {
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingitem = state.items.find((item) => item.id === newItem.id);
			if (!existingitem) {
				state.items.push({
					itemId: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalprice: newItem.price,
					title: newItem.title,
				});
			} else {
				existingitem.quantity++;
				existingitem.totalprice += newItem.price;
			}
		},
	},
});

export const uiActions = uiSlice.actions;

export default uiSlice;
