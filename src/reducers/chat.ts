import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat, IChatMessage, IChatRoom } from 'types/chat';

export const initialState: IChat = {
  loadChatLoading: false,
  loadChatDone: false,
  loadChatError: null,
  isOnline: false,
  chatRoomDetail: {
    room_id: 0,
    email: '',
    name: '',
    generation: '',
    message: '',
    sentAt: '',
    chatList: null,
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<{ chatMessage: IChatMessage }>) => {
      const { chatMessage } = action.payload;
      state.chatRoomDetail.chatList = state.chatRoomDetail.chatList
        ? [...state.chatRoomDetail.chatList, chatMessage]
        : [chatMessage];
    },
    setChatRoomDetail: (state, action: PayloadAction<IChatRoom>) => {
      state.chatRoomDetail = action.payload;
    },
    /** 초반에 모든 메세지 불러올 때 */
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
