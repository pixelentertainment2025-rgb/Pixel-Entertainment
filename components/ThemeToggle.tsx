import React, { useState } from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

// This function gets the initial theme. It's safer to check for the class on the document
// as the source of truth, falling back to localStorage and system preference.
const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        if (document.documentElement.classList.contains('dark')) return 'dark';
        if (localStorage.getItem('theme')) {
            const theme = localStorage.getItem('theme');
            if (theme === 'dark' || theme === 'light') return theme;
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
}

const ThemeToggle: React.FC<{
    buttonClassName?: string;
}> = ({ buttonClassName }) => {
    const [theme, setTheme] = useState(getInitialTheme());

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-brand-green ${buttonClassName}`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? (
                <SunIcon className="w-6 h-6 text-yellow-400" />
            ) : (
                <MoonIcon className="w-6 h-6 text-gray-500" />
            )}
        </button>
    );
};

export default ThemeToggle;
