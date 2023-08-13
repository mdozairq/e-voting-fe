"use client"
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAppData } from '@/redux/selectors/app';
import { setAppState } from '@/redux/slices/appStateReducer';
import React, { useState, useEffect } from 'react';

const ErrorNotification: React.FC = () => {
    const { global_error } = useAppSelector(getAppData);
    const dispatch = useAppDispatch();

    const handleCloseError = () => {
        dispatch({ type: setAppState, payload: { title: "global_error", value: null } });
    };

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (global_error) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                handleCloseError();
            }, 3000); // Close after 3 seconds

            return () => {
                clearTimeout(timer)
            };
        }
    }, [global_error]);

    return (
        <>
            {isVisible && (
                <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-white text-red-500 p-4 rounded shadow-md">
                        {global_error}
                    </div>
                </div>
            )}
        </>
    );
};

export default ErrorNotification;
