import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat, IChatMessage, IChatRoom } from 'types/chat';

export const initialState: IChat = {
  chatList: [],
  loadChatLoading: false,
  loadChatDone: false,
  loadChatError: null,
  chatRoomList: [],
  chatRoomDetail: {
    roomId: 0,
    memberName: '',
    adminEmail: '',
    memberEmail: '',
    createAt: '',
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat(state, action: PayloadAction<IChatMessage>) {
      state.chatList.push(action.payload);
    },
    setChatRoomDetail: (state, action: PayloadAction<IChatRoom>) => {
      state.chatRoomDetail = action.payload;
    },
  },
});

export const { addChat, setChatRoomDetail } = chatSlice.actions;
export default chatSlice;
