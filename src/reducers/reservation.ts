import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReservationState } from '../types/reservation';

const getDate = () => {
  const today = new Date();
  const day = today.getDay();

  if (day === 0 || day === 6) {
    // 일요일(0)이거나 토요일(6)인 경우
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + (8 - day)); // 다음 주 월요일로 이동

    const year = nextMonday.getFullYear();
    const month = (nextMonday.getMonth() + 1).toString().padStart(2, '0');
    const date = nextMonday.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${date}`;
    return formattedDate;
  } else {
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = today.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${date}`;
    return formattedDate;
  }
};

export const initialState: ReservationState = {
  reservation_date: getDate(),
  time: '10:00~14:00',
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
