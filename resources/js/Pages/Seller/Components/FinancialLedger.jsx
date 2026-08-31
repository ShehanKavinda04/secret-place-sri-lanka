import React, { useState } from 'react';
import { Wallet, PieChart as PieChartIcon, ArrowUpRight, ArrowDownRight, CreditCard, Banknote, FileText, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function FinancialLedger() {
    const [activeView, setActiveView] = useState('overview');

    const revenueBreakdown = [
        { name: 'Direct Bookings', value: 250000, color: '#D97706' },
        { name: 'Platform Referrals', value: 200000, color: '#1B4D3E' },
    ];

    const expenses = [
        { id: 1, date: 'Oct 28', category: 'Cleaning', amount: 12000, note: 'Deep clean for eco cabins' },
        { id: 2, date: 'Oct 25', category: 'Utilities', amount: 15500, note: 'Electricity and water bill' },
        { id: 3, date: 'Oct 20', category: 'Maintenance', amount: 8000, note: 'Pool pump repair' },
    ];

    const payouts = [
        { id: 'TRX-9901', date: 'Oct 30', method: 'Direct Bank Transfer', amount: 180000, status: 'Processing' },
        { id: 'TRX-9895', date: 'Oct 15', method: 'LankaQR', amount: 125000, status: 'Cleared' },
        { id: 'TRX-9850', date: 'Sep 30', method: 'Direct Bank Transfer', amount: 140000, status: 'Cleared' },
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 font-sansDisplay">Financial Ledger</h2>
                    <p className="text-sm text-gray-500">Track revenue, platform commissions, and payout schedules.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 shadow-sm">
                        <FileText className="w-4 h-4" /> Export CSV
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#D97706] text-white rounded-lg text-sm font-semibold hover:bg-[#b56305] shadow-sm">
                        <Plus className="w-4 h-4" /> Log Expense
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                            <Wallet className="w-5 h-5" />
                            <h3 className="text-sm font-medium">Gross Revenue (Oct)</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">LKR 450,000</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-emerald-600 mt-4 font-semibold">
                        <ArrowUpRight className="w-4 h-4" /> +12.5% from Sept
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                            <PieChartIcon className="w-5 h-5" />
                            <h3 className="text-sm font-medium">Platform Commission (10%)</h3>
                        </div>
                        <p className="text-3xl font-bold text-rose-600">-LKR 20,000</p>
                        <p className="text-xs text-gray-400 mt-1">Applied only to Platform Referrals</p>
                    </div>
                </div>

                <div className="bg-[#1B4D3E] p-5 rounded-2xl shadow-sm text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                    <div>
                        <h3 className="text-sm font-medium text-emerald-100 mb-2">Net Profit (After Expenses)</h3>
                        <p className="text-3xl font-bold text-white">LKR 394,500</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-emerald-100">Ready for payout</span>
                        <button className="px-3 py-1 bg-white text-[#1B4D3E] text-xs font-bold rounded-lg hover:bg-emerald-50">Request Payout</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Breakdown */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 font-sansDisplay">Revenue Channel Breakdown</h3>
                    <div className="h-64 flex items-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={revenueBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {revenueBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `LKR ${value.toLocaleString()}`} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Expense Logger */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900 font-sansDisplay">Expense Logger</h3>
                        <span className="text-sm font-semibold text-rose-600">Total: LKR 35,500</span>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                        {expenses.map(expense => (
                            <div key={expense.id} className="p-3 border border-gray-100 rounded-xl flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">{expense.category}</p>
                                    <p className="text-xs text-gray-500">{expense.note} • {expense.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-rose-600 text-sm">-LKR {expense.amount.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Payout Tracker */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 font-sansDisplay">Payout History</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Transaction ID</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Method</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {payouts.map(payout => (
                                <tr key={payout.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{payout.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{payout.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            {payout.method === 'LankaQR' ? <Banknote className="w-4 h-4 text-emerald-600" /> : <CreditCard className="w-4 h-4 text-blue-600" />}
                                            {payout.method}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">LKR {payout.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${payout.status === 'Cleared' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
                                            {payout.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
