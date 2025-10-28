import React from 'react';
import { Page } from '../App';
import { HomeIcon } from './icons/HomeIcon';
import { UserIcon } from './icons/UserIcon';
import { TruckIcon } from './icons/TruckIcon';
import { MailIcon } from './icons/MailIcon';
import { CloseIcon } from './icons/CloseIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { ShareIcon } from './icons/ShareIcon';
import ThemeToggle from './ThemeToggle';


interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
    currentPage: Page;
    onNavigate: (page: Page) => void;
    onShare: () => void;
}

const NavItem: React.FC<{
    label: Page;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <li>
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className={`flex items-center p-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-brand-green-dark text-white' : 'text-gray-200 hover:bg-brand-green-darker hover:text-white'
            }`}
        >
            {icon}
            <span className="ml-3">{label}</span>
        </a>
    </li>
);

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, currentPage, onNavigate, onShare }) => {
    return (
        <aside
            className={`fixed top-0 left-0 z-30 w-64 h-full bg-brand-green shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
                isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
            }`}
            aria-label="Sidebar"
        >
            <div className="px-3 py-4">
                <div className="flex items-center justify-between mb-6">
                     <h2 className="text-2xl font-bold text-white">AdSokoni</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-white rounded-full hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Close menu"
                    >
                       <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <nav className="px-3 flex-grow overflow-y-auto">
                <ul className="space-y-2">
                    <NavItem
                        label="Home"
                        icon={<HomeIcon className="w-6 h-6" />}
                        isActive={currentPage === 'Home'}
                        onClick={() => onNavigate('Home')}
                    />
                    <NavItem
                        label="Account"
                        icon={<UserIcon className="w-6 h-6" />}
                        isActive={currentPage === 'Account'}
                        onClick={() => onNavigate('Account')}
                    />
                    <NavItem
                        label="Settings"
                        icon={<SettingsIcon className="w-6 h-6" />}
                        isActive={currentPage === 'Settings'}
                        onClick={() => onNavigate('Settings')}
                    />
                     <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onShare();
                            }}
                            className="flex items-center p-3 text-base font-medium rounded-lg text-gray-200 hover:bg-brand-green-darker hover:text-white"
                        >
                            <ShareIcon className="w-6 h-6" />
                            <span className="ml-3">Share App</span>
                        </a>
                    </li>
                    <hr className="border-t-2 border-brand-green-darker my-2" />
                     <NavItem
                        label="Track Order"
                        icon={<TruckIcon className="w-6 h-6" />}
                        isActive={currentPage === 'Track Order'}
                        onClick={() => onNavigate('Track Order')}
                    />
                     <NavItem
                        label="Contact Us"
                        icon={<MailIcon className="w-6 h-6" />}
                        isActive={currentPage === 'Contact Us'}
                        onClick={() => onNavigate('Contact Us')}
                    />
                </ul>
            </nav>

            <div className="p-3 mt-auto border-t border-brand-green-darker">
                <div className="flex items-center justify-between p-1 rounded-lg text-gray-200">
                    <span className="text-base font-medium ml-2">Theme</span>
                    <ThemeToggle 
                        buttonClassName="focus:ring-offset-brand-green" 
                    />
                </div>
            </div>
        </aside>
    );
};

export default SideMenu;