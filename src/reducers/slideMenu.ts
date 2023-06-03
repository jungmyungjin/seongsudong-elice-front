import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
  isOpen: boolean;
}

const initialState: MenuState = {
  isOpen: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: state => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice;
