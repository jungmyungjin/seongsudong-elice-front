import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logout = createAsyncThunk('/user/logout', async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/members/logout`,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    return console.error(error);
  }
});
