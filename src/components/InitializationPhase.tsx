import React from "react";

const InitializationPhase: React.FC = () => {
  return (
    <div>
      <h1>Initialization Phase</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700 font-bold mb-2">
            Select State:
          </label>
          <select
            id="state"
            className="block appearance-none w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="">-- Select State --</option>
            {/* Add options for states */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="constituency" className="block text-gray-700 font-bold mb-2">
            Select Constituency:
          </label>
          <select
            id="constituency"
            className="block appearance-none w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="">-- Select Constituency --</option>
            {/* Add options for constituencies */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="electionName" className="block text-gray-700 font-bold mb-2">
            Election Name:
          </label>
          <input
            type="text"
            id="electionName"
            className="block appearance-none w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          />
        </div>
      </form>
    </div>
  );
};

export default InitializationPhase;
