"use client"
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'

const VoterAuth = () => {
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const router = useRouter()

    const handleInputChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to the next input box if a digit is entered
        if (value !== '' && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };


    const formatAadhaarNumber = (value: string) => {
        // Remove any existing hyphens and non-digit characters
        const newValue = value.replace(/-/g, '').replace(/\D/g, '');

        // Insert hyphens every 4 digits
        const parts = [];
        for (let i = 0; i < newValue.length; i += 4) {
            parts.push(newValue.substr(i, 4));
        }

        // Combine parts with hyphens
        const formattedValue = parts.join('-');

        // Set the formatted Aadhaar number
        setAadhaarNumber(formattedValue);
    };

    const handleAdhaarSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Perform OTP generation logic here
        const submitAdhaar = aadhaarNumber.replace(/-/g, "")
        console.log('Generating OTP for Aadhaar Number:', submitAdhaar);
        console.log(submitAdhaar.length);

        if (submitAdhaar.length === 12)
            setIsAadhaarVerified(true)
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        // Perform OTP verification logic here
        console.log('Verifying OTP:', enteredOtp);
        router.push("/voter")
    };


    return (
        <div className="hero">
            <div className="flex-1 padding-x">
                <div className="flex justify-center items-center h-screen">
                    <div className="bg-white shadow-md rounded px-8 py-6 w-96">
                        <h2 className="text-2xl font-bold mb-6">{isAadhaarVerified ? 'Verify OTP' : 'Enter Aadhaar Number'}</h2>
                        {isAadhaarVerified ? (
                            <form onSubmit={handleOtpSubmit}>
                                <div className="mb-4">
                                    {/* <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
                                        Enter OTP
                                    </label> */}
                                    <div className="flex justify-center space-x-4 mb-4">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                className="w-12 h-12 text-center appearance-none border rounded focus:outline-none focus:shadow-outline"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                                ref={(el) => (inputRefs.current[index] = el!)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                >
                                    Verify
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleAdhaarSubmit}>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        id="aadhaarNumber"
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter 12-digit Aadhaar number"
                                        maxLength={14}
                                        value={aadhaarNumber}
                                        onChange={(e) => formatAadhaarNumber(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                >
                                    Get OTP
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoterAuth