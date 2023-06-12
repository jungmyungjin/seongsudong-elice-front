import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

/** api연결 성공 확인 */
export const online = createAsyncThunk(
  '/user/online',
  async (userEmail: string | null) => {
    try {
      const data = {
        email: userEmail,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/access/login`,
        data,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      return console.error(error);
    }
  },
);

export const offline = createAsyncThunk(
  '/user/offline',
  async (userEmail: string | null) => {
    try {
      const data = {
        email: userEmail,
      };
      // userEmail = email;
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/access/logout`,
        { data: data, withCredentials: true },
      );
      return response.data;
    } catch (error) {
      return console.error(error);
    }
  },
);
