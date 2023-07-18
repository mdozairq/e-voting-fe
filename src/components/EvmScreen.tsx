"use client"
import React, { useState } from 'react';

interface Candidate {
  id: number;
  name: string;
  party: string;
  partySign: string;
}

const EVMScreen: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 1, name: 'Candidate A', party: 'Party X', partySign: 'X' },
    { id: 2, name: 'Candidate B', party: 'Party Y', partySign: 'Y' },
    { id: 3, name: 'Candidate C', party: 'Party Z', partySign: 'Z' },
    { id: 4, name: 'Candidate D', party: 'Party A', partySign: 'A' },
  ]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);

  const handleCandidateSelection = (id: number) => {
    setSelectedCandidateId(id);
  };

  const handleVoteRecord = () => {
    if (selectedCandidateId !== null) {
      // Perform vote recording logic here
      console.log('Vote recorded for candidate with ID:', selectedCandidateId);
    }
  };

  return (
    <div className="flex justify-center items-center h-fit bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md m-8">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-6">EVM Screen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className={`p-6 rounded-lg cursor-pointer ${
                  selectedCandidateId === candidate.id ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
                onClick={() => handleCandidateSelection(candidate.id)}
              >
                <div className="text-4xl font-bold mb-4">{candidate.partySign}</div>
                <div className="text-xl font-semibold mb-2">{candidate.name}</div>
                <div className="text-sm">{candidate.party}</div>
              </div>
            ))}
          </div>
          <button
            className={`mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              selectedCandidateId !== null ? 'opacity-100' : 'opacity-50'
            }`}
            disabled={selectedCandidateId === null}
            onClick={handleVoteRecord}
          >
            RECORD VOTE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EVMScreen;
