import React, { useEffect, useState } from 'react';
import { getUserAccount, getTransactions, updateUserAccount } from '../services/mockApi';
import { Transaction, UserAccount } from '../types';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import Input from '../components/Input';
import Button from '../components/Button';
import { EditIcon } from '../components/icons/EditIcon';

const AccountPage: React.FC = () => {
    const [user, setUser] = useState<UserAccount | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

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
    
    const handleEdit = () => {
        setIsEditing(true);
        setEditedName(user!.name);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (!editedName.trim() || editedName.trim() === user!.name) {
            setIsEditing(false);
            return;
        }
        setIsSaving(true);
        try {
            const updatedUser = await updateUserAccount({ name: editedName.trim() });
            setUser(updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update user", error);
            // Optionally, show an alert to the user here
        } finally {
            setIsSaving(false);
        }
    };
    
    const getStatusColor = (status: Transaction['status']) => {
        switch (status) {
            case 'Completed': return 'text-green-600 bg-brand-green-light';
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
                {isEditing ? (
                    <div className="space-y-4">
                        <div>
                            <Input
                                label="Full Name"
                                id="user-name"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-2 justify-end pt-2">
                            <Button variant="secondary" onClick={handleCancel} className="w-auto px-4 py-2 text-sm">Cancel</Button>
                            <Button onClick={handleSave} isLoading={isSaving} disabled={!editedName.trim()} className="w-auto px-4 py-2 text-sm">Save</Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold dark:text-white">{user.name}</h2>
                        </div>
                        <button
                            onClick={handleEdit}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                            aria-label="Edit name"
                        >
                            <EditIcon className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </Card>
            
            <Card title="Order Summary">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-brand-green">{completedOrders}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-red-600">{rejectedOrders}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p>
                    </div>
                </div>
            </Card>

            <Card title="Transaction History">
                <ul className="space-y-4">
                    {transactions.map(tx => (
                        <li key={tx.id} className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold dark:text-white">{tx.description}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{tx.date} &middot; {tx.type}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold dark:text-white">KSh {tx.amount}</p>
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