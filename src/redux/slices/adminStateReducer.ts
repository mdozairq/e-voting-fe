import { Roles } from '@/lib/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface adminStateType {
    current_role: Roles,
}

const initialState: adminStateType = {
    current_role: Roles.GUEST
}

export const adminSlice = createSlice({
    name: 'adminState',
    initialState,
    reducers: {
        setAdminState: (state: any, action: PayloadAction<any>) => {
            const {
                payload: { title, value },
            } = action;

            state[title] = value;
        },
        resetVoterState: (state: any) => {
            return initialState; // Reset to initial state
        },
    },
});

export const {
    setAdminState
} = adminSlice.actions;

export default adminSlice.reducer;
