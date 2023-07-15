/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
import { Roles } from '@/lib/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AppStateType {
  role: Roles
}

const initialState: AppStateType = {
  role: Roles.GUEST,
};

export const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setAppState: (state: any, action: PayloadAction<any>) => {
      const {
        payload: { title, value },
      } = action;
      console.log(state, action, state.role);

      state[title] = value;
    },
  },
});

export const {
  setAppState,
} = appSlice.actions;

export default appSlice.reducer;
