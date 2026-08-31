import React from 'react';
import { Users, Store, Calendar, DollarSign, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ExecutiveKPIs() {
    const data = [
        { name: 'Jan', gmv: 4000, revenue: 400, hosts: 24, merchants: 40 },
        { name: 'Feb', gmv: 3000, revenue: 300, hosts: 28, merchants: 45 },
        { name: 'Mar', gmv: 5000, revenue: 500, hosts: 35, merchants: 52 },
        { name: 'Apr', gmv: 4500, revenue: 450, hosts: 42, merchants: 55 },
        { name: 'May', gmv: 6000, revenue: 600, hosts: 50, merchants: 68 },
        { name: 'Jun', gmv: 8500, revenue: 850, hosts: 65, merchants: 85 },
    ];

    const kpis = [
        { title: 'Gross Platform Volume (LKR)', value: 'LKR 42.5M', trend: '+14.5%', isUp: true, icon: DollarSign },
        { title: 'Platform Commission (10%)', value: 'LKR 4.25M', trend: '+14.5%', isUp: true, icon: TrendingUp },
        { title: 'Active Merchants & Hosts', value: '1,248', trend: '+5.2%', isUp: true, icon: Store },
        { title: 'Active Monthly Tourists', value: '8,432', trend: '-1.2%', isUp: false, icon: Users },
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <kpi.icon className="w-6 h-6 text-indigo-600" />
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${kpi.isUp ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'}`}>
                                {kpi.isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                {kpi.trend}
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">{kpi.title}</h3>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{kpi.value}</p>
                    </div>
                ))}
            </div>

            {/* Main Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Gross Platform Volume (GMV/GBV)</h2>
                        <p className="text-sm text-gray-500">Combined revenue from physical products and accommodation bookings.</p>
                    </div>
                    <select className="text-sm border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                        <option>Last 6 Months</option>
                        <option>This Year</option>
                        <option>All Time</option>
                    </select>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorGmv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} tickFormatter={(val) => `$${val}`} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                cursor={{ stroke: '#9ca3af', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Area type="monotone" dataKey="gmv" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorGmv)" activeDot={{ r: 6, strokeWidth: 0 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Split Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-md font-bold text-slate-900 mb-4 flex items-center">
                        <Store className="w-5 h-5 mr-2 text-indigo-500" />
                        Merchant Acquisition Split
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="merchants" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="E-Commerce Merchants" />
                                <Area type="monotone" dataKey="hosts" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} name="Accommodation Hosts" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 text-white relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
                    <div className="relative z-10">
                        <h3 className="text-md font-bold text-white mb-2">Platform Health Score</h3>
                        <p className="text-slate-400 text-sm mb-6">Aggregate score based on dispute rates, refund velocity, and host responsiveness.</p>
                        
                        <div className="flex items-end gap-4 mb-8">
                            <span className="text-6xl font-sansDisplay font-bold text-emerald-400">98</span>
                            <span className="text-xl text-slate-300 mb-2">/ 100</span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-300">Dispute Rate (Target &lt; 2%)</span>
                                    <span className="text-emerald-400 font-medium">0.8%</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-1.5">
                                    <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '8%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-300">Avg. Payout Time (Target &lt; 24h)</span>
                                    <span className="text-indigo-400 font-medium">12h</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-1.5">
                                    <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: '50%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
