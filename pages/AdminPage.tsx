
import React, { useEffect, useState } from 'react';
import { getDailyRevenue } from '../services/mockApi';
import { DailyRevenue } from '../types';
import Card from '../components/Card';
import Speedometer from '../components/Speedometer';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminPage: React.FC = () => {
    const [revenue, setRevenue] = useState<DailyRevenue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const revenueData = await getDailyRevenue();
                setRevenue(revenueData);
            } catch (error) {
                console.error("Failed to fetch admin data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <LoadingSpinner text="Loading admin dashboard..." />;
    }

    const totalRevenue = revenue.reduce((sum, item) => sum + item.revenue, 0);
    const averageRevenue = totalRevenue / revenue.length;
    const latestRevenue = revenue[revenue.length - 1]?.revenue || 0;
    
    const percentage = Math.min(100, Math.round((latestRevenue / 25000) * 100)); // Assuming 25k is a good day target

    return (
        <div className="space-y-6">
            <Card title="Revenue Dashboard">
                 <div className="text-center">
                    <p className="text-gray-600">Today's Revenue</p>
                    <p className="text-4xl font-bold my-2">KSh {latestRevenue.toLocaleString()}</p>
                 </div>
                 <Speedometer value={percentage} />
            </Card>
            <Card title="Weekly Performance">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-sm text-gray-500">Total Revenue (7d)</p>
                        <p className="text-xl font-bold text-brand-green">KSh {totalRevenue.toLocaleString()}</p>
                    </div>
                     <div>
                        <p className="text-sm text-gray-500">Average Daily</p>
                        <p className="text-xl font-bold text-brand-green">KSh {Math.round(averageRevenue).toLocaleString()}</p>
                    </div>
                </div>
            </Card>
            <Card title="Daily Revenue Breakdown">
                <ul className="space-y-2">
                    {revenue.slice().reverse().map(item => (
                        <li key={item.date} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="font-medium text-gray-700">{new Date(item.date).toLocaleString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                            <span className="font-semibold">KSh {item.revenue.toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

export default AdminPage;