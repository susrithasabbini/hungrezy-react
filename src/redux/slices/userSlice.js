// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    mobileNumber : '6301581943',
    firstName : 'Ravi Teja',
    lastName : 'Abboju',
    email : 'abbojuraviteja@gmail.com',
    password : 'Teja@123'
  }, // Initially, no user is signed in
  isAuthenticated: true, // Initially, user is not authenticated
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearCurrentUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
