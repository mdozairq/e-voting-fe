"use client"
import { updateELectionPhase } from '@/action/election';
import { UpdateElectionDto } from '@/lib/types';
import { useAppSelector } from '@/redux/hooks';
import { getElectionData } from '@/redux/selectors/app';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

interface ConfirmationDialogProps {
    isOpen: boolean;
    title: string;
    timeData: any,
    setTimeData: any,
    message: string;
    onCancel: () => void;
    onConfirm:  any
}

const SetTime: React.FC<ConfirmationDialogProps> = ({
    isOpen,
    title,
    timeData,
    setTimeData,
    onCancel,
    onConfirm,
}) => {
    const { current_election } = useAppSelector(getElectionData);
    if (!isOpen) return null;
    const dispatch = useDispatch();
    

    // const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        
    // };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 min-w-max">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <form autoComplete="off" 
                // onSubmit={handleFormSubmit}
                >
                    <div className="mb-4">
                        <label htmlFor="startDate" className="block font-semibold mb-2">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="w-full border rounded p-2"
                            value={timeData.start_date}
                            onChange={(e) => setTimeData({ ...timeData, start_date: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startTime" className="block font-semibold mb-2">
                            Start Time
                        </label>
                        <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            className="w-full border rounded p-2"
                            value={timeData.start_time}
                            onChange={(e) => setTimeData({ ...timeData, start_time: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endDate" className="block font-semibold mb-2">
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="w-full border rounded p-2"
                            value={timeData.end_date}
                            onChange={(e) => setTimeData({ ...timeData, end_date: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endTime" className="block font-semibold mb-2">
                            End Time
                        </label>
                        <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            className="w-full border rounded p-2"
                            value={timeData.end_time}
                            onChange={(e) => setTimeData({ ...timeData, end_time: e.target.value })}
                        />
                    </div>
                </form>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SetTime