import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat, IChatMessage, IChatRoom } from 'types/chat';
// import produce from 'immer';

export const initialState: IChat = {
  loadChatLoading: false,
  loadChatDone: false,
  loadChatError: null,
  isOnline: false,
  chatRoomList: [],
  chatRoomDetail: {
    room_id: 0,
    email: '',
    name: '',
    generation: '',
    message: '',
    sentAt: '',
    chatList: [],
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<{ chatMessage: IChatMessage }>) => {
      const { chatMessage } = action.payload;
      state.chatRoomDetail.chatList = [
        ...state.chatRoomDetail.chatList,
        chatMessage,
      ];
    },
    setChatRoomDetail: (state, action: PayloadAction<IChatRoom>) => {
      state.chatRoomDetail = action.payload;
    },
  },
});

export const { addChat, setChatRoomDetail } = chatSlice.actions;
export default chatSlice;
