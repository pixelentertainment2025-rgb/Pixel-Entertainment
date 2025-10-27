import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

const SettingsPage: React.FC = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    useEffect(() => {
        if ('Notification' in window) {
            setNotificationsEnabled(Notification.permission === 'granted');
        }
    }, []);
    
    const handleNotificationToggle = () => {
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notifications.');
            return;
        }

        if (Notification.permission === 'granted') {
            alert('Notifications are already enabled. To disable, please update your browser settings.');
            // Note: Browsers do not provide a JS API to programmatically *revoke* permissions for security reasons.
            // This must be done by the user in the browser's site settings.
        } else if (Notification.permission === 'denied') {
            alert('Notifications are blocked. Please update your browser settings to allow them.');
        } else {
            Notification.requestPermission().then(permission => {
                setNotificationsEnabled(permission === 'granted');
            });
        }
    };
    
    const handleLogout = () => {
        // In a real app, this would clear tokens, redirect, etc.
        alert('You have been logged out.');
    };

    return (
        <div className="space-y-6">
            <Card title="Notification Settings">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive alerts for transaction status.</p>
                    </div>
                    <button
                        onClick={handleNotificationToggle}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                            notificationsEnabled ? 'bg-brand-green' : 'bg-gray-300'
                        }`}
                        aria-checked={notificationsEnabled}
                        role="switch"
                    >
                        <span
                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                                notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>
            </Card>

            <Card title="Account Actions">
                <Button variant="secondary" onClick={handleLogout}>
                    Log Out
                </Button>
            </Card>
        </div>
    );
};

export default SettingsPage;