import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat, IChatMessage, IChatRoom, emailList } from 'types/chat';

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
  onlineList: [],
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
    setChatRoomDetailChatList: (
      state,
      action: PayloadAction<IChatMessage[]>,
    ) => {
      state.chatRoomDetail.chatList = action.payload;
    },
    setOnlineEmailList: (state, action: PayloadAction<emailList[]>) => {
      return {
        ...state,
        onlineList: action.payload,
      };
    },
  },
});

export const {
  addChat,
  setChatRoomDetail,
  setChatRoomDetailChatList,
  setOnlineEmailList,
} = chatSlice.actions;
export default chatSlice;
