import *  as api from '@/api'
import { AdminLogIn, CandidateSignIn, CandidateSignUp, Roles } from '@/lib/types';
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