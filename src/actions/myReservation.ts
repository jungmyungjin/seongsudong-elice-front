import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { MyReservation } from 'types/myReservation';

export const loadMyReservation = createAsyncThunk(
  'myReservation/loadMyReservation',
  async (email: string | null) => {
    email = 'email2@gmail.com';
    try {
      /** 로그인 성공 시 전역에 저장되어있는 이메일 여기다 넣음 */
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/reservations/reservation-check?member_email=${email}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export interface data {
  reservation_id: string;
  email: string | null;
}

export const cancelMyReservation = createAsyncThunk(
  'myReservation/cancelMyReservation',
  async ({ reservation_id, email }: data) => {
    try {
      const userEmail = 'email2@gmail.com';
      const body = {
        reservationId: reservation_id,
        email: userEmail,
      };
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/reservations/cancel-reservation`,
        { data: body },
      );
      return response.data.status;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      console.log(axiosError.response?.data.error);
      throw error;
    }
  },
);

export const setMyReservationDetail = createAction<MyReservation>(
  'myReservation/setMyReservationDetail',
);
