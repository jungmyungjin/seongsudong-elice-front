import { createSlice } from '@reduxjs/toolkit';
import { loadMyInfo } from '../actions/user';
import { Iuser } from '../types/user';

export const initialState: Iuser = {
  myInfo: { profileId: null, email: null, name: null },
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
};

const userSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  // extraReducers: builder =>
  //   builder
  //     .addCase(loadMyInfo.pending, state => {
  //       state.loadMyInfoLoading = true;
  //       state.loadMyInfoDone = false;
  //       state.loadMyInfoError = null;
  //     })
  //     .addCase(loadMyInfo.fulfilled, (state, action) => {
  //       state.loadMyInfoLoading = false;
  //       state.loadMyInfoDone = true;
  //       state.myInfo = action.payload;
  //       state.loadMyInfoError = null;
  //     })
  //     .addCase(loadMyInfo.rejected, (state, action) => {
  //       state.loadMyInfoLoading = false;
  //       state.loadMyInfoDone = false;
  //       state.loadMyInfoError = action.error.message;
  //     })
});

export default userSlice;
