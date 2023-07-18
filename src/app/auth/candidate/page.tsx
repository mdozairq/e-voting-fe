"use client"
import { Roles } from '@/lib/types';
import { useAppDispatch } from '@/redux/hooks';
import { setAppState } from '@/redux/slices/appStateReducer';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';

enum FormType {
    Signup = 'signup',
    Login = 'login',
    ForgotPassword = 'forgotPassword',
}

const CandidateAuth: React.FC = () => {
    const [formType, setFormType] = useState(FormType.Signup);
    const [username, setUsername] = useState('');
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const router = useRouter()
    const dispatch = useAppDispatch()
    
    const handleFormSwitch = (type: FormType) => {
        setFormType(type);
        clearFormFields();
    };

    const clearFormFields = () => {
        setUsername('');
        setAadhaarNumber('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setOtp(['', '', '', '']);
    };

    const handleInputChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to the next input box if a digit is entered
        if (value !== '' && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formType === FormType.Signup) {
            // Perform signup logic here
            console.log('Signup form submitted');
        } else if (formType === FormType.Login) {
            // Perform login logic here
            console.log('Login form submitted');
            dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.CANDIDATE } });
            router.push('/candidate');
        } else if (formType === FormType.ForgotPassword) {
            // Perform forgot password logic here
            console.log('Forgot password form submitted');
        }

        clearFormFields();
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded px-8 py-6 w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {formType === FormType.Signup && 'Candidate Sign Up'}
                    {formType === FormType.Login && 'Candidate Log In'}
                    {formType === FormType.ForgotPassword && 'Forgot Password'}
                </h2>

                {formType === FormType.Signup && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="aadhaarNumber" className="block text-gray-700 text-sm font-bold mb-2">
                                Aadhaar Number
                            </label>
                            <input
                                type="text"
                                id="aadhaarNumber"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter Aadhaar number"
                                maxLength={14}
                                value={aadhaarNumber}
                                onChange={(e) => formatAadhaarNumber(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Sign Up
                        </button>
                        <button
                            type="button"
                            className="text-blue-500 hover:underline mt-2"
                            onClick={() => handleFormSwitch(FormType.Login)}
                        >
                            Already have an account? Log In
                        </button>
                    </form>
                )}

                {formType === FormType.Login && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Log In
                        </button>
                        <button
                            type="button"
                            className="text-blue-500 hover:underline mt-2"
                            onClick={() => handleFormSwitch(FormType.Signup)}
                        >
                            {"Don't have an account? Sign Up"}
                        </button>
                        <button
                            type="button"
                            className="text-blue-500 hover:underline mt-2"
                            onClick={() => handleFormSwitch(FormType.ForgotPassword)}
                        >
                            Forgot Password?
                        </button>
                    </form>
                )}

                {formType === FormType.ForgotPassword && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="aadhaarNumber" className="block text-gray-700 text-sm font-bold mb-2">
                                Aadhaar Number
                            </label>
                            <input
                                type="text"
                                id="aadhaarNumber"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter Aadhaar number"
                                value={aadhaarNumber}
                                onChange={(e) => setAadhaarNumber(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
                                Enter OTP
                            </label>
                            <div className="flex justify-center space-x-4">
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
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Verify OTP
                        </button>
                        <button
                            type="button"
                            className="text-blue-500 hover:underline mt-2"
                            onClick={() => handleFormSwitch(FormType.Login)}
                        >
                            Back to Log In
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CandidateAuth;
