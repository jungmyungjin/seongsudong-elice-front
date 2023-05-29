import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://52.78.251.23:8080';

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
