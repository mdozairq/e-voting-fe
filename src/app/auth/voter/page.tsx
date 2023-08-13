"use client"
import { getVoterOtp, verifyVoterOtp } from '@/action/auth';
import ProtectedRoute from '@/lib/protectedRoute';
import { Roles } from '@/lib/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAuthData } from '@/redux/selectors/app';
import { setAppState } from '@/redux/slices/appStateReducer';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';

const VoterAuth = () => {
    const { is_otp_sent } = useAppSelector(getAuthData);
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const appDispatch = useAppDispatch()
    const dispatch = useDispatch()
    const router = useRouter()
    console.log("is_otp_sent:", is_otp_sent);

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

        if (submitAdhaar.length === 12) {
            dispatch(getVoterOtp({ uid: submitAdhaar }))
        }
        // setIsOtpSent(true)
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        const submitAdhaar = aadhaarNumber.replace(/-/g, "")
        // Perform OTP verification logic here
        if (enteredOtp.length === 4) {
            console.log('Verifying OTP:', enteredOtp, { uid: submitAdhaar, OTP: enteredOtp });
            dispatch(verifyVoterOtp({ uid: submitAdhaar, OTP: enteredOtp }));
        }
    };


    return (
        <ProtectedRoute role={Roles.GUEST}>
            <div className="hero">
                <div className="flex-1 padding-x">
                    <div className="flex justify-center items-center h-screen">
                        <div className="bg-white shadow-md rounded px-8 py-6 w-96">
                            <h2 className="text-2xl font-bold mb-6">{is_otp_sent ? 'Verify OTP' : 'Enter Aadhaar Number'}</h2>
                            {is_otp_sent ? (
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
        </ProtectedRoute>
    )
}

export default VoterAuth