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

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
                    <h3 className="text-lg font-medium text-gray-900 font-sansDisplay mb-4">Pending Approvals</h3>
                    
                    <PendingApprovalsList initialApprovals={pendingApprovals} />
                </div>
            </div>
        </AdminLayout>
    );
}

// Extracted into a local component to manage state and event bindings
function PendingApprovalsList({ initialApprovals }) {
    const isDummy = !initialApprovals || initialApprovals.length === 0;
    
    const [items, setItems] = React.useState(() => {
        return isDummy ? Array(4).fill(0).map((_, i) => ({
            id: `sample-${i}`,
            name: ['Ella Eco Lodge', 'Kandy Spice Tours', 'Galle Fort Stays', 'Yala Safari Jeeps'][i],
            owner: { name: ['Amila Sandaruwan', 'Kasun Perera', 'Nimali Fernando', 'Chaminda Silva'][i] },
            category: ['accommodation', 'tour', 'accommodation', 'transport'][i],
            isDummy: true
        })) : initialApprovals;
    });

    const handleReview = (id, name) => {
        // In a real app, this would route to a review page or fire an API call.
        // For demonstration, we simulate processing the application by updating component state.
        if (confirm(`Begin review process for ${name}?`)) {
            setItems(prevItems => prevItems.filter(item => item.id !== id));
        }
    };

    if (items.length === 0) {
        return <p className="text-sm text-gray-500">No pending business or host approvals.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {items.map(approval => (
                <div key={approval.id} className="relative bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                    {approval.isDummy && (
                        <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-800 text-[9px] uppercase font-bold px-2 py-0.5 rounded-bl-lg z-10 border-b border-l border-emerald-200">
                            Demo
                        </div>
                    )}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            <p className="text-sm font-bold text-gray-900 truncate" title={approval.name}>{approval.name}</p>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">By {approval.owner?.name || 'Unknown'}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-800 uppercase tracking-wider">
                            {approval.category || approval.type}
                        </span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-50">
                        <button 
                            onClick={() => handleReview(approval.id, approval.name)}
                            className="w-full py-1.5 bg-royalMaroon-50 text-royalMaroon-700 text-xs font-bold rounded-lg hover:bg-royalMaroon-100 transition-colors"
                        >
                            Review Application
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
