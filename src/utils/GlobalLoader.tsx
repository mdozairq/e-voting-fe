'use client'
import { useAppSelector } from "@/redux/hooks";
import { getAppData } from "@/redux/selectors/app";
import React from "react";

const Loader: React.FC = () => {
    const { current_role, global_loader, global_error } = useAppSelector(getAppData);
    console.log("LOADER", global_loader, global_error);
    return (
        <>
            {global_loader &&
                <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-opacity-50 bg-gray-900 z-50">
                    <div className="spinner border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                </div>
            }

        </>
    );
};

export default Loader;
