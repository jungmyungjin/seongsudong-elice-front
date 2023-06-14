import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReservationState } from '../types/reservation';
import { getCurrentDate, getNearestAvailableTime } from '../utils/getDate';

export const initialState: ReservationState = {
  reservation_date: getCurrentDate(),
  time: getNearestAvailableTime(),
  seat_number: '',
  seat_type: '개인석',
  visitors: '',
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    updateReservationInfo(
      state,
      action: PayloadAction<Partial<ReservationState>>,
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateReservationInfo } = reservationSlice.actions;

export default reservationSlice;
