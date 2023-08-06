'use client'
import { useAppSelector } from "@/redux/hooks";
import { getAppData } from "@/redux/selectors/app";
import React, { useEffect } from "react";

type GlobalErrorProps = {
    // onClose: () => void;
};

const GlobalError: React.FC<GlobalErrorProps> = () => {
    const { global_loader, global_error } = useAppSelector(getAppData);
    console.log("LOADER", global_loader, global_error);
    useEffect(() => {
        const timer = setTimeout(() => {
            // onClose();
        }, 5000); // Hide the error message after 5 seconds (adjust as needed)

        return () => clearTimeout(timer);
    }, []);

    return (<>
        {global_error !== "" && <div className="fixed bottom-4 right-4 w-64 p-4 bg-red-500 text-white rounded shadow-lg">
            <p>{global_error}</p>
        </div>
        }</>
    );
};

export default GlobalError;
