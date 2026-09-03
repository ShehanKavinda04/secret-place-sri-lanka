import React, { useState, useEffect, useContext } from 'react';
import { DollarSign, Percent, ArrowRightLeft, CheckCircle2, DownloadCloud, Landmark } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '@/Layouts/AdminLayout';

export default function FinancialEngine({ initialData = null }) {
    const { t } = useContext(AppContext) || { t: (k) => k };
    const defaultPayouts = [
        { id: 'PO-9921', vendor: 'Natures Grace Eco Lodge', amount: 'LKR 245,000', method: 'Direct Bank (BOC)', status: 'processing', date: '2026-08-31' },
        { id: 'PO-9922', vendor: 'Ceylon Spice Co.', amount: 'LKR 84,500', method: 'LankaQR', status: 'completed', date: '2026-08-30' },
        { id: 'PO-9923', vendor: 'Kandy Brassworks', amount: 'LKR 12,000', method: 'PayHere Wallet', status: 'completed', date: '2026-08-30' },
        { id: 'PO-9924', vendor: 'Galle Heritage Villa', amount: 'LKR 450,000', method: 'Direct Bank (ComBank)', status: 'pending', date: '2026-08-31' },
    ];

    const [rates, setRates] = useState(initialData?.rates || { host: 12, merchant: 8 });
    const [ledger, setLedger] = useState(initialData?.ledger || { grossSales: 0, paymentFees: 0, netProfit: 0, vendorEarnings: 0 });
    const [payouts, setPayouts] = useState(initialData?.payouts || defaultPayouts);
    
    const [isApplying, setIsApplying] = useState(false);
    const [applySuccess, setApplySuccess] = useState(false);

    useEffect(() => {
        if (window.Echo) {
            const channel = window.Echo.channel('admin-dashboard');
            channel.listen('FinanceUpdated', (e) => {
                if (e.financeData) {
                    if (e.financeData.rates) setRates(e.financeData.rates);
                    if (e.financeData.ledger) setLedger(e.financeData.ledger);
                    if (e.financeData.payouts) setPayouts(e.financeData.payouts);
                }
            });
        }
    }, []);

    const formatLKR = (val) => new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(val);

    const handleApplyRates = async () => {
        setIsApplying(true);
        setApplySuccess(false);
        try {
            await axios.post('/admin/finance/rates', { rates });
            setApplySuccess(true);
            setTimeout(() => setApplySuccess(false), 2000);
        } catch (e) {
            console.error('Failed to apply rates', e);
        } finally {
            setIsApplying(false);
        }
    };

    const handleExecutePayout = async (id) => {
        try {
            // Optimistic update
            setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'processing' } : p));
            await axios.post(`/admin/finance/payout/${id}/execute`);
        } catch (e) {
            console.error('Failed to execute payout', e);
            // Revert on error
            setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'pending' } : p));
        }
    };

    const handleExportBatch = () => {
        const headers = ['Ref ID', 'Vendor', 'Method', 'Amount', 'Status', 'Date'];
        const csvRows = [headers.join(',')];
        
        for (const po of payouts) {
            csvRows.push([
                po.id,
                `"${po.vendor}"`,
                `"${po.method}"`,
                `"${po.amount}"`,
                po.status,
                po.date
            ].join(','));
        }
        
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `payout_batch_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleDownloadReceipt = (po) => {
        const receiptContent = `
=========================================
            PAYOUT RECEIPT               
=========================================
Reference ID : ${po.id}
Vendor       : ${po.vendor}
Method       : ${po.method}
Amount       : ${po.amount}
Status       : ${po.status.toUpperCase()}
Date         : ${po.date}
=========================================
This is a system-generated receipt.
        `;
        
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `receipt_${po.id}.txt`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Global Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <Percent className="w-5 h-5 mr-2 text-indigo-500" /> {t('Global Commission Rates')}
                    </h3>
                    <div className="space-y-5">
                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="text-sm font-medium text-gray-700">{t('Accommodation/Host Base Rate')}</label>
                                <span className="text-sm font-bold text-indigo-600">{rates.host}%</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="30" 
                                value={rates.host} 
                                onChange={(e) => setRates({ ...rates, host: parseInt(e.target.value) })}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="text-sm font-medium text-gray-700">{t('Physical Product/Merchant Base Rate')}</label>
                                <span className="text-sm font-bold text-emerald-600">{rates.merchant}%</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="30" 
                                value={rates.merchant} 
                                onChange={(e) => setRates({ ...rates, merchant: parseInt(e.target.value) })}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                            />
                        </div>
                        <button 
                            onClick={handleApplyRates}
                            disabled={isApplying}
                            className={`w-full py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                                applySuccess 
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                                    : 'bg-slate-900 text-white hover:bg-slate-800'
                            }`}
                        >
                            {isApplying ? (
                                <ArrowRightLeft className="w-4 h-4 mr-2 animate-spin" />
                            ) : applySuccess ? (
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                            ) : null}
                            {isApplying ? t('Applying...') : applySuccess ? t('Rates Updated') : t('Apply Changes')}
                        </button>
                    </div>
                </div>

                {/* Ledger Summary */}
                <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 text-white">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                        <Landmark className="w-5 h-5 mr-2 text-indigo-400" /> {t('Platform Ledger (MTD)')}
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-slate-700">
                            <span className="text-slate-400">{t('Gross Sales Volume')}</span>
                            <span className="font-semibold text-white">{formatLKR(ledger.grossSales)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-700">
                            <span className="text-slate-400">{t('Payment Gateway Fees (2.5%)')}</span>
                            <span className="font-semibold text-red-400">- {formatLKR(ledger.paymentFees)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-700">
                            <span className="text-slate-400">{t('Vendor Net Earnings')}</span>
                            <span className="font-semibold text-emerald-400">{formatLKR(ledger.vendorEarnings)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 pt-4">
                            <span className="text-indigo-200 font-bold">{t('Net Platform Profit')}</span>
                            <span className="font-bold text-xl text-indigo-400">{formatLKR(ledger.netProfit)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payout Queue */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{t('Automated Payout Queue')}</h3>
                        <p className="text-sm text-gray-500">{t('Scheduled batch payouts via LankaQR, PayHere, and Bank Transfers.')}</p>
                    </div>
                    <button 
                        onClick={handleExportBatch}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
                    >
                        <DownloadCloud className="w-4 h-4" /> {t('Export Batch')}
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Ref ID')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Vendor')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Method')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Amount')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Status')}</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Action')}</th>
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
                                            <button 
                                                onClick={() => handleExecutePayout(po.id)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                {t('Execute')}
                                            </button>
                                        )}
                                        {po.status === 'completed' && (
                                            <button 
                                                onClick={() => handleDownloadReceipt(po)}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                {t('Receipt')}
                                            </button>
                                        )}
                                        {po.status === 'processing' && (
                                            <span className="text-gray-400">{t('Processing...')}</span>
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
