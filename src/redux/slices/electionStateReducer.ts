import { Roles } from '@/lib/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface authStateType {
    current_role: Roles,
    is_otp_sent: boolean,
    voter_data: any,
    candidate_data: any,
    admin_data: any,
    all_election: any,
    current_election: any,
    party_list: any,
    current_party: any
}

const initialState: authStateType = {
    current_role: Roles.GUEST,
    is_otp_sent: false,
    voter_data: null,
    candidate_data: null,
    admin_data: null,
    all_election: null,
    current_election: null,
    party_list: null,
    current_party: null
};

export const electionSlice = createSlice({
    name: 'electionState',
    initialState,
    reducers: {
        setElectionState: (state: any, action: PayloadAction<any>) => {
            const {
                payload: { title, value },
            } = action;

            state[title] = value;
        },
        resetElectionState: (state: any) => {
            return initialState; // Reset to initial state
        },
    },
});

export const {
    setElectionState,
    resetElectionState,
} = electionSlice.actions;

export default electionSlice.reducer;
