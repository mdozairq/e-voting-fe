"use client"
import { useAppSelector } from '@/redux/hooks';
import { getAuthData } from '@/redux/selectors/app';
import React, { useEffect } from 'react';

interface CandidateInfoProps {
    candidate_data: any; // Replace with the actual data structure
}

const CandidateInfoCard: React.FC = () => {
    const { candidate_data } = useAppSelector(getAuthData);

    useEffect(() => {
        if (!candidate_data) {
            // dispatch(getPartyList());
        }
    }, [candidate_data]);

    return (
        candidate_data && (
            <div className="bg-white rounded shadow-md p-4 md:p-6 m-4">
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
