import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logout = createAsyncThunk('/user/logout', async () => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/members/logout`,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deleteUser = createAsyncThunk(
  '/user/delete',
  async (email: string | null) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/members/delete`,
        { email: email },
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);
