import { getCandidateByElection } from '@/action/election';
import { useAppSelector } from '@/redux/hooks';
import { getElectionData } from '@/redux/selectors/app';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const CandidateTable: React.FC = () => {
    const { current_election, election_candidate } = useAppSelector(getElectionData);
    const dispatch = useDispatch();

    useEffect(() => {
        if (current_election && !election_candidate) {
            dispatch(getCandidateByElection(current_election._id))
        }
    }, [current_election, election_candidate])

    return (
        <div className="bg-white p-4 shadow-md rounded-md overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Party</th>
                        <th className="py-2 px-4 text-center">Logo</th>
                        <th className="py-2 px-4 text-center">Assets</th>
                        <th className="py-2 px-4 text-center">Crime Records</th>
                        <th className="py-2 px-4 text-center">Accused</th>
                        <th className="py-2 px-4 text-center">Ruling</th>
                    </tr>
                </thead>
                <tbody>
                    {current_election && election_candidate && election_candidate.candidates && (
                        election_candidate.candidates.map((candidate: any) => (
                            <tr key={candidate._id} className="border-b border-gray-200">
                                <td className="py-3 px-4 whitespace-nowrap">{candidate.voter?.name}</td>
                                <td className="py-3 px-4 whitespace-nowrap">{candidate.party?.party_name}</td>
                                <td className="py-3 px-4 text-center">
                                    <img
                                        src={candidate.party?.party_logo_url}
                                        alt={candidate.party?.party_name}
                                        className="h-12 w-12 rounded-full mx-auto"
                                    />
                                </td>
                                <td className="py-3 px-4 text-center">{candidate.assets}</td>
                                <td className="py-3 px-4 text-center">{candidate.has_crime_records ? 'Yes' : 'No'}</td>
                                <td className="py-3 px-4 text-center">{candidate.is_accused ? 'Yes' : 'No'}</td>
                                <td className="py-3 px-4 text-center">{candidate.party?.is_ruling ? 'Yes' : 'No'}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CandidateTable;
