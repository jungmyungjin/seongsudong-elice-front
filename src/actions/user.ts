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
    console.error(error);
    throw error;
  }
});

export const deleteUser = createAsyncThunk('/user/delete', async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/members/delete`,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
