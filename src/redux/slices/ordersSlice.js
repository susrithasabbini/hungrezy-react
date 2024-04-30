// ordersSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialOrders = [
  {
    id: 1,
    items: [
        {
          itemName: 'Burger',
          price: 60,
          count: 2,
          veg_or_non_veg: 'veg',
          category: 'Fast Food',
          restaurant: 'FastFood Restaurant',
        },
        {
            itemName: 'Pizza',
            price: 90,
            count: 1,
            veg_or_non_veg: 'veg',
            category: 'Fast Food',
            restaurant: 'FastFood Restaurant',
          },
        // Add more food items as needed
      ],
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      mobileNumber: '1234567890',
    },
    address: {
      address: '123 Main St',
      city: 'Cityville',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    },
    paymentMethod: 'card',
    status: 'delivered',
  },
  // Add more initial orders as needed
];

const initialState = {
  orders: initialOrders,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const orderToUpdate = state.orders.find(order => order.id === orderId);

      if (orderToUpdate) {
        orderToUpdate.status = status;
      }
    },
    addOrder: (state, action) => {
        state.orders.push(action.payload);
    },
  },
});

export const { updateOrderStatus,addOrder } = ordersSlice.actions;
export const selectOrders = state => state.orders.orders;

export default ordersSlice.reducer;
