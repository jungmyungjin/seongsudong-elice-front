import axios from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { MyReservation } from 'types/myReservation';

axios.defaults.baseURL = 'http://localhost:3000';

export const loadMyReservation = createAsyncThunk(
  'myReservation/loadMyReservation',
  async () => {
    try {
      /** 로그인 성공 시 전역에 저장되어있는 이메일 여기다 넣음 */
      const userEmail = 'email2@gmail.com';
      const response = await axios.get(
        `/api/reservations/reservation-check?member_email=${userEmail}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const cancelMyReservation = createAsyncThunk(
  'myReservation/cancelMyReservation',
  async (reservation_id: string) => {
    try {
      const userEmail = 'email2@gmail.com';
      const body = {
        reservationId: reservation_id,
        email: userEmail,
      };
      const response = await axios.delete(
        `/api/reservations/cancel-reservation`,
        {
          data: body,
        },
      );
      return response.data.status;
    } catch (error) {
      throw error;
    }
  },
);

export const setMyReservationDetail = createAction<MyReservation>(
  'myReservation/setMyReservationDetail',
);
