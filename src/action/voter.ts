import *  as api from '@/api'
import { VotingBallot } from '@/lib/types';
import { setAppState } from '@/redux/slices/appStateReducer';
import { setAuthState } from '@/redux/slices/authReducter';
import { setVoterState } from '@/redux/slices/voterStateReducer';

export const getElectionByAadhaar = (adhaar: string): any => async (dispatch: any) => {
    try {
        console.log("adhaar", adhaar);
        const { data } = await api.getElectionByAadhaar(adhaar)
        dispatch({ type: setVoterState, payload: { title: "voter_election", value: data } });
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value: (error && error?.response.data.error) || "Something Went Wrong" } })
        console.log(error);
    }
};

export const votingBallot = (voting_payload: VotingBallot): any => async (dispatch: any) => {
    try {
        const { data } = await api.voteBallot(voting_payload)
        console.log(data);
        
        dispatch(getVoterById(voting_payload.voter_id))
        // dispatch({ type: setVoterState, payload: { title: "voter_election", value: data }});
    } catch (error: any) {
        dispatch(getVoterById(voting_payload.voter_id))
        dispatch({ type: setAppState, payload: { title: "global_error", value: (error && error?.response.data.error) || "Something Went Wrong" } })
        console.log(error);
    }
}

export const getVoterById = (id: string): any => async (dispatch: any) => {
    try {
        console.log(id);
        
        const { data } = await api.getVoterById(id)
        console.log(data);
        dispatch({ type: setAuthState, payload: { title: "voter_data", value: data } });
        // dispatch({ type: setVoterState, payload: { title: "voter_election", value: data }});
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value: (error && error?.response.data.error) || "Something Went Wrong" } })
        console.log(error);
    }
};