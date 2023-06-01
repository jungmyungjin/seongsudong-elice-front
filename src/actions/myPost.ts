import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:8080';

export const loadMyPost = createAsyncThunk('/post/loadMyPost', async () => {
  try {
    /** 로그인 성공 시 전역에 저장되어있는 이메일 여기다 넣음 */
    const userEmail = 'test1@example.com';
    const response = await axios.get(`/api/posts?email=${userEmail}`);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
});
