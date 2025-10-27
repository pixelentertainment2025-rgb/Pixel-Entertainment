import React from 'react';
import { CheckIcon } from './icons/CheckIcon';
import { ExclamationIcon } from './icons/ExclamationIcon';
import { CloseIcon } from './icons/CloseIcon';

interface AlertProps {
    success: boolean;
    message: string;
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ success, message, onClose }) => {
    const successClasses = 'bg-green-100 border-green-400 text-green-700';
    const errorClasses = 'bg-red-100 border-red-400 text-red-700';

    return (
        <div
            className={`border-l-4 p-4 flex justify-between items-center rounded-md shadow-sm ${success ? successClasses : errorClasses}`}
            role="alert"
        >
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    {success ? (
                        <CheckIcon className="h-5 w-5 text-green-600" />
                    ) : (
                        <ExclamationIcon className="h-5 w-5 text-red-600" />
                    )}
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium">{message}</p>
                </div>
            </div>
            <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-black/10 transition-colors"
                aria-label="Dismiss"
            >
                <CloseIcon className="h-5 w-5" />
            </button>
        </div>
    );
};

export default Alert;
