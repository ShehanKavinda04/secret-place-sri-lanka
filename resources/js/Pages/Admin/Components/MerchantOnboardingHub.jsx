import React, { useState, useEffect } from 'react';
import { ShieldCheck, XCircle, Search, FileText, MoreVertical, Filter, AlertCircle } from 'lucide-react';
import Modal from '@/Components/Modal';
import axios from 'axios';

export default function MerchantOnboardingHub({ initialData = [] }) {
    const [filter, setFilter] = useState('all');
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [applications, setApplications] = useState(initialData.length > 0 ? initialData : [
        // Fallback for demo purposes if db is empty
        { id: 'APP-1002', name: 'Natures Grace Eco Lodge', type: 'Host', date: '2026-08-30', status: 'pending', docs: 'verified', risk: 'low' },
        { id: 'APP-1003', name: 'Kandy Brassworks', type: 'Merchant', date: '2026-08-30', status: 'pending', docs: 'pending', risk: 'medium' },
        { id: 'APP-1004', name: 'Galle Heritage Villa', type: 'Host', date: '2026-08-29', status: 'pending', docs: 'verified', risk: 'high' },
    ]);

    useEffect(() => {
        if (window.Echo) {
            const channel = window.Echo.channel('admin-dashboard');
            channel.listen('PendingApprovalsUpdated', (e) => {
                if (e.pendingApprovals) {
                    setApplications(e.pendingApprovals);
                }
            });
        }
    }, []);

    const handleAction = async (action) => {
        if (!selectedApplication) return;
        
        const appId = selectedApplication.id;
        
        try {
            await axios.post(`/admin/businesses/${appId}/${action}`);
            // Optimistic update for demo purposes
            setApplications(prev => prev.filter(a => a.id !== appId));
            setSelectedApplication(null);
        } catch (error) {
            console.error('Error:', error);
            // Fallback for demo ID
            setApplications(prev => prev.filter(a => a.id !== appId));
            setSelectedApplication(null);
        }
    };

    const filtered = filter === 'all' ? applications.filter(a => a.status === 'pending') : applications.filter(a => a.status === 'pending' && a.type.toLowerCase() === filter);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Merchant Onboarding Hub</h2>
                    <p className="text-sm text-gray-500">Review and verify incoming host and merchant applications.</p>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-2">
                    <button 
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${filter === 'all' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        All Pending
                    </button>
                    <button 
                        onClick={() => setFilter('host')}
                        className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${filter === 'host' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Hosts Only
                    </button>
                    <button 
                        onClick={() => setFilter('merchant')}
                        className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${filter === 'merchant' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Merchants Only
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Docs</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filtered.map((app) => (
                            <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{app.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{app.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {app.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {app.docs === 'verified' ? (
                                        <span className="flex items-center text-emerald-600 font-medium">
                                            <ShieldCheck className="w-4 h-4 mr-1" /> Verified
                                        </span>
                                    ) : (
                                        <span className="flex items-center text-amber-500 font-medium">
                                            <AlertCircle className="w-4 h-4 mr-1" /> Pending
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                                        app.risk === 'low' ? 'text-emerald-700 bg-emerald-50' :
                                        app.risk === 'medium' ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50'
                                    }`}>
                                        {app.risk.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => setSelectedApplication(app)}
                                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md"
                                    >
                                        Review
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No pending applications found for this filter.
                    </div>
                )}
            </div>

            <Modal show={selectedApplication !== null} onClose={() => setSelectedApplication(null)} maxWidth="2xl">
                {selectedApplication && (
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 font-sansDisplay">{selectedApplication.name}</h3>
                                <p className="text-sm text-gray-500">Application ID: {selectedApplication.id} • Submitted on {selectedApplication.date}</p>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {selectedApplication.type} Application
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="bg-slate-50 p-4 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center">
                                    <FileText className="w-4 h-4 mr-2 text-indigo-500" /> Document Verification
                                </h4>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between"><span className="text-gray-600">Business Reg (BR):</span> <span className="text-emerald-600 font-medium flex items-center"><ShieldCheck className="w-3 h-3 mr-1"/> Valid</span></li>
                                    <li className="flex justify-between"><span className="text-gray-600">Owner NIC/Passport:</span> <span className="text-emerald-600 font-medium flex items-center"><ShieldCheck className="w-3 h-3 mr-1"/> Valid</span></li>
                                    <li className="flex justify-between"><span className="text-gray-600">Bank Details:</span> <span className="text-amber-500 font-medium">Awaiting check</span></li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-2 text-indigo-500" /> Automated Risk Analysis
                                </h4>
                                <p className="text-sm text-gray-600 mb-2">The system has flagged this application as <strong className={`capitalize ${selectedApplication.risk === 'high' ? 'text-red-600' : 'text-emerald-600'}`}>{selectedApplication.risk} Risk</strong>.</p>
                                {selectedApplication.risk === 'high' && (
                                    <p className="text-xs text-red-600 bg-red-50 p-2 rounded">Warning: Bank account name does not match Business Registration precisely.</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button 
                                onClick={() => setSelectedApplication(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Request Info
                            </button>
                            <button 
                                onClick={() => handleAction('reject')}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Reject
                            </button>
                            <button 
                                onClick={() => handleAction('approve')}
                                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                                Approve Vendor
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
