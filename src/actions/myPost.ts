import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:3000';

export const loadMyPost = createAsyncThunk('/post/loadMyPost', async () => {
  try {
    const userEmail = 'test1@example.com';
    const response = await axios.get(`/api/posts?email=${userEmail}`);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
});
