import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import StatCard from '@/Components/Dashboard/StatCard';
import { Users, Store, Calendar, DollarSign } from 'lucide-react';
import ChartCard from '@/Components/Dashboard/ChartCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function Overview({ stats, pendingApprovals = [] }) {
    const growthData = [
        { name: 'Jan', users: 400, bookings: 240 },
        { name: 'Feb', users: 300, bookings: 139 },
        { name: 'Mar', users: 200, bookings: 980 },
        { name: 'Apr', users: 278, bookings: 390 },
        { name: 'May', users: 189, bookings: 480 },
        { name: 'Jun', users: 239, bookings: 380 },
    ];

    return (
        <AdminLayout header="Platform Overview">
            <Head title="Admin Dashboard" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatCard 
                    title="Total Users" 
                    value={stats.total_users} 
                    icon={Users} 
                />
                <StatCard 
                    title="Active Businesses" 
                    value={stats.active_businesses} 
                    icon={Store} 
                />
                <StatCard 
                    title="Total Bookings" 
                    value={stats.total_bookings} 
                    icon={Calendar} 
                />
                <StatCard 
                    title="Platform Revenue" 
                    value={`$${stats.total_revenue}`} 
                    icon={DollarSign} 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Platform Growth" subtitle="Users vs Bookings (Last 6 Months)">
                    <LineChart data={growthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Line type="monotone" dataKey="users" stroke="#8A1024" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="bookings" stroke="#D4AF37" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ChartCard>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 font-sansDisplay mb-4">Pending Approvals</h3>
                    <div className="space-y-4">
                        {pendingApprovals && pendingApprovals.length > 0 ? (
                            pendingApprovals.map(approval => (
                                <div key={approval.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{approval.name}</p>
                                        <p className="text-xs text-gray-500">By {approval.owner?.name || 'Unknown'} • {approval.category || approval.type}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 bg-royalGold-600 text-white text-xs font-medium rounded hover:bg-royalGold-700 transition-colors">Review</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No pending business or host approvals.</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
