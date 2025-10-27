import React from 'react';
import { Page } from '../App';
import { HomeIcon } from './icons/HomeIcon';
import { UserIcon } from './icons/UserIcon';
import { TruckIcon } from './icons/TruckIcon';
import { MailIcon } from './icons/MailIcon';
import { CloseIcon } from './icons/CloseIcon';
import { SettingsIcon } from './icons/SettingsIcon';


interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
    currentPage: Page;
    onNavigate: (page: Page) => void;
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

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, currentPage, onNavigate }) => {
    return (
        <aside
            className={`fixed top-0 left-0 z-30 w-64 h-full bg-brand-green shadow-2xl transition-transform duration-300 ease-in-out ${
                isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
            }`}
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto">
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
                    <hr className="border-brand-green my-2" />
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
            </div>
        </aside>
    );
};

export default SideMenu;