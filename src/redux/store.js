import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from './slices/userSlice';
import ordersReducer from './slices/ordersSlice';
import menuReducer from './slices/menuSlice';
import tableBookingReducer from './slices/tableBookingSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    orders : ordersReducer,
    tableBooking: tableBookingReducer,
    menu : menuReducer
  },
});
