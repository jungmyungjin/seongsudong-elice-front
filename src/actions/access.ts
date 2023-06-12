import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

/** api연결 성공 확인 */
export const online = createAsyncThunk(
  '/user/online',
  async (userEmail: string | null) => {
    try {
      /** 로그인 성공 시 전역에 저장되어있는 이메일 여기다 넣음 */
      const email = 'test3@example.com';
      const data = {
        email: email,
      };
      // userEmail = email;
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/access/login`,
        data,
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
      /** 로그인 성공 시 전역에 저장되어있는 이메일 여기다 넣음 */
      const email = 'test3@example.com';
      const data = {
        email: email,
      };
      // userEmail = email;
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/access/logout`,
        { data: data },
      );
      return response.data;
    } catch (error) {
      return console.error(error);
    }
  },
);
