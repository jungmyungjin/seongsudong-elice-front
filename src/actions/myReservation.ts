import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { MyReservation } from 'types/myReservation';

export const loadMyReservation = createAsyncThunk(
  'myReservation/loadMyReservation',
  async (email: string | null) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/reservations/reservation-check?member_email=${email}`,
        { withCredentials: true },
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
      const body = {
        reservationId: reservation_id,
        email: email,
      };
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/reservations/cancel-reservation`,
        { data: body, withCredentials: true },
      );
      return response.data.status;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      console.log(axiosError.response?.data.error);
      throw error;
    }
  },
);

export interface sendEmailData {
  email: string | null;
  reservationId: string;
}

export const sendEmail = createAsyncThunk(
  'myReservation/sendEmail',
  async ({ email, reservationId }: sendEmailData) => {
    try {
      const body = {
        newEmail: email,
        reservationId,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/reservations/send-email`,
        { data: body, withCredentials: true },
      );
      console.log('이메일 전송 성공');
      return response.data;
    } catch (error) {
      console.error('이메일 전송 에러: ', error);
      throw error;
    }
  },
);

export const setMyReservationDetail = createAction<MyReservation>(
  'myReservation/setMyReservationDetail',
);
