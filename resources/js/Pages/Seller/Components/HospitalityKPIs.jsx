import React from 'react';
import { Home, Users, TrendingUp, DollarSign, Leaf, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HospitalityKPIs({ stats }) {
    const kpiData = [
        { title: 'Occupancy Rate', value: '78%', trend: '+5.2%', isUp: true, icon: Home },
        { title: 'Monthly Revenue', value: 'LKR 450,000', trend: '+12.5%', isUp: true, icon: DollarSign },
        { title: 'ADR (Avg Daily Rate)', value: 'LKR 12,500', trend: '-2.1%', isUp: false, icon: TrendingUp },
        { title: 'RevPAR', value: 'LKR 9,750', trend: '+8.4%', isUp: true, icon: TrendingUp },
        { title: 'Today\'s Activity', value: '3 In / 2 Out', trend: 'Busy', isUp: true, icon: Users },
        { title: 'Eco & Guest Score', value: '4.8 / 5.0', trend: 'Superb', isUp: true, icon: Leaf },
    ];

    const chartData = [
        { name: 'Mon', revenue: 12000, occupancy: 60 },
        { name: 'Tue', revenue: 15000, occupancy: 65 },
        { name: 'Wed', revenue: 11000, occupancy: 50 },
        { name: 'Thu', revenue: 18000, occupancy: 70 },
        { name: 'Fri', revenue: 28000, occupancy: 95 },
        { name: 'Sat', revenue: 35000, occupancy: 100 },
        { name: 'Sun', revenue: 25000, occupancy: 85 },
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 font-sansDisplay">Property Performance overview</h2>
                    <p className="text-sm text-gray-500">Track your key hospitality metrics for Ella Eco Cabin.</p>
                </div>
                <select className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 focus:ring-[#1B4D3E] focus:border-[#1B4D3E] shadow-sm">
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>Year to Date</option>
                </select>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {kpiData.map((kpi, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${kpi.icon === Leaf ? 'bg-emerald-100 text-emerald-600' : 'bg-[#1B4D3E]/10 text-[#1B4D3E]'}`}>
                            <kpi.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</h3>
                            <div className="flex items-center mt-2">
                                <span className={`flex items-center text-xs font-semibold ${kpi.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {kpi.isUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                    {kpi.trend}
                                </span>
                                <span className="text-xs text-gray-400 ml-2">vs last period</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 font-sansDisplay">Revenue & Occupancy Trend</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1B4D3E" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#1B4D3E" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `LKR ${val/1000}k`} />
                                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `${val}%`} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#1B4D3E" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                <Area yAxisId="right" type="monotone" dataKey="occupancy" stroke="#D97706" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#1B4D3E]"></span> Revenue</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full border-2 border-dashed border-[#D97706]"></span> Occupancy Rate</div>
                    </div>
                </div>

                <div className="bg-[#1B4D3E] p-6 rounded-2xl shadow-sm text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-bl-full"></div>
                    <h3 className="text-lg font-bold mb-4 font-sansDisplay">Eco-Tourism Rating</h3>
                    <p className="text-emerald-100 text-sm mb-6">Your property meets 92% of the Secret Place sustainability criteria.</p>
                    
                    <div className="flex items-end gap-3 mb-8">
                        <span className="text-5xl font-bold text-[#D97706]">4.8</span>
                        <div className="flex text-[#D97706] mb-1">
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-emerald-50">Energy Efficiency</span>
                                <span className="font-bold">95%</span>
                            </div>
                            <div className="w-full bg-black/20 rounded-full h-1.5"><div className="bg-[#D97706] h-1.5 rounded-full w-[95%]"></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-emerald-50">Waste Management</span>
                                <span className="font-bold">88%</span>
                            </div>
                            <div className="w-full bg-black/20 rounded-full h-1.5"><div className="bg-[#D97706] h-1.5 rounded-full w-[88%]"></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-emerald-50">Local Community Support</span>
                                <span className="font-bold">100%</span>
                            </div>
                            <div className="w-full bg-black/20 rounded-full h-1.5"><div className="bg-[#D97706] h-1.5 rounded-full w-full"></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
