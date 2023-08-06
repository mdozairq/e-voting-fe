"use client"
import { candiateSignIn, candiateSignUp } from '@/action/auth';
import ProtectedRoute from '@/lib/protectedRoute';
import { CandidateSignIn, CandidateSignUp, Roles } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, use } from 'react';
import { useDispatch } from 'react-redux';

enum FormType {
    Signup = 'signup',
    Login = 'login',
    ForgotPassword = 'forgotPassword',
}

const CandidateAuth: React.FC = () => {
    const [formType, setFormType] = useState(FormType.Login);
    const [username, setUsername] = useState('');
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const router = useRouter()
    const dispatch = useDispatch();

    const validateEmail = (email: string) => {
        // Use a regular expression to validate the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string, confirmPassword: string) => {
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /[0-9]/;
        const specialCharacterRegex = /[^A-Za-z0-9]/;

        // Check if the password meets all the criteria
        const isUppercase = uppercaseRegex.test(password);
        const isLowercase = lowercaseRegex.test(password);
        const isDigit = digitRegex.test(password);
        const isSpecialCharacter = specialCharacterRegex.test(password);
        const isLengthValid = password.length >= 8;

        return isUppercase && isLowercase && isDigit && isSpecialCharacter && isLengthValid;
    };

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

        const isPasswordValid = validatePassword(password, confirmPassword);
        setIsPasswordValid(isPasswordValid)
        if (formType === FormType.Signup && isPasswordValid) {
            const isValid = validateEmail(email);
            setIsEmailValid(isValid);
            setIsConfirmPasswordValid(password === confirmPassword);
            if (isEmailValid && isConfirmPasswordValid) {
                const formPayload: CandidateSignUp = {
                    username: username,
                    uid: aadhaarNumber.replace(/-/g, ''),
                    email: email,
                    password: password
                }
                dispatch(candiateSignUp(formPayload))
                console.log('Signup form submitted');
                clearFormFields();
            }
        } else if (formType === FormType.Login && isEmailValid ) {
            if (isPasswordValid && isEmailValid) {
                const formPayload: CandidateSignIn = {
                    username: username,
                    password: password
                }
                dispatch(candiateSignIn(formPayload))
                console.log('Signup form submitted');
                clearFormFields();
            }
        } else if (formType === FormType.ForgotPassword) {
            // Perform forgot password logic here
            console.log('Forgot password form submitted');
        }

    };

    return (
        <ProtectedRoute role={Roles.GUEST}>
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
                                {!isEmailValid && (
                                    <p className="text-red-500 text-xs italic">Please enter a valid email address.</p>
                                )}
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
                                {!isPasswordValid && (
                                    <p className="text-red-500 text-xs italic">Please enter a valid Password.</p>
                                )}
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
                                {!isConfirmPasswordValid && (
                                    <p className="text-red-500 text-xs italic">Please enter a valid Password to confirm.</p>
                                )}
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
                                {!isPasswordValid && (
                                    <p className="text-red-500 text-xs italic">Please enter a valid Password.</p>
                                )}
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
        </ProtectedRoute>
    );
};

export default CandidateAuth;
