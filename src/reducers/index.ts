import { combineReducers } from 'redux';

import modalSlice from './modal';
import menuSlice from './slideMenu';
import myPostSlice from './myPost';
import myReservationSlice from './myReservation';

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
  menu: menuSlice.reducer,
  myPost: myPostSlice.reducer,
  myReservation: myReservationSlice.reducer,
});

export default rootReducer;
