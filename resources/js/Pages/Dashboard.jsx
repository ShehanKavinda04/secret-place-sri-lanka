import React from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head } from '@inertiajs/react';
import StatCard from '@/Components/Dashboard/StatCard';
import { Calendar, ShoppingBag, Heart, Clock } from 'lucide-react';
import ChartCard from '@/Components/Dashboard/ChartCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function Dashboard({ stats = { upcoming_bookings: 0, completed_bookings: 0, wishlist_items: 0, active_orders: 0 } }) {
    const activityData = [
        { name: 'Jan', bookings: 0 },
        { name: 'Feb', bookings: 1 },
        { name: 'Mar', bookings: 0 },
        { name: 'Apr', bookings: 2 },
        { name: 'May', bookings: 0 },
        { name: 'Jun', bookings: 1 },
    ];

    return (
        <CustomerLayout header="Traveler Hub">
            <Head title="Traveler Hub" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatCard 
                    title="Upcoming Trips" 
                    value={stats.upcoming_bookings} 
                    icon={Calendar} 
                    delay={0.1}
                />
                <StatCard 
                    title="Past Adventures" 
                    value={stats.completed_bookings} 
                    icon={Clock} 
                    delay={0.2}
                />
                <StatCard 
                    title="Wishlist Saves" 
                    value={stats.wishlist_items} 
                    icon={Heart} 
                    delay={0.3}
                />
                <StatCard 
                    title="Active Orders" 
                    value={stats.active_orders} 
                    icon={ShoppingBag} 
                    delay={0.4}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ChartCard title="Your Adventure History" subtitle="Bookings over the last 6 months">
                        <AreaChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area type="monotone" dataKey="bookings" stroke="#10b981" fillOpacity={1} fill="url(#colorBookings)" strokeWidth={2} />
                        </AreaChart>
                    </ChartCard>
                </div>
                <div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full">
                        <h3 className="text-lg font-medium text-gray-900 font-sansDisplay mb-4">Recommended for you</h3>
                        <div className="space-y-4">
                            {/* Placeholder for recommendations */}
                            <div className="bg-gray-50 rounded-xl p-4 flex gap-4">
                                <div className="h-16 w-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=200&auto=format&fit=crop" alt="Ella" className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Ella Cloud Forest Trek</h4>
                                    <p className="text-xs text-gray-500 mt-1">Guided eco-tour • 2 days</p>
                                    <p className="text-xs font-semibold text-royalTeal-600 mt-1">From $120</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
