import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from 'types/chat';

export const initialState: IChat = {
  chatList: [],
  loadChatLoading: false,
  loadChatDone: false,
  loadChatError: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat(state, action: PayloadAction<IChat['chatList']>) {
      state.chatList = action.payload;
    },
  },
  // extraReducers: builder =>
  //   builder
  //     .addCase(loadChatList.pending, state => {
  //       state.loadChatListLoading = true;
  //       state.loadChatListDone = false;
  //       state.loadChatListError = null;
  //     })
  //     .addCase(loadChatList.fulfilled, (state, action) => {
  //       state.ChatList = action.payload;
  //       state.loadChatListLoading = false;
  //       state.loadChatListDone = true;
  //       state.loadChatListError = null;
  //     })
  //     .addCase(loadChatList.rejected, (state, action) => {
  //       state.loadChatListLoading = false;
  //       state.loadChatListDone = false;
  //       state.loadChatListError = action.error.message || null;
  //     }),
});

export default chatSlice;
