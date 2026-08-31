import React, { useState } from 'react';
import { DollarSign, Percent, ArrowRightLeft, CheckCircle2, DownloadCloud, Landmark } from 'lucide-react';

export default function FinancialEngine() {
    const [payouts] = useState([
        { id: 'PO-9921', vendor: 'Natures Grace Eco Lodge', amount: 'LKR 245,000', method: 'Direct Bank (BOC)', status: 'processing', date: '2026-08-31' },
        { id: 'PO-9922', vendor: 'Ceylon Spice Co.', amount: 'LKR 84,500', method: 'LankaQR', status: 'completed', date: '2026-08-30' },
        { id: 'PO-9923', vendor: 'Kandy Brassworks', amount: 'LKR 12,000', method: 'PayHere Wallet', status: 'completed', date: '2026-08-30' },
        { id: 'PO-9924', vendor: 'Galle Heritage Villa', amount: 'LKR 450,000', method: 'Direct Bank (ComBank)', status: 'pending', date: '2026-08-31' },
    ]);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Global Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <Percent className="w-5 h-5 mr-2 text-indigo-500" /> Global Commission Rates
                    </h3>
                    <div className="space-y-5">
                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="text-sm font-medium text-gray-700">Accommodation/Host Base Rate</label>
                                <span className="text-sm font-bold text-indigo-600">12%</span>
                            </div>
                            <input type="range" min="0" max="30" defaultValue="12" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="text-sm font-medium text-gray-700">Physical Product/Merchant Base Rate</label>
                                <span className="text-sm font-bold text-emerald-600">8%</span>
                            </div>
                            <input type="range" min="0" max="30" defaultValue="8" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                        </div>
                        <button className="w-full py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                            Apply Changes
                        </button>
                    </div>
                </div>

                {/* Ledger Summary */}
                <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 text-white">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                        <Landmark className="w-5 h-5 mr-2 text-indigo-400" /> Platform Ledger (MTD)
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-slate-700">
                            <span className="text-slate-400">Gross Sales Volume</span>
                            <span className="font-semibold text-white">LKR 42,500,000</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-700">
                            <span className="text-slate-400">Payment Gateway Fees (2.5%)</span>
                            <span className="font-semibold text-red-400">- LKR 1,062,500</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-700">
                            <span className="text-slate-400">Vendor Net Earnings</span>
                            <span className="font-semibold text-emerald-400">LKR 37,187,500</span>
                        </div>
                        <div className="flex justify-between items-center py-2 pt-4">
                            <span className="text-indigo-200 font-bold">Net Platform Profit</span>
                            <span className="font-bold text-xl text-indigo-400">LKR 4,250,000</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payout Queue */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Automated Payout Queue</h3>
                        <p className="text-sm text-gray-500">Scheduled batch payouts via LankaQR, PayHere, and Bank Transfers.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
                        <DownloadCloud className="w-4 h-4" /> Export Batch
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ref ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {payouts.map((po) => (
                                <tr key={po.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{po.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{po.vendor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{po.method}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">{po.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${po.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 
                                              po.status === 'processing' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'}`}
                                        >
                                            {po.status === 'completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                            {po.status === 'processing' && <ArrowRightLeft className="w-3 h-3 mr-1 animate-pulse" />}
                                            {po.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {po.status === 'pending' && (
                                            <button className="text-indigo-600 hover:text-indigo-900">Execute</button>
                                        )}
                                        {po.status === 'completed' && (
                                            <button className="text-gray-400 hover:text-gray-600">Receipt</button>
                                        )}
                                        {po.status === 'processing' && (
                                            <span className="text-gray-400">Processing...</span>
                                        )}
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
