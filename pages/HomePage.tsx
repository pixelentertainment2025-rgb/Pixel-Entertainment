import React, { useEffect, useState, useRef } from 'react';
import { getPackages, buyPackage, completeTransaction } from '../services/mockApi';
import { ProductType, NetworkProvider, Package } from '../types';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import Carousel from '../components/Carousel';
import { offers } from '../data/offers';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';
import { DataIcon } from '../components/icons/DataIcon';
import { PhoneIcon } from '../components/icons/PhoneIcon';
import { MessageIcon } from '../components/icons/MessageIcon';

const productTypes = [
    { type: ProductType.Data, label: 'Data', icon: <DataIcon className="w-6 h-6" /> },
    { type: ProductType.Minutes, label: 'Minutes', icon: <PhoneIcon className="w-6 h-6" /> },
    { type: ProductType.SMS, label: 'SMS', icon: <MessageIcon className="w-6 h-6" /> }
];

const HomePage: React.FC = () => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [packagesLoading, setPackagesLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductType>(ProductType.Data);
    const [packages, setPackages] = useState<Package[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
    const [receivingNumber, setReceivingNumber] = useState('');
    const [payingNumber, setPayingNumber] = useState('');
    const [buying, setBuying] = useState(false);
    const [purchaseResult, setPurchaseResult] = useState<{ success: boolean; message: string } | null>(null);

    const packageSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchPackages = async () => {
             if (initialLoading) {
                // This is the first load
             } else {
                setPackagesLoading(true);
             }
            setSelectedPackage(null);

            try {
                const packagesData = await getPackages(selectedProduct, NetworkProvider.Safaricom);
                setPackages(packagesData);
            } catch (error) {
                console.error("Failed to fetch packages", error);
            } finally {
                if(initialLoading) setInitialLoading(false);
                setPackagesLoading(false);
            }
        };

        fetchPackages();
    }, [selectedProduct]);

    const handleScrollToPackages = () => {
        packageSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    
    const handleBuy = async () => {
        if (!selectedPackage || !receivingNumber || !payingNumber) return;
        setBuying(true);
        setPurchaseResult(null);
        
        const result = await buyPackage(selectedPackage.id, receivingNumber, payingNumber);
        
        setBuying(false);
        setPurchaseResult({ success: result.success, message: result.message });
        
        if (result.success && result.transactionId) {
            setSelectedPackage(null);
            setReceivingNumber('');
            setPayingNumber('');

            // Hide the inline message after a few seconds
            setTimeout(() => setPurchaseResult(null), 5000);

            // Simulate backend processing and sending a push notification
            setTimeout(async () => {
                const completedTx = await completeTransaction(result.transactionId!);
                if (completedTx && 'serviceWorker' in navigator && Notification.permission === 'granted') {
                    try {
                        const registration = await navigator.serviceWorker.ready;
                        registration.showNotification('Purchase Completed!', {
                            body: `Your ${completedTx.description} is now active.`,
                            icon: '/icon.svg',
                            badge: '/icon.svg',
                        });
                    } catch (e) {
                        console.error('Error showing notification:', e);
                    }
                }
            }, 5000); // 5-second delay
        }
    };

    if (initialLoading) {
        return <LoadingSpinner text="Loading..." />;
    }

    return (
        <div className="space-y-6">
             {purchaseResult && (
                <Alert
                    success={purchaseResult.success}
                    message={purchaseResult.message}
                    onClose={() => setPurchaseResult(null)}
                />
            )}
            <Carousel items={offers} onBuyNowClick={handleScrollToPackages} />
            
            <Card>
                <h3 className="text-lg font-semibold mb-3">Select a Product</h3>
                <div className="grid grid-cols-3 gap-2">
                    {productTypes.map(({ type, label, icon }) => (
                        <button
                            key={type}
                            onClick={() => setSelectedProduct(type)}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${selectedProduct === type ? 'border-brand-green bg-brand-green-light dark:bg-brand-green/20 dark:border-brand-green' : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/50'}`}
                        >
                            {icon}
                            <span className="text-sm font-medium mt-1">{label}</span>
                        </button>
                    ))}
                </div>
            </Card>

            <div ref={packageSectionRef} className="space-y-6 scroll-mt-4">
                <Card>
                    <h3 className="text-lg font-semibold mb-3">AdSokoni Packages</h3>
                    {packagesLoading ? (
                        <LoadingSpinner text={`Loading ${selectedProduct}...`} className="py-8" />
                    ) : (
                        <div className="space-y-4">
                            {packages.map(pkg => (
                                <div 
                                    key={pkg.id} 
                                    className={`border rounded-lg transition-all duration-300 ${selectedPackage?.id === pkg.id ? 'border-green-500 shadow-lg' : 'border-gray-200 dark:border-gray-700'}`}
                                >
                                    <button
                                        onClick={() => setSelectedPackage(selectedPackage?.id === pkg.id ? null : pkg)}
                                        className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-t-lg"
                                        aria-expanded={selectedPackage?.id === pkg.id}
                                        aria-controls={`package-details-${pkg.id}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-bold dark:text-gray-100">{pkg.description}</p>
                                                <p className="text-lg text-brand-green font-semibold mt-1">KSh {pkg.price}</p>
                                            </div>
                                            <svg 
                                              className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform ${selectedPackage?.id === pkg.id ? 'rotate-180' : 'rotate-0'}`} 
                                              xmlns="http://www.w3.org/2000/svg" 
                                              fill="none" 
                                              viewBox="0 0 24 24" 
                                              stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>
                                    
                                    {selectedPackage?.id === pkg.id && (
                                        <div id={`package-details-${pkg.id}`} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
                                            <div className="space-y-4">
                                                <Input
                                                    label="Receiving Number"
                                                    id="receiving-number"
                                                    type="tel"
                                                    placeholder="e.g. 0712345678"
                                                    value={receivingNumber}
                                                    onChange={(e) => setReceivingNumber(e.target.value)}
                                                />
                                                <Input
                                                    label="Paying Number (M-Pesa)"
                                                    id="paying-number"
                                                    type="tel"
                                                    placeholder="e.g. 0712345678"
                                                    value={payingNumber}
                                                    onChange={(e) => setPayingNumber(e.target.value)}
                                                />
                                            </div>
                                            <Button 
                                              className="mt-6" 
                                              onClick={handleBuy} 
                                              isLoading={buying} 
                                              disabled={!receivingNumber || !payingNumber || receivingNumber.length < 10 || payingNumber.length < 10}
                                            >
                                                Buy for KSh {selectedPackage.price}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {packages.length === 0 && (
                               <p className="text-center text-gray-500 dark:text-gray-400 py-4">No packages available.</p>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default HomePage;