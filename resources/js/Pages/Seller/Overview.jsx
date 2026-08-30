import React from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head } from '@inertiajs/react';
import StatCard from '@/Components/Dashboard/StatCard';
import { DollarSign, Store, Users, Star } from 'lucide-react';
import ChartCard from '@/Components/Dashboard/ChartCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Overview({ stats }) {
    const revenueData = [
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 2000 },
        { name: 'Apr', revenue: 2780 },
        { name: 'May', revenue: 1890 },
        { name: 'Jun', revenue: 2390 },
    ];

    return (
        <SellerLayout header="Dashboard">
            <Head title="Seller Dashboard" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatCard 
                    title="Total Revenue" 
                    value={`$${stats.total_earnings}`} 
                    icon={DollarSign} 
                    trend={12.5}
                    trendLabel="vs last month"
                />
                <StatCard 
                    title="Active Businesses" 
                    value={stats.active_businesses} 
                    icon={Store} 
                />
                <StatCard 
                    title="Pending Bookings" 
                    value={stats.pending_bookings} 
                    icon={Users} 
                />
                <StatCard 
                    title="Average Rating" 
                    value={stats.rating.toFixed(1)} 
                    icon={Star} 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Revenue Overview" subtitle="Earnings over the last 6 months">
                    <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                        <Tooltip 
                            cursor={{ fill: '#f3f4f6' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="revenue" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartCard>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 font-sansDisplay mb-4">Recent Bookings</h3>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-500">No recent bookings found.</p>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
