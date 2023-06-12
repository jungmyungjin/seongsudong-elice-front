import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImyReservation, MyReservation } from 'types/myReservation';
import {
  loadMyReservation,
  cancelMyReservation,
  sendEmail,
} from 'actions/myReservation';

export const initialState: ImyReservation = {
  pastReservations: [],
  upcomingReservations: [],
  loadMyReservationLoading: false,
  loadMyReservationDone: false,
  loadMyReservationError: null,
  myReservationDetail: {
    reservation_id: '',
    member_generation: '',
    member_name: '',
    member_email: '',
    reservation_date: '',
    start_time: '',
    end_time: '',
    num_of_guests: 0,
    visitors: '',
    seat_number: '',
    seat_type: '',
    status: '',
    created_at: '',
  },
  successMessage: '',

  cancelMyReservationLoading: false,
  cancelMyReservationDone: false,
  cancelMyReservationError: null,

  sendEmailLoading: false,
  sendEmailDone: false,
  sendEmailError: null,
};

const myReservationSlice = createSlice({
  name: 'myReservation',
  initialState,
  reducers: {
    setMyReservationDetail: (state, action: PayloadAction<MyReservation>) => {
      state.myReservationDetail = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(loadMyReservation.pending, state => {
        state.loadMyReservationLoading = true;
        state.loadMyReservationDone = false;
        state.loadMyReservationError = null;
      })
      .addCase(loadMyReservation.fulfilled, (state, action) => {
        const { pastReservations, upcomingReservations } = action.payload || {};
        state.pastReservations = pastReservations || [];
        state.upcomingReservations = upcomingReservations || [];
        state.loadMyReservationLoading = false;
        state.loadMyReservationDone = true;
        state.loadMyReservationError = null;
      })
      .addCase(loadMyReservation.rejected, (state, action) => {
        state.loadMyReservationLoading = false;
        state.loadMyReservationDone = false;
        state.loadMyReservationError = action.error?.message || null;
      })
      .addCase(cancelMyReservation.pending, state => {
        state.cancelMyReservationLoading = true;
        state.cancelMyReservationDone = false;
        state.cancelMyReservationError = null;
      })
      .addCase(cancelMyReservation.fulfilled, (state, action) => {
        state.successMessage = action.payload;
        state.cancelMyReservationLoading = false;
        state.cancelMyReservationDone = true;
        state.cancelMyReservationError = null;
      })
      .addCase(cancelMyReservation.rejected, (state, action) => {
        state.cancelMyReservationLoading = false;
        state.cancelMyReservationDone = false;
        state.cancelMyReservationError = action.error?.message || null;
      })
      .addCase(sendEmail.pending, state => {
        state.sendEmailLoading = true;
        state.sendEmailDone = false;
        state.sendEmailError = null;
      })
      .addCase(sendEmail.fulfilled, state => {
        state.sendEmailLoading = false;
        state.sendEmailDone = true;
        state.sendEmailError = null;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.sendEmailLoading = false;
        state.sendEmailDone = false;
        state.sendEmailError = action.error?.message || null;
      }),
});

export const { setMyReservationDetail } = myReservationSlice.actions;

export default myReservationSlice;
