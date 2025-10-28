import React from 'react';
import Card from '../components/Card';

const InstallPage: React.FC = () => {
    // Basic user agent sniffing to guess the OS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    return (
        <div className="p-4 space-y-6 text-center">
            <div className="flex justify-center items-center">
                <img src="/icon.svg" alt="AdSokoni Logo" className="w-24 h-24 rounded-3xl shadow-lg" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Install AdSokoni</h1>
            <p className="text-gray-600 dark:text-gray-400">
                Get the best deals on data, minutes, and SMS right from your home screen!
            </p>

            {isIOS ? (
                <Card title="How to Install on iOS">
                    <div className="text-left space-y-4 text-gray-800 dark:text-gray-300">
                        <p>1. Tap the <strong>Share</strong> button in Safari.</p>
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v12" />
                            </svg>
                        </div>
                        <p>2. Scroll down and tap on <strong>'Add to Home Screen'</strong>.</p>
                         <div className="text-center">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <p>3. Tap <strong>'Add'</strong> in the top-right corner.</p>
                    </div>
                </Card>
            ) : (
                <Card title="How to Install on Android">
                    <div className="text-left space-y-4 text-gray-800 dark:text-gray-300">
                        <p>1. Tap the <strong>three dots</strong> in the top-right corner of Chrome.</p>
                         <div className="text-center">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </div>
                        <p>2. Tap on <strong>'Install app'</strong> or <strong>'Add to Home screen'</strong>.</p>
                        <p>3. Follow the on-screen prompts.</p>
                    </div>
                </Card>
            )}

             <p className="text-sm text-gray-500 dark:text-gray-400 pt-4">
                Once installed, you can open AdSokoni just like any other app!
            </p>
        </div>
    );
};

export default InstallPage;