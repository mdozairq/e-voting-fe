"use client"
import { getAllElection } from '@/action/election';
import { useAppSelector } from '@/redux/hooks';
import { getElectionData } from '@/redux/selectors/app';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface Election {
    _id: string;
    election_name: string;
    description: string;
    // Add more properties as needed
}

interface Props {
    // elections: Election[];
    pageSize: number;
}

const ElectionList: React.FC = () => {
    const { all_election } = useAppSelector(getElectionData)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const dispatch = useDispatch();
    const router = useRouter()

    const lastIndex = all_election && currentPage * (all_election.page_size || 0);
    const firstIndex = all_election && lastIndex - (all_election.page_size || 0);
    const currentElections = all_election && all_election.elections.slice(firstIndex, lastIndex);

    const totalPages = all_election && Math.ceil(all_election.total/all_election.page_size);

    const handlePagination = (page: number) => {
        setCurrentPage(page);
    };

    const handleAddElection = () => {
        router.push("/admin/election");
    }

    useEffect(() => {
        if (!all_election) {
            dispatch(getAllElection())
        }

    }, [all_election])

    return (
        <>{
            all_election &&
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {currentElections.map((election: { _id: React.Key | null | undefined; election_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
                    <div key={election._id} className="flex bg-white p-4 rounded shadow-md m-5 cursor-pointer items-center flex-col justify-center max-h-56">
                        <h3 className="text-xl font-semibold mb-2">{election.election_name}</h3>
                        <p>{election.description}</p>
                        {/* Add more details as needed */}
                    </div>
                ))}
                <div className="flex bg-lime-50 p-4 rounded shadow-md cursor-pointer m-5 items-center justify-center max-h-56" onClick={handleAddElection}>
                    <h3 className="text-xl font-semibold">Add Election</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16"> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/> </svg>
                </div>
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
            </div>
        }</>
    );
};

export default ElectionList;
