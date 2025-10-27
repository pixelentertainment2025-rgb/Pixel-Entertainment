
import React from 'react';

interface SpeedometerProps {
    value: number; // A value between 0 and 100
}

const Speedometer: React.FC<SpeedometerProps> = ({ value }) => {
    const clampedValue = Math.max(0, Math.min(100, value));
    const angle = -90 + (clampedValue / 100) * 180;
    const color = clampedValue < 40 ? '#ef4444' : clampedValue < 75 ? '#f59e0b' : '#22c55e';

    return (
        <div className="relative w-48 h-24 mx-auto mt-4">
            <svg viewBox="0 0 100 50" className="w-full h-full">
                {/* Background Arc */}
                <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                {/* Value Arc */}
                <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: 125.6,
                        strokeDashoffset: 125.6 - (clampedValue / 100) * 125.6,
                        transition: 'stroke-dashoffset 0.5s ease-in-out',
                    }}
                />
            </svg>
            <div
                className="absolute bottom-0 left-1/2"
                style={{
                    transformOrigin: 'bottom center',
                    transform: `translateX(-50%) rotate(${angle}deg)`,
                    transition: 'transform 0.5s ease-in-out',
                    height: 'calc(50% - 4px)',
                }}
            >
                <div className="w-1 bg-gray-700 h-full rounded-t-full"></div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 w-4 h-4 rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xl font-bold text-gray-800">
                {clampedValue}%
            </div>
        </div>
    );
};

export default Speedometer;
