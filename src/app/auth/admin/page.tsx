"use client"
import { adminLogIn } from '@/action/auth';
import ProtectedRoute from '@/lib/protectedRoute';
import { AdminLogIn, Roles } from '@/lib/types';
import { setAppState } from '@/redux/slices/appStateReducer';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const AdminAuth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const router = useRouter()
  const dispatch = useDispatch()

  const validateEmail = (email: string) => {
    // Use a regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the email before submitting the form
    const isValid = validateEmail(email);
    setIsEmailValid(isValid);

    if (isValid) {
      const adminPayload: AdminLogIn = {
        email: email,
        password: password
      }
      console.log('Login form submitted');
      dispatch(adminLogIn(adminPayload));
    }
  };

  return (
    <ProtectedRoute role={Roles.GUEST}>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow-md rounded px-8 py-6 w-96 justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isEmailValid ? 'border-red-500' : ''
                  }`}
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
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminAuth;
