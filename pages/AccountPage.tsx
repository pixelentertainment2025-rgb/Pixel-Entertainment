
import React, { useEffect, useState } from 'react';
import { getUserAccount, getTransactions } from '../services/mockApi';
import { Transaction, UserAccount } from '../types';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const AccountPage: React.FC = () => {
    const [user, setUser] = useState<UserAccount | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [userData, transactionsData] = await Promise.all([
                    getUserAccount(),
                    getTransactions()
                ]);
                setUser(userData);
                setTransactions(transactionsData);
            } catch (error) {
                console.error("Failed to fetch account data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    
    const getStatusColor = (status: Transaction['status']) => {
        switch (status) {
            case 'Completed': return 'text-green-600 bg-green-100';
            case 'Pending': return 'text-yellow-600 bg-yellow-100';
            case 'Failed': return 'text-red-600 bg-red-100';
        }
    };


    if (loading) {
        return <LoadingSpinner text="Loading account details..." />;
    }

    if (!user) {
        return <div className="text-center p-10 text-red-500">Failed to load account data.</div>;
    }
    
    const completedOrders = transactions.filter(tx => tx.status === 'Completed').length;
    const pendingOrders = transactions.filter(tx => tx.status === 'Pending').length;
    const rejectedOrders = transactions.filter(tx => tx.status === 'Failed').length;

    return (
        <div className="space-y-6">
            <Card>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.phoneNumber}</p>
            </Card>
            
            <Card title="Order Summary">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
                        <p className="text-sm text-gray-500">Completed</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
                        <p className="text-sm text-gray-500">Pending</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-red-600">{rejectedOrders}</p>
                        <p className="text-sm text-gray-500">Rejected</p>
                    </div>
                </div>
            </Card>

            <Card title="Transaction History">
                <ul className="space-y-4">
                    {transactions.map(tx => (
                        <li key={tx.id} className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold">{tx.description}</p>
                                <p className="text-sm text-gray-500">{tx.date} &middot; {tx.type}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold">KSh {tx.amount}</p>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(tx.status)}`}>
                                    {tx.status}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

export default AccountPage;
