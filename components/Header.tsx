
import React from 'react';
import { MenuIcon } from './icons/MenuIcon';

interface HeaderProps {
    title: string;
    onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
    return (
        <header className="bg-green-600 shadow-md w-full sticky top-0 z-10">
            <div className="max-w-md mx-auto p-4 flex items-center justify-between relative h-16">
                {/* Left Options Button */}
                <button 
                    onClick={onMenuClick}
                    className="text-white p-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Options"
                >
                    <MenuIcon className="w-6 h-6" />
                </button>

                {/* Centered Title */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h1 className="text-xl font-bold text-white">{title}</h1>
                </div>
                
                {/* Invisible placeholder on the right to balance the left button and keep the title centered */}
                <div className="w-10 h-10" aria-hidden="true"></div>
            </div>
        </header>
    );
};

export default Header;