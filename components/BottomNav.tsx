
import React from 'react';
import { HomeIcon } from './icons/HomeIcon';
import { ClockIcon } from './icons/ClockIcon';
import { Page } from '../App';

interface BottomNavProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

const NavItem: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? 'text-brand-green' : 'text-gray-500 dark:text-gray-400 hover:text-brand-green'}`}
    >
        {icon}
        <span className="text-xs">{label}</span>
    </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-t-md w-full border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-around">
                <NavItem
                    label="Home"
                    icon={<HomeIcon className="w-6 h-6" />}
                    isActive={currentPage === 'Home'}
                    onClick={() => onNavigate('Home')}
                />
                <NavItem
                    label="Transactions"
                    icon={<ClockIcon className="w-6 h-6" />}
                    isActive={currentPage === 'Account'}
                    onClick={() => onNavigate('Account')}
                />
            </div>
        </nav>
    );
};

export default BottomNav;