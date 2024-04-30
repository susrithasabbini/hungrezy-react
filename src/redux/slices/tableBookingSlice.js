// tableBookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tableBookingSlice = createSlice({
  name: 'tableBooking',
  initialState: {
    bookings: [],
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action) => {
      // Implement logic to update a booking
      // You might want to find the booking by some identifier (e.g., booking ID)
    },
    cancelBooking: (state, action) => {
      // Implement logic to cancel a booking
      // You might want to filter out the booking to be canceled
    },
  },
});

export const { addBooking, updateBooking, cancelBooking } = tableBookingSlice.actions;
export default tableBookingSlice.reducer;
