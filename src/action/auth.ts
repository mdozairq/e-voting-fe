import *  as api from '@/api'
import { AdminLogIn, CandidateSignIn, CandidateSignUp, Roles } from '@/lib/types';
import { setAppState } from '@/redux/slices/appStateReducer';
import { setAuthState } from '@/redux/slices/authReducter';
import jwtDecode from 'jwt-decode';
import { getAllConstituency, getAllElection } from './election';
import { getElectionByAadhaar } from './voter';



export const getVoterOtp = (formData: { uid: string }): any => async (dispatch: any) => {
    try {
        const { data } = await api.getOtp(formData);
        dispatch({ type: setAuthState, payload: { title: "is_otp_sent", value: true } })
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value: (error && error?.response.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
};

export const verifyVoterOtp = (formData: { uid: string, OTP: string }): any => async (dispatch: any) => {
    try {
        const data = await api.verifyOtp(formData);
        dispatch({ type: setAuthState, payload: { title: "is_otp_sent", value: false } })
        dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.VOTER } });
        dispatch({ type: setAuthState, payload: { title: "voter_data", value: jwtDecode(data.data.token) } });
        dispatch({ type: setAuthState, payload: { title: "candidate_data", value: null } });
        dispatch({ type: setAuthState, payload: { title: "admin_data", value: null } });
        localStorage.setItem('evoting-auth', JSON.stringify(data?.data.token ));
        localStorage.setItem('evoting-role', JSON.stringify(jwtDecode(data.data.token)));
        let voter:any = jwtDecode(data.data.token)
        console.log("voter: ", voter);
        
        if(voter && voter.IsEligible){
            console.log(voter);
            dispatch(getElectionByAadhaar(voter.AdhaarNumber))
        }
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value: (error && error?.response.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
};

export const candiateSignUp = (formData: CandidateSignUp): any => async (dispatch: any) => {
    try {
        const data = await api.candiateSignUp(formData);;
        dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.CANDIDATE } });
        dispatch({ type: setAuthState, payload: { title: "candidate_data", value: jwtDecode(data.data.token) } });
        dispatch({ type: setAuthState, payload: { title: "voter_data", value: null } });
        dispatch({ type: setAuthState, payload: { title: "admin_data", value: null } });
        localStorage.setItem('evoting-auth', JSON.stringify(data?.data.token));
        localStorage.setItem('evoting-role', JSON.stringify(jwtDecode(data.data.token)));
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value: (error && error?.response.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
}

export const candiateSignIn = (formData: CandidateSignIn): any => async (dispatch: any) => {
    try {
        const data = await api.candiateSignIn(formData);;
        dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.CANDIDATE } });
        dispatch({ type: setAuthState, payload: { title: "candidate_data", value: jwtDecode(data.data.token) } });
        dispatch({ type: setAuthState, payload: { title: "voter_data", value: null } });
        dispatch({ type: setAuthState, payload: { title: "admin_data", value: null } });
        localStorage.setItem('evoting-auth', JSON.stringify(data?.data.token));
        localStorage.setItem('evoting-role', JSON.stringify(jwtDecode(data.data.token)));
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value: (error && error?.response.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
}

export const adminLogIn = (formData: AdminLogIn): any => async (dispatch: any) => {
    try {
        const { data } = await api.adminLogIn(formData);;
        dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.ADMIN } });
        dispatch({ type: setAuthState, payload: { title: "admin_data", value: jwtDecode(data.token) } });
        dispatch({ type: setAuthState, payload: { title: "voter_data", value: null } });
        dispatch({ type: setAuthState, payload: { title: "candidate_data", value: null } });
        localStorage.setItem('evoting-role', JSON.stringify(jwtDecode(data.token)));
        dispatch(getAllElection())
        dispatch(getAllConstituency())
        localStorage.setItem('evoting-auth', JSON.stringify(data?.token));
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value: (error && error?.response.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
}


export const getCandidateById = (id: string) => async (dispatch: any) => {
    try {
        const { data } = await api.getCandidateById(id)
        dispatch({ type: setAuthState, payload: { title: "candidate_data", value: data }});
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value: (error && error?.response.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
};