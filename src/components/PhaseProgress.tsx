import React from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface ProgressBarProps {
  currentStep: number;
}

const PhaseProgress: React.FC<ProgressBarProps> = ({ currentStep }) => {
    const steps = ['INITIALIZATION', 'REGISTRATION', 'VOTING', 'RESULT'];
  
    return (
      <div className="w-full flex flex-col md:flex-row items-center justify-center mt-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center justify-center ${
              index === currentStep
                ? 'bg-blue-500 text-white'
                : index < currentStep
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-800'
            } h-10 md:h-12 w-full md:w-1/4 rounded-full my-2 md:my-0 md:mx-2`}
          >
            {index < currentStep ? (
              <>
                <span>{step}</span>
                <FontAwesomeIcon icon={faCheck} className="ml-2 w-8 h-8" />
              </>
            ) : (
              <span>{step}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  export default PhaseProgress