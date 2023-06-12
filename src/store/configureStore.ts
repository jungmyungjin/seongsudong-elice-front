import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'reducers';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
