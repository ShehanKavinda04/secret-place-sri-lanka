import React, { useState, useEffect, useMemo } from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head } from '@inertiajs/react';
import { financialService, USD_TO_LKR } from '@/Services/financialService';
import ExpenseModal from './Components/ExpenseModal';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Wallet, ArrowDownRight, ArrowUpRight, Plus, Download, Building, Building2 } from 'lucide-react';

export default function Earnings() {
    const [transactions, setTransactions] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [payouts, setPayouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currency, setCurrency] = useState('LKR');
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [isRequestingPayout, setIsRequestingPayout] = useState(false);

    useEffect(() => {
        const loadFinancials = async () => {
            setIsLoading(true);
            try {
                const data = await financialService.fetchFinancials('host-123');
                setTransactions(data.transactions);
                setExpenses(data.expenses);
                setPayouts(data.payouts);
            } catch (error) {
                console.error("Failed to fetch financials", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadFinancials();

        const unsubscribe = financialService.subscribeToFinancials((data) => {
            setTransactions(data.transactions);
            setExpenses(data.expenses);
            setPayouts(data.payouts);
        });

        return () => unsubscribe();
    }, []);

    // Format currency based on toggle
    const formatCurrency = (amountInLKR) => {
        if (currency === 'USD') {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amountInLKR / USD_TO_LKR);
        }
        return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', minimumFractionDigits: 0 }).format(amountInLKR);
    };

    // Derived Financial KPIs
    const kpis = useMemo(() => {
        const totalGross = transactions.reduce((sum, t) => sum + t.gross_amount, 0);
        const totalPlatformFees = transactions.reduce((sum, t) => sum + t.platform_commission, 0);
        const totalOperatingExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
        
        const totalNetEarnings = transactions.reduce((sum, t) => sum + t.net_amount, 0);
        const netProfit = totalNetEarnings - totalOperatingExpenses;
        
        const totalWithdrawn = payouts.filter(p => p.status !== 'rejected').reduce((sum, p) => sum + p.amount, 0);
        const availableBalance = Math.max(0, totalNetEarnings - totalWithdrawn); // Simplified for prototype

        const profitMargin = totalGross > 0 ? ((netProfit / totalGross) * 100).toFixed(1) : 0;

        return {
            totalGross,
            totalPlatformFees,
            totalOperatingExpenses,
            netProfit,
            availableBalance,
            profitMargin
        };
    }, [transactions, expenses, payouts]);

    // Chart Data Generation
    const chartData = useMemo(() => {
        // Group by day for the last 7 days
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            
            const dayGross = transactions
                .filter(t => t.created_at.startsWith(dateStr))
                .reduce((sum, t) => sum + t.gross_amount, 0);
                
            const dayExpenses = expenses
                .filter(e => e.expense_date.startsWith(dateStr))
                .reduce((sum, e) => sum + e.amount, 0);

            data.push({
                name: d.toLocaleDateString(undefined, { weekday: 'short' }),
                Revenue: currency === 'USD' ? dayGross / USD_TO_LKR : dayGross,
                Expenses: currency === 'USD' ? dayExpenses / USD_TO_LKR : dayExpenses
            });
        }
        return data;
    }, [transactions, expenses, currency]);

    const pieData = useMemo(() => {
        const methods = transactions.reduce((acc, t) => {
            acc[t.payment_method] = (acc[t.payment_method] || 0) + 1;
            return acc;
        }, {});
        
        return [
            { name: 'Card', value: methods['card'] || 0, color: '#1B4D3E' },
            { name: 'LankaQR', value: methods['lanka_qr'] || 0, color: '#D97706' },
            { name: 'Cash', value: methods['cash'] || 0, color: '#64748B' },
        ].filter(d => d.value > 0);
    }, [transactions]);

    const handlePayoutRequest = async () => {
        if (kpis.availableBalance <= 0) return alert("No available balance to withdraw.");
        setIsRequestingPayout(true);
        try {
            await financialService.requestPayout(kpis.availableBalance);
            // Show toast in real app
        } finally {
            setIsRequestingPayout(false);
        }
    };

    return (
        <SellerLayout header="Financials">
            <Head title="Financials & Analytics" />
            
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                
                {/* Header & Currency Toggle */}
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-[#1B4D3E] sm:text-3xl">Financials & Payouts</h2>
                        <p className="mt-1 text-sm text-slate-500">Track revenues, log expenses, and manage your payouts.</p>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4 items-center space-x-4">
                        <div className="flex bg-slate-200 p-1 rounded-lg">
                            <button 
                                onClick={() => setCurrency('LKR')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${currency === 'LKR' ? 'bg-white text-[#1B4D3E] shadow' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                                LKR
                            </button>
                            <button 
                                onClick={() => setCurrency('USD')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${currency === 'USD' ? 'bg-white text-[#1B4D3E] shadow' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                                USD
                            </button>
                        </div>
                        <button onClick={() => setIsExpenseModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                            <Plus className="-ml-1 mr-2 h-4 w-4" />
                            Log Expense
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500">Total Gross Revenue</p>
                            <TrendingUp className="h-5 w-5 text-emerald-500" />
                        </div>
                        <p className="mt-2 text-2xl font-bold text-slate-900">{formatCurrency(kpis.totalGross)}</p>
                        <p className="mt-1 text-xs flex items-center text-emerald-600 font-medium">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> 12% vs last month
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500">Platform Fees Deducted</p>
                            <Building className="h-5 w-5 text-slate-400" />
                        </div>
                        <p className="mt-2 text-2xl font-bold text-slate-900">{formatCurrency(kpis.totalPlatformFees)}</p>
                        <p className="mt-1 text-xs text-slate-500">10% standard rate applied</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 border-l-4 border-l-rose-500">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500">Operating Expenses</p>
                            <TrendingDown className="h-5 w-5 text-rose-500" />
                        </div>
                        <p className="mt-2 text-2xl font-bold text-slate-900">{formatCurrency(kpis.totalOperatingExpenses)}</p>
                        <p className="mt-1 text-xs text-slate-500">{expenses.length} expenses logged</p>
                    </div>

                    <div className="bg-[#1B4D3E] rounded-xl shadow-sm p-5 text-white">
                        <div className="flex items-center justify-between opacity-90">
                            <p className="text-sm font-medium">Available Balance</p>
                            <Wallet className="h-5 w-5" />
                        </div>
                        <p className="mt-2 text-3xl font-bold text-[#D97706]">{formatCurrency(kpis.availableBalance)}</p>
                        <div className="mt-3 flex items-center justify-between">
                            <p className="text-xs opacity-75">Margin: {kpis.profitMargin}%</p>
                            <button 
                                onClick={handlePayoutRequest}
                                disabled={isRequestingPayout || kpis.availableBalance <= 0}
                                className="text-xs bg-white text-[#1B4D3E] px-3 py-1 rounded font-bold hover:bg-slate-100 disabled:opacity-50"
                            >
                                {isRequestingPayout ? 'Processing...' : 'Request Payout'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Analytics & Payout Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue vs. Expenses (7 Days)</h3>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} tickFormatter={(val) => currency === 'USD' ? `$${val}` : `Rs.${val/1000}k`} />
                                    <RechartsTooltip 
                                        formatter={(value) => [formatCurrency(currency === 'USD' ? value * USD_TO_LKR : value), undefined]}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="Revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                    <Area type="monotone" dataKey="Expenses" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Donut & Bank Details */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-sm font-bold text-slate-900 mb-4">Payment Methods</h3>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-center space-x-4 mt-2">
                                {pieData.map(d => (
                                    <div key={d.name} className="flex items-center text-xs text-slate-600">
                                        <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: d.color }}></div>
                                        {d.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center justify-between">
                                Payout Account
                                <button className="text-xs text-[#1B4D3E] font-medium hover:underline">Edit</button>
                            </h3>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Commercial Bank</p>
                                <p className="font-mono text-sm font-bold text-slate-900 tracking-widest">**** **** 5678</p>
                                <p className="text-xs text-slate-600 mt-2">Branch: Ella (045)</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <h4 className="text-xs font-semibold text-slate-500 mb-2">Recent Payouts</h4>
                                {payouts.slice(0, 2).map(p => (
                                    <div key={p.id} className="flex justify-between items-center py-2">
                                        <div>
                                            <p className="text-xs font-medium text-slate-900">{new Date(p.created_at).toLocaleDateString()}</p>
                                            <p className={`text-[10px] font-semibold uppercase ${p.status === 'completed' ? 'text-emerald-600' : 'text-amber-500'}`}>{p.status}</p>
                                        </div>
                                        <p className="text-sm font-bold text-slate-900">{formatCurrency(p.amount)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ledger Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                        <h3 className="text-lg font-bold text-slate-900">Transaction Ledger</h3>
                        <button className="flex items-center text-sm font-medium text-[#1B4D3E] hover:text-[#113127]">
                            <Download className="w-4 h-4 mr-2" /> Export CSV
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ref / Guest</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Gross</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Fees</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Net Payout</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {isLoading ? (
                                    <tr><td colSpan="6" className="px-6 py-8 text-center text-sm text-slate-500">Loading ledger...</td></tr>
                                ) : transactions.length === 0 ? (
                                    <tr><td colSpan="6" className="px-6 py-8 text-center text-sm text-slate-500">No transactions recorded yet.</td></tr>
                                ) : transactions.map(t => (
                                    <tr key={t.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {new Date(t.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-slate-900">{t.guest_name}</div>
                                            <div className="text-xs text-slate-500">{t.reservation_id} • {t.payment_method}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right">
                                            {formatCurrency(t.gross_amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-500 text-right">
                                            -{formatCurrency(t.platform_commission + t.gateway_fee)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600 text-right">
                                            {formatCurrency(t.net_amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                t.status === 'cleared' ? 'bg-emerald-100 text-emerald-800' : 
                                                t.status === 'withdrawn' ? 'bg-slate-100 text-slate-800' : 'bg-amber-100 text-amber-800'
                                            }`}>
                                                {t.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} />
        </SellerLayout>
    );
}
