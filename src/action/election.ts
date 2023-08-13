import *  as api from '@/api'
import { AdminLogIn, CandidateSignIn, CandidateSignUp, CandidateUpdateDto, InitializeElectionDTO, Roles, UpdateElectionDto } from '@/lib/types';
import { setElectionState } from '@/redux/slices/electionStateReducer';
import { getCandidateById } from './auth';
import { setAppState } from '@/redux/slices/appStateReducer';




export const getAllElection = (): any => async (dispatch: any) => {
    try {
        const { data } = await api.getAllElection();
        dispatch({ type: setElectionState, payload: { title: "all_election", value: data } })
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value:  (error && error?.response?.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
};

export const getElectionById = (id: string): any => async (dispatch: any) => {
    try {
        const { data } = await api.getElectionById(id);
        dispatch({ type: setElectionState, payload: { title: "current_election", value: data } })
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value:  (error && error?.response?.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
};

export const initializeElection = (formData: InitializeElectionDTO): any => async (dispatch: any) => {
    try {
        const { data } = await api.initializeElection(formData);
        // dispatch({ type: setElectionState, payload: { title: "current_election", value: data.data } })
        dispatch(getElectionById(data.data._id));
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value:  (error && error?.response?.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
};

export const getRegistrationElection = (): any => async (dispatch: any) => {
    try {
        const { data } = await api.registrationElection()
        dispatch({ type: setElectionState, payload: { title: "all_election", value: data } })
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value:  (error && error?.response?.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
};

export const getPartyList = (query: string): any => async (dispatch: any) => {
    try {
        const { data } = await api.getPartyList(query)
        console.log(data)
        dispatch({ type: setElectionState, payload: { title: "party_list", value: data } })
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value:  (error && error?.response?.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
};

export const getPartyById = (id: string): any => async (dispatch: any) => {
    try {
        const { data } = await api.getPartyById(id)
        dispatch({ type: setElectionState, payload: { title: "current_party", value: data } })
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value:  (error && error?.response?.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
};

export const updateCandidateById = (id: string, update_payload: CandidateUpdateDto): any => async (dispatch: any) => {
    try {
        const { data } = await api.updateCandidateById(id, update_payload)
        dispatch(getCandidateById(id))
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value:  (error && error?.response?.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
};


export const updateELectionPhase = (id: string, update_payload: UpdateElectionDto): any => async (dispatch: any) => {
    try {
        const { data } = await api.updateELectionPhase(id, update_payload)
        dispatch(getElectionById(id))
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value:  (error && error?.response?.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
};

export const getAllConstituency = (): any => async (dispatch: any) => {
    try {
        const { data } = await api.getAllConstituency()
        dispatch({ type: setElectionState, payload: { title: "all_constituency", value: data } })
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value:  (error && error?.response?.data.error) || "Something Went Wrong" } });
        console.log(error);
    }
};
