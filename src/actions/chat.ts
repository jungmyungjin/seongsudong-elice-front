import axios from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { IChatRoom } from 'types/chat';

export const setChatRoomDetail = createAction<IChatRoom>(
  'chat/setChatRoomDetail',
);
