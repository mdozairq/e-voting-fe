"use client"
import React, { useState } from "react";
import InitializationPhase from "./InitializationPhase";
import RegistrationPhase from "./RegistrationPhase";
import VotingPhase from "./VotingPhase";
import ResultPhase from "./ResultPhase";

enum Phase {
    Initialization,
    Registration,
    Voting,
    Result,
}

const PhaseSwitcher: React.FC = () => {
    const [currentPhase, setCurrentPhase] = useState<Phase>(Phase.Initialization);
    const [disabledPhase, setDisabledPhase] = useState<boolean>(false);

    const handleNextPhase = () => {
        console.log();

        if (currentPhase === Phase.Result) {
            setDisabledPhase(true)
            // setCurrentPhase(Phase.Initialization)
        }
        else {
            setCurrentPhase((prevPhase) => prevPhase + 1);
        }

    };

    return (
        <div className="flex justify-center items-center h-fit bg-gray-200 ">
            <div className="bg-white p-8 rounded shadow-md m-8">
                {currentPhase === Phase.Initialization && <InitializationPhase />}
                {currentPhase === Phase.Registration && <RegistrationPhase />}
                {currentPhase === Phase.Voting && <VotingPhase />}
                {currentPhase === Phase.Result && <ResultPhase />}

                <button
                    onClick={handleNextPhase}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    disabled={disabledPhase}
                >
                    {!disabledPhase ? "Next Phase" : "Election Over"}
                </button>
            </div>
        </div>
    );
};

export default PhaseSwitcher;
