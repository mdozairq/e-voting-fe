'use client'
import { useState, ChangeEvent } from 'react';

const AuthenticationPage = (): JSX.Element => {
  const [aadhaarNo, setAadhaarNo] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);

  const handleAadhaarChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAadhaarNo(event.target.value);
  };

  const handleOTPRequest = async () => {
    try {
      // Make API request to send OTP
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        body: JSON.stringify({ aadhaarNo }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // OTP request successful
        setOtpRequested(true);
        // Proceed with the next steps (e.g., showing OTP input box)
      } else {
        // Handle error response from the API
        // You can display an error message to the user or take appropriate action
      }
    } catch (error) {
      // Handle any network or API-related errors
    }
  };

  return (
    <div>
      <h1>Authentication Page</h1>
      {!otpRequested ? (
        <div>
          <label htmlFor="aadhaarNo">Aadhaar Number:</label>
          <input
            type="text"
            id="aadhaarNo"
            value={aadhaarNo}
            onChange={handleAadhaarChange}
          />
          <button onClick={handleOTPRequest}>Request OTP</button>
        </div>
      ) : (
        <div>
          <label htmlFor="otp">OTP:</label>
          <input type="text" id="otp" />
          {/* Include additional form elements or actions */}
        </div>
      )}
    </div>
  );
};

export default AuthenticationPage;
