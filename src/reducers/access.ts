import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { online, offline } from '../actions/access';

export interface IAccess {
  onlineMessage: string;
  isOnlineLoading: boolean;
  isOnlineDone: boolean;
  isOnlineError: string | null;
  offlineMessage: string;
  isOfflineLoading: boolean;
  isOfflineDone: boolean;
  isOfflineError: string | null;
}

export const initialState: IAccess = {
  onlineMessage: '',
  isOnlineLoading: false,
  isOnlineDone: false,
  isOnlineError: null,
  offlineMessage: '',
  isOfflineLoading: false,
  isOfflineDone: false,
  isOfflineError: null,
};

const accessSlice = createSlice({
  name: 'access',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(online.pending, state => {
      state.isOnlineLoading = true;
      state.isOnlineDone = false;
      state.isOnlineError = null;
    });
    builder.addCase(online.fulfilled, (state, action) => {
      state.isOnlineLoading = false;
      state.isOnlineDone = true;
      state.onlineMessage = action.payload;
    });
    builder.addCase(online.rejected, (state, action) => {
      state.isOfflineLoading = false;
      state.isOfflineDone = true;
      state.isOfflineError = action.error.message || null;
    });
    builder.addCase(offline.pending, state => {
      state.isOfflineLoading = true;
      state.isOfflineDone = false;
      state.isOfflineError = null;
    });
    builder.addCase(offline.fulfilled, (state, action) => {
      state.isOfflineLoading = false;
      state.isOfflineDone = true;
      state.offlineMessage = action.payload;
    });
    builder.addCase(offline.rejected, (state, action) => {
      state.isOfflineLoading = false;
      state.isOfflineDone = true;
      state.isOfflineError = action.error.message || null;
    });
  },
});

export default accessSlice;
