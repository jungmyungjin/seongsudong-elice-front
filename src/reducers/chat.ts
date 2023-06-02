import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat, IChatMessage } from 'types/chat';

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
    addChat(state, action: PayloadAction<IChatMessage>) {
      state.chatList.push(action.payload);
    },
  },
});

export const { addChat } = chatSlice.actions;
export default chatSlice;
