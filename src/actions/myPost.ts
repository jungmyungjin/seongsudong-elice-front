import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadMyPost = createAsyncThunk(
  '/post/loadMyPost',
  async (userEmail: string | null) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/posts?email=${userEmail}`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      return console.error(error);
    }
  },
);
