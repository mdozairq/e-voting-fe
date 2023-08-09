"use client"
import { getAllElection, getElectionById, getRegistrationElection } from '@/action/election';
import { ElectionPhase, Roles } from '@/lib/types';
import { useAppSelector } from '@/redux/hooks';
import { getAppData, getElectionData } from '@/redux/selectors/app';
import { setElectionState } from '@/redux/slices/electionStateReducer';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';



const ElectionList: React.FC = () => {
    const { all_election } = useAppSelector(getElectionData);
    const [selectedElection, setSelectedElection] = useState<string|null|undefined>(null)
    const { current_role } = useAppSelector(getAppData)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const dispatch = useDispatch();
    const router = useRouter();
    console.log(current_role, all_election);

    const currentElections = all_election && all_election.elections



    const handlePagination = (page: number) => {
        setCurrentPage(page);
    };

    const handleAddElection = (id: string | null | undefined) => {
        console.log(id);
        if (current_role === Roles.ADMIN) {
            if (id) {
                dispatch(getElectionById(id));
            }
            else {
                dispatch({ type: setElectionState, payload: { title: "current_election", value: null } })
            }
            router.push("/admin/election")
        }
        else if (current_role === Roles.CANDIDATE && id) {
            setSelectedElection(id)
            dispatch(getElectionById(id));
            // dispatch({ type: setElectionState, payload: { title: "current_election", value: id } })
            // router.push("/candidate")
        }
    };

    useEffect(() => {
        if (!all_election) {
            if (current_role === Roles.ADMIN)
                dispatch(getAllElection());
            else if (current_role === Roles.CANDIDATE)
                dispatch(getRegistrationElection());
        }
    }, [all_election, current_role, dispatch]);

    return (
        <>
            {all_election && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1">
                    {currentElections && currentElections.map((election: any) => (
                        <div
                            key={election._id}
                            className={`flex bg-white p-5 rounded shadow-md m-5 cursor-pointer items-center flex-col justify-center h-56 w-auto ${selectedElection === election._id ? 'border-blue-500 border-2' : ''}`}
                            onClick={() => handleAddElection(election._id)}
                        >
                            <h3 className="text-xl font-semibold mb-2">{election.election_name}</h3>
                            <p className="text mb-2">{election.description}</p>
                            {current_role === Roles.CANDIDATE && <span className={`px-2 py-1 rounded ${election.election_phase === ElectionPhase.REGISTRATION ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                                {election.election_phase === ElectionPhase.REGISTRATION ? 'Registration Open' : 'Not Ruling'}
                            </span>}
                            {/* Add more details as needed */}
                        </div>
                    ))}
                    {current_role === Roles.ADMIN &&
                        <div
                            className="flex bg-lime-50 p-4 rounded shadow-md cursor-pointer m-5 items-center justify-center max-h-56"
                            onClick={() => handleAddElection(null)}
                        >
                            <h3 className="text-xl font-semibold">Add Election</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16"> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" /> </svg>
                        </div>}
                </div>
            )}

            {/* Pagination */}
            {/* <div className="flex justify-center items-center space-x-4 mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePagination(index + 1)}
                        className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div> */}
        </>
    );
};

export default ElectionList;
