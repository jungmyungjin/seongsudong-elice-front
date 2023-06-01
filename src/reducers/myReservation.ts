import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImyReservation } from 'types/myReservation';

export const initialState: ImyReservation = {
  myReservation: [],
  loadMyReservationLoading: false,
  loadMyReservationDone: false,
  loadMyReservationError: null,
};

const myReservationSlice = createSlice({
  name: 'myReservation',
  initialState,
  reducers: {
    setMyReservation: (
      state,
      action: PayloadAction<ImyReservation['myReservation']>,
    ) => {
      state.myReservation = action.payload;
    },
    // extraReducers: builder =>
    //   builder
    //     .addCase(loadMyReservation.pending, state => {
    //       state.loadMyReservationLoading = true;
    //       state.loadMyReservationDone = false;
    //       state.loadMyReservationError = null;
    //     })
    //     .addCase(loadMyReservation.fulfilled, (state, action) => {
    //       state.MyReservation = action.payload;
    //       state.loadMyReservationLoading = false;
    //       state.loadMyReservationDone = true;
    //       state.loadMyReservationError = null;
    //     })
    //     .addCase(loadMyReservation.rejected, (state, action) => {
    //       state.loadMyReservationLoading = false;
    //       state.loadMyReservationDone = false;
    //       state.loadMyReservationError = action.error.message || null;
    //     }),
  },
});

export default myReservationSlice;
