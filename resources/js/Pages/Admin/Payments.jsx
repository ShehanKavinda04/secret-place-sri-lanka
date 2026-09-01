import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { 
    Search, Download, DollarSign, Wallet, 
    ArrowUpRight, ArrowDownRight, ChevronLeft, 
    ChevronRight, Receipt, X, FileText, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function Payments({ payments, stats, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');
    const [gatewayFilter, setGatewayFilter] = useState(filters?.gateway || 'all');
    const [dateFilter, setDateFilter] = useState(filters?.date || 'all');
    
    // For Sub-Tabs (simulating view switching)
    const [activeTab, setActiveTab] = useState('all'); // all, payouts, refunds, logs
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // Handle search/filter changes with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                searchQuery !== (filters?.search || '') || 
                statusFilter !== (filters?.status || 'all') ||
                gatewayFilter !== (filters?.gateway || 'all') ||
                dateFilter !== (filters?.date || 'all')
            ) {
                router.get(route('admin.payments'), { 
                    search: searchQuery, 
                    status: statusFilter,
                    gateway: gatewayFilter,
                    date: dateFilter
                }, { 
                    preserveState: true, 
                    preserveScroll: true 
                });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, statusFilter, gatewayFilter, dateFilter]);

    const getStatusBadge = (status) => {
        const styles = {
            success: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            failed: 'bg-red-100 text-red-800',
            refunded: 'bg-purple-100 text-purple-800',
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
                {status || 'Unknown'}
            </span>
        );
    };

    const tabs = [
        { id: 'all', label: 'All Transactions' },
        { id: 'payouts', label: 'Merchant Payouts' },
        { id: 'refunds', label: 'Refunds & Chargebacks' },
        { id: 'logs', label: 'Gateway Logs' },
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'LKR',
        }).format(amount || 0);
    };

    // Derived values for the ledger
    const calculateFees = (amount) => {
        const platformFee = parseFloat(amount) * 0.05;
        const netPayout = parseFloat(amount) - platformFee;
        return { platformFee, netPayout };
    };

    return (
        <AdminLayout header="Finance Engine">
            <Head title="Finance Engine & Payouts" />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 font-sansDisplay">Finance Engine & Payouts</h1>
                        <p className="text-sm text-gray-500 mt-1">Track platform revenue, gateway transactions, and process merchant payouts in real time.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-royalMaroon-900 text-white rounded-lg text-sm font-medium hover:bg-royalMaroon-950 flex items-center shadow-sm transition-colors">
                            <Wallet className="w-4 h-4 mr-2" />
                            Process Vendor Payouts
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center shadow-sm transition-colors">
                            <Download className="w-4 h-4 mr-2" />
                            Export Financial Report
                        </button>
                    </div>
                </div>

                {/* Financial KPI Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <DollarSign className="w-16 h-16 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Gross Volume (GMV)</p>
                        <h3 className="text-3xl font-bold text-gray-900">{formatCurrency(stats?.grossVolume)}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ArrowUpRight className="w-16 h-16 text-green-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Platform Net Earnings (5%)</p>
                        <h3 className="text-3xl font-bold text-gray-900 text-green-700">{formatCurrency(stats?.platformEarnings)}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Wallet className="w-16 h-16 text-yellow-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Pending Merchant Payouts</p>
                        <h3 className="text-3xl font-bold text-gray-900">{formatCurrency(stats?.pendingPayouts)}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ArrowDownRight className="w-16 h-16 text-red-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Refunds Issued</p>
                        <h3 className="text-3xl font-bold text-gray-900">{formatCurrency(stats?.totalRefunds)}</h3>
                    </div>
                </div>

                {/* Advanced Filtering Controls */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {/* Navigation Tabs */}
                    <div className="border-b border-gray-200 overflow-x-auto">
                        <nav className="flex -mb-px px-4" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`whitespace-nowrap py-4 px-5 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-royalMaroon-700 text-royalMaroon-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                    
                    {/* Toolbar */}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 bg-gray-50/50">
                        <div className="md:col-span-5 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="Search TXN ID, Booking Ref, or Merchant..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white text-slate-900 placeholder-slate-400 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royalMaroon-500 focus:border-royalMaroon-500 outline-none shadow-sm"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <select 
                                value={gatewayFilter}
                                onChange={(e) => setGatewayFilter(e.target.value)}
                                className="w-full bg-white text-slate-900 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royalMaroon-500 outline-none py-2 px-3 shadow-sm"
                            >
                                <option value="all">All Gateways</option>
                                <option value="payhere">PayHere</option>
                                <option value="stripe">Stripe</option>
                                <option value="paypal">PayPal</option>
                                <option value="direct">Direct Transfer</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full bg-white text-slate-900 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royalMaroon-500 outline-none py-2 px-3 shadow-sm"
                            >
                                <option value="all">All Statuses</option>
                                <option value="success">Success</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                                <option value="refunded">Refunded</option>
                            </select>
                        </div>
                        <div className="md:col-span-3">
                            <select 
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="w-full bg-white text-slate-900 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royalMaroon-500 outline-none py-2 px-3 shadow-sm"
                            >
                                <option value="all">All Time</option>
                                <option value="this_month">This Month</option>
                                <option value="last_quarter">Last Quarter</option>
                            </select>
                        </div>
                    </div>

                    {/* Main Financial Data Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 border-y border-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                        <input type="checkbox" className="rounded border-gray-300 text-royalMaroon-600 focus:ring-royalMaroon-500" />
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Transaction ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payer / Merchant
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Gross Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100/50">
                                        Platform Fee
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-green-50/30">
                                        Net Payout
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ml-4">
                                        Date & Time
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {payments.data.length > 0 ? payments.data.map((payment) => {
                                    const { platformFee, netPayout } = calculateFees(payment.amount);
                                    return (
                                        <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input type="checkbox" className="rounded border-gray-300 text-royalMaroon-600 focus:ring-royalMaroon-500" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-gray-900 font-mono">
                                                    #{payment.transaction_id || `TXN-${payment.id}`}
                                                </div>
                                                <div className="mt-1 flex items-center">
                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-800 uppercase border border-slate-200">
                                                        {payment.gateway || 'Unknown'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 truncate w-48">
                                                    <span className="font-medium text-gray-900">From: </span>{payment.booking?.tourist?.name || 'Customer'}
                                                </div>
                                                <div className="text-sm text-gray-500 truncate w-48 mt-0.5">
                                                    <span className="font-medium text-gray-900">To: </span>{payment.booking?.business?.name || 'Business'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="text-sm font-bold text-gray-900">
                                                    {formatCurrency(payment.amount)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right bg-gray-100/50">
                                                <div className="text-sm text-gray-600">
                                                    {formatCurrency(platformFee)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right bg-green-50/30">
                                                <div className="text-sm font-bold text-green-700">
                                                    {formatCurrency(netPayout)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap pl-6">
                                                <div className="text-sm text-gray-900">
                                                    {new Date(payment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(payment.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(payment.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button 
                                                    onClick={() => setSelectedTransaction(payment)}
                                                    className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md text-xs font-medium transition-colors shadow-sm"
                                                >
                                                    Receipt
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan="9" className="px-6 py-12 text-center">
                                            <Receipt className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                            <p className="text-sm font-medium text-gray-900">No financial records found</p>
                                            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Financial Pagination controls */}
                    {payments.total > 0 && (
                        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{payments.from}</span> to <span className="font-medium">{payments.to}</span> of <span className="font-medium">{payments.total}</span> records
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        {payments.links.map((link, idx) => {
                                            if (link.label.includes('Previous')) {
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => link.url && router.get(link.url, { search: searchQuery, gateway: gatewayFilter, status: statusFilter, date: dateFilter }, { preserveState: true, preserveScroll: true })}
                                                        disabled={!link.url}
                                                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${link.url ? 'text-gray-500 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'}`}
                                                    >
                                                        <span className="sr-only">Previous</span>
                                                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                );
                                            }
                                            if (link.label.includes('Next')) {
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => link.url && router.get(link.url, { search: searchQuery, gateway: gatewayFilter, status: statusFilter, date: dateFilter }, { preserveState: true, preserveScroll: true })}
                                                        disabled={!link.url}
                                                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${link.url ? 'text-gray-500 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'}`}
                                                    >
                                                        <span className="sr-only">Next</span>
                                                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                );
                                            }
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => link.url && router.get(link.url, { search: searchQuery, gateway: gatewayFilter, status: statusFilter, date: dateFilter }, { preserveState: true, preserveScroll: true })}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                        link.active 
                                                            ? 'z-10 bg-royalMaroon-50 border-royalMaroon-500 text-royalMaroon-600' 
                                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        })}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Transaction Detail Drawer / Receipt Modal */}
            <Modal show={selectedTransaction !== null} onClose={() => setSelectedTransaction(null)} maxWidth="2xl">
                {selectedTransaction && (
                    <div className="bg-white rounded-lg shadow-2xl flex flex-col max-h-[90vh]">
                        {/* Receipt Header */}
                        <div className="bg-slate-900 px-6 py-5 flex justify-between items-center shrink-0">
                            <div>
                                <h2 className="text-xl font-bold text-white font-sansDisplay flex items-center">
                                    <Receipt className="w-5 h-5 mr-2" />
                                    Transaction Receipt
                                </h2>
                                <p className="text-slate-400 text-sm mt-1 font-mono">
                                    TXN: {selectedTransaction.transaction_id || selectedTransaction.id}
                                </p>
                            </div>
                            <button onClick={() => setSelectedTransaction(null)} className="text-slate-400 hover:text-white p-2">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        {/* Receipt Body */}
                        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
                            {/* Summary Block */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Gateway Provider</p>
                                    <div className="mt-1 flex items-center">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-white text-slate-800 uppercase border border-slate-200 shadow-sm">
                                            {selectedTransaction.gateway || 'Unknown'}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-500 mb-1">Status</p>
                                    {getStatusBadge(selectedTransaction.status)}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 overflow-hidden">
                                <div className="p-5 border-b border-gray-100">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Financial Breakdown</h4>
                                    
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600">Gross Amount (Paid by Customer)</span>
                                            <span className="font-medium text-gray-900">{formatCurrency(selectedTransaction.amount)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600">Platform Commission (5%)</span>
                                            <span className="font-medium text-red-600">-{formatCurrency(calculateFees(selectedTransaction.amount).platformFee)}</span>
                                        </div>
                                        <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
                                            <span className="font-bold text-gray-900">Net Merchant Payout</span>
                                            <span className="text-lg font-bold text-green-700">{formatCurrency(calculateFees(selectedTransaction.amount).netPayout)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 bg-gray-50 border-b border-gray-100">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Parties Involved</h4>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Payer (Customer)</p>
                                            <p className="text-sm font-medium text-gray-900">{selectedTransaction.booking?.tourist?.name || 'Customer'}</p>
                                            <p className="text-xs text-gray-500 truncate">{selectedTransaction.booking?.tourist?.email || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Payee (Merchant)</p>
                                            <p className="text-sm font-medium text-gray-900">{selectedTransaction.booking?.business?.name || 'Business'}</p>
                                            <p className="text-xs text-gray-500 truncate">{selectedTransaction.booking?.business?.owner?.email || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Gateway Log (Simulated)</h4>
                                    <div className="bg-gray-900 rounded-md p-3 font-mono text-[10px] text-green-400 overflow-x-auto">
                                        <p>[{new Date(selectedTransaction.created_at).toISOString()}] INIT: Requesting charge for {formatCurrency(selectedTransaction.amount)}...</p>
                                        <p className="text-gray-400">[{new Date(selectedTransaction.created_at).toISOString()}] SECURE: 3D Secure verification passed.</p>
                                        <p>[{new Date(selectedTransaction.created_at).toISOString()}] SUCCESS: Charge captured. AuthCode: {Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center shrink-0">
                            <div>
                                {selectedTransaction.status === 'success' && (
                                    <button
                                        onClick={() => alert(`Issuing refund for TXN-${selectedTransaction.id}`)}
                                        className="px-4 py-2 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center"
                                    >
                                        <AlertCircle className="w-4 h-4 mr-2" />
                                        Issue Refund
                                    </button>
                                )}
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => alert('Downloading Invoice PDF...')}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center"
                                >
                                    <FileText className="w-4 h-4 mr-2" />
                                    Download Breakdown
                                </button>
                                <button
                                    onClick={() => setSelectedTransaction(null)}
                                    className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors shadow-sm"
                                >
                                    Close Receipt
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </AdminLayout>
    );
}
