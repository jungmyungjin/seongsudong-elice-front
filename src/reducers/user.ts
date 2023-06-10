import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 사용자 상태 타입 정의
interface UserState {
  loggedIn: boolean;
  isAdmin: boolean;
  email: string | null;
  username: string | null;
  course: string | null;
  generation: number | string;
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
};

// 사용자 상태 slice 생성
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 로그인 액션
    logIn: (state, action: PayloadAction<LogInPayload>) => {
      state.loggedIn = true;
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
});

// 액션 내보내기
export const { logIn, logOut } = userSlice.actions;

// 리듀서 내보내기
export default userSlice;
