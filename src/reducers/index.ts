import { combineReducers } from 'redux';

import modalSlice from './modal';
import menuSlice from './slideMenu';
import myPostSlice from './myPost';
import myReservationSlice from './myReservation';
import chatSlice from './chat';
import userSlice from './user';
import accessSlice from './access';
import reservationSlice from './reservation';

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
  menu: menuSlice.reducer,
  myPost: myPostSlice.reducer,
  myReservation: myReservationSlice.reducer,
  chat: chatSlice.reducer,
  user: userSlice.reducer,
  access: accessSlice.reducer,
  reservation: reservationSlice.reducer,
});

export default rootReducer;
