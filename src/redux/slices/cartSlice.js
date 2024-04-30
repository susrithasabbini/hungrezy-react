// src/redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { category, restaurant,restaurantId, itemName, price, veg_or_non_veg } =
        action.payload;
      const existingItem = state.items.find(
        (item) => item.restaurant === restaurant && item.itemName === itemName
      );

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({
          category,
          restaurant,
          restaurantId,
          itemName,
          price,
          count: 1,
          veg_or_non_veg,
        });
      }

      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.count,
        0
      );
    },
    removeFromCart: (state, action) => {
      const { restaurant, itemName } = action.payload;
      const existingItem = state.items.find(
        (item) => item.restaurant === restaurant && item.itemName === itemName
      );

      if (existingItem) {
        existingItem.count -= 1;

        if (existingItem.count === 0) {
          // Remove the item from the cart if count becomes zero
          state.items = state.items.filter(
            (item) =>
              !(item.restaurant === restaurant && item.itemName === itemName)
          );
        }

        state.totalPrice = state.items.reduce(
          (total, item) => total + item.price * item.count,
          0
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectTotalItems = (state) => state.cart.items.length;

export default cartSlice.reducer;
