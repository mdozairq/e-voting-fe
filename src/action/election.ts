import *  as api from '@/api'
import { AdminLogIn, CandidateSignIn, CandidateSignUp, CandidateUpdateDto, InitializeElectionDTO, Roles } from '@/lib/types';
import { setElectionState } from '@/redux/slices/electionStateReducer';
import { getCandidateById } from './auth';




export const getAllElection = (): any => async (dispatch: any) => {
    try {
        const { data } = await api.getAllElection();
        console.log(data)
        dispatch({ type: setElectionState, payload: { title: "all_election", value: data } })
    } catch (error: any) {
        console.log(error);
    }
};

export const getElectionById = (id: string): any => async (dispatch: any) => {
    try {
        const { data } = await api.getElectionById(id);
        console.log(data)
        dispatch({ type: setElectionState, payload: { title: "current_election", value: data } })
    } catch (error: any) {
        console.log(error);
    }
};

export const initializeElection = (formData: InitializeElectionDTO): any => async (dispatch: any) => {
    try {
        const { data } = await api.initializeElection(formData);
        console.log(data)
        // dispatch({ type: setElectionState, payload: { title: "current_election", value: data.data } })
        dispatch(getElectionById(data.data._id));
    } catch (error: any) {
        console.log(error);
    }
};

export const getRegistrationElection = (): any => async (dispatch: any) => {
    try {
        const { data } = await api.registrationElection()
        console.log(data)
        dispatch({ type: setElectionState, payload: { title: "all_election", value: data } })
    } catch (error: any) {
        console.log(error);
    }
};

export const getPartyList = (): any => async (dispatch: any) => {
    try {
        const { data } = await api.getPartyList()
        console.log(data)
        dispatch({ type: setElectionState, payload: { title: "party_list", value: data } })
    } catch (error: any) {
        console.log(error);
    }
};

export const getPartyById = (id: string): any => async (dispatch: any) => {
    try {
        const { data } = await api.getPartyById(id)
        console.log(data)
        dispatch({ type: setElectionState, payload: { title: "current_party", value: data } })
    } catch (error: any) {
        console.log(error);
    }
};

export const updateCandidateById = (id: string, update_payload: CandidateUpdateDto): any => async (dispatch: any) => {
    try {
        const { data } = await api.updateCandidateById(id, update_payload)
        console.log(data)
        dispatch(getCandidateById(id))
    } catch (error: any) {
        console.log(error);
    }
};

