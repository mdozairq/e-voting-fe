import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';


const Timer: React.FC<{ endTime: string }> = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment.tz(moment(), 'Asia/Kolkata'); // Get the current time in Indian time zone
            const end = moment.tz(endTime, 'Asia/Kolkata'); // Parse the provided end time in Indian time zone
            const timeRemaining = end.diff(now);

            if (timeRemaining <= 0) {
                clearInterval(interval);
                setTimeLeft(0);
            } else {
                setTimeLeft(timeRemaining);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [endTime]);

    const formatTime = (milliseconds: number): string => {
        const duration = moment.duration(milliseconds);
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    if (timeLeft === null) {
        return null;
    }

    if (timeLeft <= 0) {
        return <div>Timer expired</div>;
    }

    return <div className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-4">
        <span className="text-blue-500">{timeLeft && formatTime(timeLeft)}</span>
    </div>
};

export default Timer;
