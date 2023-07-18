import React from "react";

const ResultPhase: React.FC = () => {
  return (
    <div>
      <h1>Result Phase</h1>
      <ul className="mt-4">
        {/* Render count of ballots for each candidate */}
        <li>
          Candidate 1: <span className="font-bold">100</span>
        </li>
        <li>
          Candidate 2: <span className="font-bold">200</span>
        </li>
        <li>
          Candidate 3: <span className="font-bold">150</span>
        </li>
      </ul>
    </div>
  );
};

export default ResultPhase;
