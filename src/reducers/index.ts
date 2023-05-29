import { combineReducers } from 'redux';

import userSlice from './user';
import modalSlice from './modal';

const rootReducer = combineReducers({
  //슬라이스 리듀서를 한꺼번에 모아서 내보내기 위함
  user: userSlice.reducer,
  modal: modalSlice.reducer,
});

export default rootReducer;
