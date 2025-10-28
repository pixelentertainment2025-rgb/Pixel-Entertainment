import React, { useState } from 'react';
import { trackOrderById } from '../services/mockApi';
import { Transaction } from '../types';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

const TrackOrderPage: React.FC = () => {
    const [orderId, setOrderId] = useState('');
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searched, setSearched] = useState(false);

    const handleTrackOrder = async () => {
        if (!orderId) return;
        setLoading(true);
        setError(null);
        setTransaction(null);
        setSearched(true);

        try {
            const result = await trackOrderById(orderId);
            if (result) {
                setTransaction(result);
            } else {
                setError(`No transaction found with ID: ${orderId}`);
            }
        } catch (e) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const getStatusColor = (status: Transaction['status']) => {
        switch (status) {
            case 'Completed': return 'text-green-600 bg-green-100';
            case 'Pending': return 'text-yellow-600 bg-yellow-100';
            case 'Failed': return 'text-red-600 bg-red-100';
        }
    };

    return (
        <div className="space-y-6">
            <Card title="Track Your Order">
                <p className="text-gray-600 dark:text-gray-400 mb-4">Enter your transaction ID below to check the status of your purchase.</p>
                <div className="space-y-4">
                    <Input
                        label="Transaction ID"
                        id="order-id"
                        placeholder="e.g., t1, t2"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                    />
                    <Button onClick={handleTrackOrder} isLoading={loading} disabled={!orderId}>
                        Track Order
                    </Button>
                </div>
            </Card>

            {loading && <LoadingSpinner text="Searching for your order..." />}
            
            {!loading && searched && (
                 <Card title="Order Status">
                    {error && <p className="text-center text-red-500">{error}</p>}
                    {transaction && (
                         <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 dark:text-gray-400">Status:</span>
                                <span className={`font-bold text-sm px-3 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                                    {transaction.status}
                                </span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-gray-500 dark:text-gray-400">Description:</span>
                                <span className="font-semibold dark:text-white">{transaction.description}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                                <span className="font-semibold dark:text-white">KSh {transaction.amount}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-gray-500 dark:text-gray-400">Date:</span>
                                <span className="font-semibold dark:text-white">{transaction.date}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-gray-500 dark:text-gray-400">Transaction ID:</span>
                                <span className="font-semibold dark:text-white">{transaction.id}</span>
                            </div>
                        </div>
                    )}
                 </Card>
            )}
        </div>
    );
};

export default TrackOrderPage;