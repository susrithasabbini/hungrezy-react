import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menuItems: [] 
  },
  reducers: {
    setMenu: (state, action) => {
      state.menuItems = action.payload; 
    },
    addMenuItem: (state, action) => {
      state.menuItems = [action.payload, ...state.menuItems];
    },
    deleteMenuItem: (state, action) => {
      state.menuItems = state.menuItems.filter(item => item.id !== action.payload);
    },
    updateMenuItem: (state, action) => {
      const { id, updatedItem } = action.payload;
      const index = state.menuItems.findIndex(item => item.id === id);
      if (index !== -1) {
        state.menuItems[index] = updatedItem;
      }
    }
  }
});

export const { setMenu, addMenuItem, deleteMenuItem, updateMenuItem } = menuSlice.actions;



export const selectMenu = state => state.menu.menuItems;

export default menuSlice.reducer;
