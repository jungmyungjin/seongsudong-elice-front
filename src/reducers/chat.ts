import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat, IChatMessage, IChatRoom } from 'types/chat';

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
    lastSendTime: '',
    lastSendMsg: '',
    chatList: [],
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat(
      state,
      action: PayloadAction<{ roomId: number; chatMessage: IChatMessage }>,
    ) {
      const { roomId, chatMessage } = action.payload;
      const chatRoomDetail = state.chatRoomDetail;

      if (chatRoomDetail.roomId === roomId) {
        const updatedChatList = [...chatRoomDetail.chatList, chatMessage];

        state.chatRoomDetail = {
          ...chatRoomDetail,
          chatList: updatedChatList,
        };
      }
    },
    setChatRoomDetail: (state, action: PayloadAction<IChatRoom>) => {
      state.chatRoomDetail = action.payload;
    },
  },
});

export const { addChat, setChatRoomDetail } = chatSlice.actions;
export default chatSlice;
