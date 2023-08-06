import { Roles } from '@/lib/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface authStateType {
    current_role: Roles,
    is_otp_sent: boolean
}

const initialState: authStateType = {
    current_role: Roles.GUEST,
    is_otp_sent: false
};

export const authSlice = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        setAuthState: (state: any, action: PayloadAction<any>) => {
            const {
                payload: { title, value },
            } = action;

            state[title] = value;
        },
        setOtpSent: (state: any, action: PayloadAction<any>) => {
            const {
                payload: { data },
            } = action;
            console.log(data);
            
            state.is_otp_sent = data;
        }
    },
});

export const {
    setAuthState,
} = authSlice.actions;

export default authSlice.reducer;
