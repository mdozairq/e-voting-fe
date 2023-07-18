import React from "react";

const VotingPhase: React.FC = () => {
  return (
    <div>
      <h1>Voting Phase</h1>
      <div className="flex items-center justify-center mt-8">
        {/* Add voting timer component */}
        <div className="text-4xl font-bold">00:05:00</div>
      </div>
      <div className="mt-8">
        {/* Render candidate options */}
        <div>
          <input type="radio" id="candidate1" name="candidate" />
          <label htmlFor="candidate1">Candidate 1</label>
        </div>
        <div>
          <input type="radio" id="candidate2" name="candidate" />
          <label htmlFor="candidate2">Candidate 2</label>
        </div>
        <div>
          <input type="radio" id="candidate3" name="candidate" />
          <label htmlFor="candidate3">Candidate 3</label>
        </div>
      </div>
    </div>
  );
};

export default VotingPhase;
