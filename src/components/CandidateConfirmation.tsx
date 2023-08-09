import { useAppSelector } from '@/redux/hooks';
import { getElectionData } from '@/redux/selectors/app';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

interface CandidateConfirmationProp {
    setIsDialogOpen: React.Dispatch<React.SetStateAction<any>>;
}

const CandidateConfirmation = ({ setIsDialogOpen }: CandidateConfirmationProp) => {
    const { current_election, current_party } = useAppSelector(getElectionData);

    return (
        // <div className="max-w-lg w-full mx-auto items-center">
        <div className="bg-white p-8 rounded shadow-md mx-8 my-2">
            {current_election && current_party && (
                <div>
                    <h1 className="text-2xl font-bold mb-1">Registration Details</h1>
                    <hr />
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <p className="mb-2">
                            <span className="font-semibold">Election Name:</span> {current_election.election_name}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Election Type:</span> {current_election.election_type}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Election Year:</span> {current_election.election_year}
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">Party Name:</span> {current_party.party_name}
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">Party Logo:</span> {current_party.party_logo}
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">Election District:</span> {current_election.constituency.district}
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">Election State:</span> {current_election.constituency.state}
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">Election Country:</span> {current_election.constituency.country}
                        </p>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" onClick={()=>setIsDialogOpen(true)} >Register</button>
                </div>)
            }
        </div>
        // </div>
    )
}

export default CandidateConfirmation