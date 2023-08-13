import { Roles } from '@/lib/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface voterStateType {
    current_role: Roles,
    voter_election: any,
}

const initialState: voterStateType = {
    current_role: Roles.GUEST,
    voter_election: null
}

export const voterSlice = createSlice({
    name: 'voterState',
    initialState,
    reducers: {
        setVoterState: (state: any, action: PayloadAction<any>) => {
            const {
                payload: { title, value },
            } = action;

            state[title] = value;
        }
    },
});

export const {
    setVoterState
} = voterSlice.actions;

export default voterSlice.reducer;
