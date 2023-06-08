import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadMyPost = createAsyncThunk(
  '/post/loadMyPost',
  async (userEmail: string | null) => {
    try {
      /** 로그인 성공 시 전역에 저장되어있는 이메일 여기다 넣음 */
      const email = 'email2@gmail.com';
      userEmail = email;
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/posts?email=${userEmail}`,
      );
      return response.data;
    } catch (error) {
      return console.error(error);
    }
  },
);
