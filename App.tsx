import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import TrackOrderPage from './pages/TrackOrderPage';
import ContactUsPage from './pages/ContactUsPage';
import SettingsPage from './pages/SettingsPage';
import Marquee from './components/Marquee';
import SideMenu from './components/SideMenu';

export type Page = 'Home' | 'Account' | 'Track Order' | 'Contact Us' | 'Settings';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('Home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const registerServiceWorker = () => {
            if ('serviceWorker' in navigator) {
                // Construct the absolute URL to the service worker to avoid cross-origin issues
                // in sandboxed environments where relative paths might be resolved incorrectly.
                const swUrl = `${window.location.origin}/service-worker.js`;
                navigator.serviceWorker.register(swUrl)
                    .then(registration => {
                        console.log('Service Worker registered with scope:', registration.scope);
                        if ('Notification' in window) {
                            Notification.requestPermission(status => {
                                console.log('Notification permission status:', status);
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Service Worker registration failed:', error);
                    });
            }
        };

        // Defer service worker registration until after the page has fully loaded.
        // This prevents the "document is in an invalid state" error.
        window.addEventListener('load', registerServiceWorker);
        
        // Cleanup the event listener when the component unmounts.
        return () => {
            window.removeEventListener('load', registerServiceWorker);
        };
    }, []);

    const renderPage = () => {
        switch (currentPage) {
            case 'Home':
                return <HomePage />;
            case 'Account':
                return <AccountPage />;
            case 'Track Order':
                return <TrackOrderPage />;
            case 'Contact Us':
                return <ContactUsPage />;
            case 'Settings':
                return <SettingsPage />;
            default:
                return <HomePage />;
        }
    };
    
    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
        setIsMenuOpen(false);
    }

    return (
        <div className="bg-gray-50 min-h-screen font-sans flex flex-col max-w-md mx-auto shadow-lg relative overflow-x-hidden">
            {/* Overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}
            
            <SideMenu 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
                currentPage={currentPage}
                onNavigate={handleNavigate}
            />

            <div className={`flex flex-col flex-grow w-full transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform translate-x-64' : ''}`}>
                <Header title={currentPage} onMenuClick={handleMenuClick} />
                <main className="flex-grow p-4 pb-32 overflow-y-auto">
                    {renderPage()}
                </main>
                <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto">
                    <Marquee />
                    <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
                </footer>
            </div>
        </div>
    );
};

export default App;