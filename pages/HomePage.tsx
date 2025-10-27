import React, { useEffect, useState, useRef } from 'react';
import { getPackages, buyPackage, completeTransaction } from '../services/mockApi';
import { ProductType, NetworkProvider, Package } from '../types';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import Carousel from '../components/Carousel';
import { offers } from '../data/offers';
import Button from '../components/Button';
import Input from '../components/Input';
import { DataIcon } from '../components/icons/DataIcon';
import { PhoneIcon } from '../components/icons/PhoneIcon';
import { MessageIcon } from '../components/icons/MessageIcon';
import Alert from '../components/Alert';


const productTypes = [
    { type: ProductType.Data, label: 'Data', icon: <DataIcon className="w-6 h-6" /> },
    { type: ProductType.Minutes, label: 'Minutes', icon: <PhoneIcon className="w-6 h-6" /> },
    { type: ProductType.SMS, label: 'SMS', icon: <MessageIcon className="w-6 h-6" /> }
];

const networkProviders = Object.values(NetworkProvider);

const HomePage: React.FC = () => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<ProductType>(ProductType.Data);
    const [selectedProvider, setSelectedProvider] = useState<NetworkProvider>(NetworkProvider.Safaricom);
    const [packages, setPackages] = useState<Package[]>([]);
    const [loadingPackages, setLoadingPackages] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
    const [receivingNumber, setReceivingNumber] = useState('');
    const [payingNumber, setPayingNumber] = useState('');
    const [buying, setBuying] = useState(false);
    const [purchaseResult, setPurchaseResult] = useState<{ success: boolean; message: string } | null>(null);

    const packageSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            setInitialLoading(true);
            try {
                const packagesData = await getPackages(ProductType.Data, NetworkProvider.Safaricom);
                setPackages(packagesData);
            } catch (error) {
                console.error("Failed to fetch home page data", error);
            } finally {
                setInitialLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        // Skip initial fetch since it's handled in the combined initial load
        if (initialLoading) return;

        const fetchPackages = async () => {
            setLoadingPackages(true);
            setSelectedPackage(null); // Deselect package when provider/product changes
            const fetchedPackages = await getPackages(selectedProduct, selectedProvider);
            setPackages(fetchedPackages);
            setLoadingPackages(false);
        };
        fetchPackages();
    }, [selectedProduct, selectedProvider]);

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
                        // FIX: Removed the 'vibrate' property as it was causing a TypeScript error.
                        // The 'vibrate' option is not a standard property in the NotificationOptions type definition used by this project.
                        registration.showNotification('Purchase Completed!', {
                            body: `Your ${completedTx.description} is now active.`,
                            icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzE2YTM0YSI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEycy40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXoiLz48L3N2Zz4=',
                            badge: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzE2YTM0YSI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEycy40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXoiLz48L3N2Zz4=',
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

            <div ref={packageSectionRef} className="space-y-6 scroll-mt-4">
                 <Card>
                    <h3 className="text-lg font-semibold mb-3">1. Select Product</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {productTypes.map(({ type, label, icon }) => (
                            <button
                                key={type}
                                onClick={() => setSelectedProduct(type)}
                                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${selectedProduct === type ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                            >
                                {icon}
                                <span className="text-sm font-medium mt-1">{label}</span>
                            </button>
                        ))}
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold mb-3">2. Select Provider</h3>
                    <div className="flex space-x-2">
                        {networkProviders.map(provider => (
                            <button
                                key={provider}
                                onClick={() => setSelectedProvider(provider)}
                                className={`w-full p-2 rounded-md font-semibold transition-colors ${selectedProvider === provider ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                {provider}
                            </button>
                        ))}
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold mb-3">3. Choose Package &amp; Buy</h3>
                    {loadingPackages ? (
                        <LoadingSpinner text="Loading packages..." className="p-4" />
                    ) : (
                        <div className="space-y-4">
                            {packages.map(pkg => (
                                <div 
                                    key={pkg.id} 
                                    className={`border rounded-lg transition-all duration-300 ${selectedPackage?.id === pkg.id ? 'border-green-500 shadow-lg' : 'border-gray-200'}`}
                                >
                                    <button
                                        onClick={() => setSelectedPackage(selectedPackage?.id === pkg.id ? null : pkg)}
                                        className="w-full text-left p-4 hover:bg-gray-50 rounded-t-lg"
                                        aria-expanded={selectedPackage?.id === pkg.id}
                                        aria-controls={`package-details-${pkg.id}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-bold">{pkg.description}</p>
                                                <p className="text-lg text-green-700 font-semibold mt-1">KSh {pkg.price}</p>
                                            </div>
                                            <svg 
                                              className={`w-5 h-5 text-gray-500 transform transition-transform ${selectedPackage?.id === pkg.id ? 'rotate-180' : 'rotate-0'}`} 
                                              xmlns="http://www.w3.org/2000/svg" 
                                              fill="none" 
                                              viewBox="0 0 24 24" 
                                              stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>
                                    
                                    {selectedPackage?.id === pkg.id && (
                                        <div id={`package-details-${pkg.id}`} className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
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
                            {packages.length === 0 && !loadingPackages && (
                               <p className="text-center text-gray-500 py-4">No packages available for this selection.</p>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default HomePage;