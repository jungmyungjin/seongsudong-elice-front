import { createSlice } from '@reduxjs/toolkit';
import { ImyPost } from 'types/myPost';
import { loadMyPost } from 'actions/myPost';

export const initialState: ImyPost = {
  myPost: [],
  loadMyPostLoading: false,
  loadMyPostDone: false,
  loadMyPostError: null,
};

const myPostSlice = createSlice({
  name: 'myPost',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(loadMyPost.pending, state => {
        state.loadMyPostLoading = true;
        state.loadMyPostDone = false;
        state.loadMyPostError = null;
      })
      .addCase(loadMyPost.fulfilled, (state, action) => {
        state.myPost = action.payload;
        state.loadMyPostLoading = false;
        state.loadMyPostDone = true;
        state.loadMyPostError = null;
      })
      .addCase(loadMyPost.rejected, (state, action) => {
        state.loadMyPostLoading = false;
        state.loadMyPostDone = false;
        state.loadMyPostError = action.error.message || null;
      }),
});

export default myPostSlice;
