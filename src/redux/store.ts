/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { appSlice } from './slices/appStateReducer';
import { authSlice } from './slices/authReducter';
import { electionSlice } from './slices/electionStateReducer';
import { voterSlice } from './slices/voterStateReducer';
import { adminSlice } from './slices/adminStateReducer';

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [electionSlice.name]: electionSlice.reducer,
  [voterSlice.name]: voterSlice.reducer,
  [adminSlice.name]: adminSlice.reducer
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: [],
    devTools: true,
  });

const persistConfig = {
  key: 'root',
  whitelist: ['appState'],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: any = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const makeStore = () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return makeConfiguredStore();
  }

  store.__persistor = persistStore(store); // Nasty hack
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<AppStore>(makeStore);
