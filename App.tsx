import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import TrackOrderPage from './pages/TrackOrderPage';
import ContactUsPage from './pages/ContactUsPage';
import SettingsPage from './pages/SettingsPage';
import SideMenu from './components/SideMenu';
import ShareModal from './components/ShareModal';
import InstallPage from './pages/InstallPage';

export type Page = 'Home' | 'Account' | 'Track Order' | 'Contact Us' | 'Settings';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('Home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    
    // Check if the current URL is the install page
    const isInstallPage = window.location.pathname === '/install';
    const shareUrl = `${window.location.origin}/install`;
    
    const handleShare = async () => {
        setIsMenuOpen(false); // Close menu when share is clicked
        const shareData = {
            title: 'Install AdSokoni App',
            text: 'Check out AdSokoni for great deals on data, minutes, and SMS!',
            url: shareUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('App shared successfully');
            } catch (err) {
                console.error('Share failed:', err);
            }
        } else {
            // Fallback for browsers that do not support the Web Share API
            setIsShareModalOpen(true);
        }
    };

    const renderPage = () => {
        if (isInstallPage) {
            return <InstallPage />;
        }
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
        // If we are on the install page, a regular navigation should reload the app to the homepage
        if (isInstallPage) {
            window.location.href = window.location.origin;
            return;
        }
        setCurrentPage(page);
        setIsMenuOpen(false);
    }

    // Don't render the full app shell for the install page to keep it clean
    if (isInstallPage) {
        return (
             <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans flex flex-col max-w-md mx-auto shadow-lg relative overflow-x-hidden">
                <main className="flex-grow p-4 overflow-y-auto">
                    {renderPage()}
                </main>
            </div>
        )
    }
    
    const headerTitle = currentPage === 'Home' ? 'AdSokoni Deals' : currentPage;

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans flex flex-col max-w-md mx-auto shadow-lg relative overflow-x-hidden">
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
                onShare={handleShare}
            />

            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                url={shareUrl}
            />

            <div className={`flex flex-col flex-grow w-full transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform translate-x-64' : ''}`}>
                <Header title={headerTitle} onMenuClick={handleMenuClick} />
                <main className="flex-grow p-4 overflow-y-auto">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default App;