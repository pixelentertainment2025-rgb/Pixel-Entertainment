
import React from 'react';

interface LoadingSpinnerProps {
    text?: string;
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = 'Loading...', className = 'p-10' }) => {
    return (
        <div className={`flex flex-col items-center justify-center text-center ${className}`} aria-live="polite" aria-busy="true">
            <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" stroke="#30B54A" aria-hidden="true">
                <g fill="none" strokeWidth="4" strokeLinecap="round">
                    <circle cx="50" cy="50" r="1">
                        <animate attributeName="r" from="1" to="40" dur="1.5s" begin="0s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="50" cy="50" r="1">
                        <animate attributeName="r" from="1" to="40" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
                    </circle>
                </g>
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300" role="status">{text}</p>
        </div>
    );
};

export default LoadingSpinner;