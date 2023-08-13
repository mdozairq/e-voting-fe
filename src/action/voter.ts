import *  as api from '@/api'
import { setAppState } from '@/redux/slices/appStateReducer';
import { setVoterState } from '@/redux/slices/voterStateReducer';

export const getElectionByAadhaar = (adhaar: string): any => async (dispatch: any) => {
    try {
        console.log("adhaar",adhaar);
        const { data } = await api.getElectionByAadhaar(adhaar)
        dispatch({ type: setVoterState, payload: { title: "voter_election", value: data }});
    } catch (error: any) {
        dispatch({ type: setAppState, payload: { title: "global_error", value:  (error && error?.response.data.error) || "Something Went Wrong" } })
        console.log(error);
    }
};