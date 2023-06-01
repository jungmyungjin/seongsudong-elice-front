import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:3000';

export const loadMyInfo = createAsyncThunk('/user/loadMyInfo', async () => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get('/user/information', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return console.error(error);
  }
});
