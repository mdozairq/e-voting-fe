"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPartyById, getPartyList } from '@/action/election';
import { useAppSelector } from '@/redux/hooks';
import { getElectionData } from '@/redux/selectors/app';
import { setElectionState } from '@/redux/slices/electionStateReducer';

interface PartyData {
    _id: string;
    party_name: string;
    party_type: string;
    party_slogan: string;
    party_logo_url: string;
    is_ruling: boolean;
    is_disqualified: boolean;
    created_at: string;
    updated_at: string;
}

interface PartyCardProps {
    party: PartyData;
}

const PartyCard: React.FC = () => {
    const { party_list } = useAppSelector(getElectionData);
    const [selectedParty, setSelectedParty] = useState<string|null|undefined>(null)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!party_list) {
            dispatch(getPartyList());
        }
    }, [party_list]);

    const handleParty = (id: string | null | undefined) => {
        console.log(id);
        setSelectedParty(id)
        if (id) {
            dispatch(getPartyById(id))
            // dispatch({ type: setElectionState, payload: { title: "current_party", value: id } })
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
            {party_list && party_list.map((party: PartyData) => (
                <div key={party._id}
                    className={`bg-white p-4 rounded shadow-md m-4 cursor-pointer ${selectedParty === party._id ? 'border-blue-500 border-2' : ''}`}
                    onClick={() => handleParty(party._id)}
                >
                    <div className="flex items-center mb-4">
                        <img src={party.party_logo_url} alt={party.party_name} className="w-20 h-20 rounded mr-4" />
                        <div>
                            <h3 className="text-xl font-semibold">{party.party_name}</h3>
                            {party.is_ruling ? <span className="bg-green-500 text-white px-2 py-1 rounded mr-2">Ruling</span> : null}
                            {party.is_disqualified ? <span className="bg-red-500 text-white px-2 py-1 rounded">Disqualified</span> : null}
                        </div>
                    </div>
                    <hr className='h-0 bg-black m-2' />
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="font-semibold">Party Type:</p>
                            <p>{party.party_type}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Party Slogan:</p>
                            <p>{`"${party.party_slogan}"`}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="font-semibold mb-2">Ruling Status:</p>
                            <span className={`px-2 py-1 rounded ${party.is_ruling ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                                {party.is_ruling ? 'Ruling' : 'Not Ruling'}
                            </span>
                        </div>
                        <div>
                            <p className="font-semibold mb-2">Disqualification Status:</p>
                            <span className={`px-2 py-1 rounded ${party.is_disqualified ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                                {party.is_disqualified ? 'Disqualified' : 'Not Disqualified'}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PartyCard;
