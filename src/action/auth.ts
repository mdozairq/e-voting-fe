import *  as api from '@/api'
import { AdminLogIn, CandidateSignIn, CandidateSignUp, Roles } from '@/lib/types';
import { setAppState } from '@/redux/slices/appStateReducer';
import { setAuthState } from '@/redux/slices/authReducter'



export const getVoterOtp = (formData: { uid: string }): any => async (dispatch: any) => {
    try {
        const { data } = await api.getOtp(formData);
        console.log(data)
        dispatch({ type: setAuthState, payload: { title: "is_otp_sent", value: true } })
    } catch (error: any) {
        const errorMessage = error?.response.data.message || 'An error occurred'; // Customize the error message based on your API response
        console.log(error);
    }
};

export const verifyVoterOtp = (formData: { uid: string, OTP: string }): any => async (dispatch: any) => {
    try {
        const { data } = await api.verifyOtp(formData);
        console.log(data)
        dispatch({ type: setAuthState, payload: { title: "is_otp_sent", value: false } })
        dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.VOTER } });
    } catch (error: any) {
        const errorMessage = error?.response.data.message || 'An error occurred'; // Customize the error message based on your API response
        console.log(error);
    }
};

export const candiateSignUp = (formData: CandidateSignUp): any => async (dispatch: any) => {
    try {
        const data = await api.candiateSignUp(formData);
        console.log(data);
        dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.CANDIDATE } });
    } catch (error) {
        console.log(error);
    }
}

export const candiateSignIn = (formData: CandidateSignIn): any => async (dispatch: any) => {
    try {
        const data = await api.candiateSignIn(formData);
        console.log(data);
        dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.CANDIDATE } });
    } catch (error) {
        console.log(error);
    }
}

export const adminLogIn = (formData: AdminLogIn): any => async (dispatch: any) => {
    try {
        const data = await api.adminLogIn(formData);
        console.log(data);
        dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.ADMIN } });
    } catch (error) {
        console.log(error);
    }
}
