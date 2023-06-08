import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat, IChatMessage, IChatRoom } from 'types/chat';
// import produce from 'immer';

export const initialState: IChat = {
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
    chat: {
      sentAt: '',
      lastSendMsg: '',
    },
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
    setChatRoomDetailChatList: (
      state,
      action: PayloadAction<IChatMessage[]>,
    ) => {
      state.chatRoomDetail.chatList = action.payload;
    },
  },
});

export const { addChat, setChatRoomDetail, setChatRoomDetailChatList } =
  chatSlice.actions;
export default chatSlice;
