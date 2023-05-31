import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImyPost } from 'types/myPost';

export const initialState: ImyPost = {
  myPost: [],
  loadMyPostLoading: false,
  loadMyPostDone: false,
  loadMyPostError: null,
};

const myPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setMyPostList: (state, action: PayloadAction<ImyPost['myPost']>) => {
      state.myPost = action.payload;
    },
  },
  // extraReducers: (builder) =>
  //   builder
  // .addCase(loadMyPost.pending, (state) => {
  //   state.loadMyPostLoading = true;
  //   state.loadMyPostDone = false;
  //   state.loadMyPostError = null;
  // })
  // .addCase(loadMyPost.fulfilled, (state, action) => {
  //   state.loadMyPostLoading = false;
  //   state.loadMyPostDone = true;
  //   state.loadMyPostError = null;
  //   state.myPost = state.myPost.concat(action.payload);
  //   state.hasMoreMyPost = action.payload.length === 6;
  //   if (state.hasMoreMyPost) {
  //     state.myPostPageNum += 1;
  //   }
  // })
  // .addCase(loadMyPost.rejected, (state, action) => {
  //   state.loadMyPostLoading = false;
  //   state.loadMyPostDone = false;
  //   state.loadMyPostError = action.error.message;
  // })
});

export default myPostSlice;
