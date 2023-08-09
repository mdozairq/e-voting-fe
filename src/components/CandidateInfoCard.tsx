"use client"
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAuthData } from '@/redux/selectors/app';
import { setAuthState } from '@/redux/slices/authReducter';
import React, { useEffect } from 'react';

interface CandidateInfoProps {
    candidate_data: any; // Replace with the actual data structure
}

const CandidateInfoCard: React.FC = () => {
    const { candidate_data } = useAppSelector(getAuthData);
    const dispatch = useAppDispatch();
    console.log("LCAN",candidate_data, JSON.parse(localStorage.getItem('evoting-role') as string));
    
    useEffect(() => {
        if (!candidate_data) {
            dispatch({ type: setAuthState, payload: { title: "candidate_data", value: JSON.parse(localStorage.getItem('evoting-role') as string) } })
            // dispatch(getPartyList());
        }
    }, [candidate_data]);

    return (
        candidate_data && (
            <div className="bg-white rounded shadow-md p-4 md:p-6 mx-8 my-3">
                <h1 className="text-2xl font-bold mb-1">Candidate Details</h1>
                <hr />
                <br />
                <h2 className="text-2xl font-semibold mb-4">{candidate_data.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-gray-500">Voter ID:</p>
                        <p>{candidate_data.voter_id}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Aadhaar Number:</p>
                        <p>{candidate_data.adhaar_number}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Phone:</p>
                        <p>{candidate_data.phone}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Gender:</p>
                        <p>{candidate_data.gender}</p>
                    </div>
                </div>
            </div>
        )
    );
};

export default CandidateInfoCard;
