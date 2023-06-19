import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteUser, logout } from 'actions/user';

// 사용자 상태 타입 정의
interface UserState {
  loggedIn: boolean;
  isAdmin: boolean;
  email: string | null;
  username: string | null;
  course: string | null;
  generation: number | string;
  deleteUserDone: boolean;
  deleteUserError: null | string;
  logoutDone: boolean;
  logoutError: null | string;
}

interface LogInPayload {
  isAdmin: boolean;
  email: string;
  username: string;
  course: string;
  generation: number | string;
}

// 초기 사용자 상태
const initialState: UserState = {
  isAdmin: false,
  email: null,
  loggedIn: false,
  username: null,
  course: null,
  generation: 0,
  deleteUserDone: false,
  deleteUserError: null,
  logoutDone: false,
  logoutError: null,
};

// 사용자 상태 slice 생성
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 로그인 액션
    logIn: (state, action: PayloadAction<LogInPayload>) => {
      state.loggedIn = true;
      state.isAdmin = action.payload.isAdmin;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.course = action.payload.course;
      state.generation = action.payload.generation;
    },
    // 로그아웃 액션
    logOut: state => {
      state.isAdmin = false;
      state.email = null;
      state.loggedIn = false;
      state.username = null;
      state.course = null;
      state.generation = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logout.pending, state => {
        state.logoutDone = false;
        state.logoutError = null;
      })
      .addCase(logout.fulfilled, state => {
        state.logoutDone = true;
        state.logoutError = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutDone = false;
        state.logoutError = action.error.message || null;
      })
      .addCase(deleteUser.pending, state => {
        state.deleteUserDone = false;
        state.deleteUserError = null;
      })
      .addCase(deleteUser.fulfilled, state => {
        state.deleteUserDone = true;
        state.deleteUserError = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteUserDone = false;
        state.deleteUserError = action.error.message || null;
      });
  },
});

// 액션 내보내기
export const { logIn, logOut } = userSlice.actions;

// 리듀서 내보내기
export default userSlice;
