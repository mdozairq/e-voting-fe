"use client"
import { getElectionByAadhaar, votingBallot } from '@/action/voter';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAuthData, getVoterData } from '@/redux/selectors/app';
import { setAuthState } from '@/redux/slices/authReducter';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface Candidate {
  id: number;
  name: string;
  party: string;
  partySign: string;
}

const EVMScreen: React.FC = () => {
  const { voter_data } = useAppSelector(getAuthData);
  const { voter_election } = useAppSelector(getVoterData);
  const dispatch = useDispatch();
  console.log(voter_data, voter_election);

  useEffect(() => {
    if (!voter_data) {
      dispatch({ type: setAuthState, payload: { title: "voter_data", value: JSON.parse(localStorage.getItem('evoting-role') as string) } })
    }
    if (voter_data && !voter_election) {
      dispatch(getElectionByAadhaar(voter_data.adhaar_number));
    }
  }, [voter_data, voter_election])

  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);

  const handleCandidateSelection = (id: number) => {
    setSelectedCandidateId(id);
  };

  const handleVoteRecord = () => {
    if (selectedCandidateId !== null) {
      // Perform vote recording logic here
      console.log('Vote recorded for candidate with ID:', selectedCandidateId);
      const voted_candidate = voter_election && voter_election.registeredCandidates.find((x: any) => {
        return x._id === selectedCandidateId ? x : null;
      })
      if (voter_election && voter_data) {
        let voting_payload = {
          voter_id: voter_data._id,
          candidate_id: voted_candidate._id,
          party_id: voted_candidate.party_id,
          election_id: voter_election?.election?._id,
        }

        console.log("voting_payload:",voting_payload);
        dispatch(votingBallot(voting_payload))
      }

    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-200 overflow-y-scroll">
      <div className="bg-white p-8 rounded shadow-md m-8 ">
        <div className="flex flex-col items-center">
          {
            voter_data && !voter_data.is_eligible ? <h2 className="text-3xl font-bold mb-6">You are not eligible to vote! (Under Age)</h2>
              : voter_data && voter_data.is_eligible && voter_data?.is_voted ? <h2 className="text-3xl font-bold mb-6">Your vote has been successfully recorded!</h2>
                : voter_data && voter_data.is_eligible && !voter_election ?
                  <h2 className="text-3xl font-light mb-6 ">{`No Election found at your Constituency!`}</h2>
                  : <>
                    <h2 className="text-3xl font-bold mb-6">{voter_election && `${voter_election.election.election_name} (${voter_election.election.election_type})`}</h2>
                    {voter_election && new Date() < new Date(voter_election && voter_election.election.start_date) ? (
                      <h2 className="text-3xl font-bold mb-6 text-gray-500">Voting phase has not started yet!</h2>
                    ) : new Date() > new Date(voter_election && voter_election.election.end_date) ? (
                      <h2 className="text-3xl font-bold mb-6 text-gray-500">Voting phase is over!</h2>
                    ) : (
                      <div className='border-spacing-2 border p-4 text-center bg-gray-200'>
                        <h3 className="text-2xl font-bold mb-6">EVM Screen</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {voter_election &&
                            voter_election.registeredCandidates.map((candidate: any) => (
                              <div
                                key={candidate._id}
                                className={`p-6 rounded-lg cursor-pointer ${selectedCandidateId === candidate._id ? 'bg-blue-500 text-white' : 'bg-gray-100'
                                  }`}
                                onClick={() => handleCandidateSelection(candidate._id)}
                              >
                                <div className="text-4xl font-bold mb-4">
                                  <img src={candidate.party.party_logo_url} alt={candidate.party.party_name} className="w-16 h-16" />
                                </div>
                                <div className="text-xl font-semibold mb-2">{candidate.voter.name}</div>
                                <div className="text-sm">{candidate.party.party_name}</div>
                              </div>
                            ))}
                        </div>
                      </div>)}
                    {voter_election && selectedCandidateId &&
                      <>
                        <button
                          className={`mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${selectedCandidateId !== null ? 'opacity-100' : 'opacity-50'
                            }`}
                          disabled={selectedCandidateId === null}
                          onClick={handleVoteRecord}
                        >
                          RECORD VOTE
                        </button>
                      </>}
                  </>}
        </div>
      </div>
    </div>
  );
};

export default EVMScreen;
