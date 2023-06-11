import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReservationState } from '../types/reservation';

const getDate = () => {
  const today = new Date();
  const day = today.getDay();

  if (day === 0) {
    // 일요일(0)인 경우
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() + (1 - day)); // 해당 주 월요일로 이동

    const year = currentMonday.getFullYear();
    const month = (currentMonday.getMonth() + 1).toString().padStart(2, '0');
    const date = currentMonday.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${date}`;
    return formattedDate;
  }

  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + (8 - day)); // 다음 주 월요일로 이동

  const year = nextMonday.getFullYear();
  const month = (nextMonday.getMonth() + 1).toString().padStart(2, '0');
  const date = nextMonday.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${date}`;
  return formattedDate;
};

const getTime = (): string => {
  const currentHour = new Date().getHours();

  if (currentHour >= 10 && currentHour < 14) {
    return '14:00~18:00';
  } else if (currentHour >= 14 && currentHour < 18) {
    return '18:00~22:00';
  } else {
    return '10:00~14:00';
  }
};

export const initialState: ReservationState = {
  reservation_date: getDate(),
  time: getTime(),
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
