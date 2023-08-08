import *  as api from '@/api'
import { AdminLogIn, CandidateSignIn, CandidateSignUp, InitializeElectionDTO, Roles } from '@/lib/types';
import { setElectionState } from '@/redux/slices/electionStateReducer';




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