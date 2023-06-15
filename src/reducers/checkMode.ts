import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckModeState {
  isDarkMode: boolean;
}

const initialState: CheckModeState = {
  isDarkMode: false,
};

const CheckModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsDarkMode } = CheckModeSlice.actions;

export default CheckModeSlice;
