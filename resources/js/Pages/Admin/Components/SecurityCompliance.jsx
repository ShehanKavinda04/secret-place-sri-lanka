import React, { useState, useEffect } from 'react';
import { Shield, Fingerprint, Lock, Activity, Bell, FileWarning, Megaphone, Send } from 'lucide-react';
import axios from 'axios';

export default function SecurityCompliance({ initialData = null }) {
    const defaultLogs = [
        { id: 1, action: 'Multiple failed login attempts', entity: 'Admin User (amila@sps.lk)', time: '10 mins ago', severity: 'high' },
        { id: 2, action: 'Payout details modified', entity: 'Vendor (Galle Heritage Villa)', time: '1 hour ago', severity: 'medium' },
        { id: 3, action: 'Bulk listing upload (50+ items)', entity: 'Merchant (Ceylon Spice Co.)', time: '3 hours ago', severity: 'low' },
        { id: 4, action: 'New API Key Generated', entity: 'System Admin (super@sps.lk)', time: '5 hours ago', severity: 'medium' },
    ];

    const [logs, setLogs] = useState(initialData?.logs || defaultLogs);
    const [compliance, setCompliance] = useState(initialData?.compliance || {
        pci: { status: 'COMPLIANT', scan: 'Today at 02:00 AM' },
        privacy: { status: 'VERIFIED', scan: 'All user consent logs intact.' }
    });
    
    const [broadcastSending, setBroadcastSending] = useState(false);
    const [broadcastSuccess, setBroadcastSuccess] = useState(false);

    useEffect(() => {
        if (window.Echo) {
            const channel = window.Echo.channel('admin-dashboard');
            channel.listen('SecurityUpdated', (e) => {
                if (e.securityData) {
                    if (e.securityData.logs) setLogs(e.securityData.logs);
                    if (e.securityData.compliance) setCompliance(e.securityData.compliance);
                }
            });
        }
    }, []);

    const handleBroadcast = async () => {
        setBroadcastSending(true);
        setBroadcastSuccess(false);
        try {
            await axios.post('/admin/security/broadcast');
            setBroadcastSuccess(true);
            setTimeout(() => setBroadcastSuccess(false), 3000);
        } catch (error) {
            console.error('Broadcast failed', error);
        } finally {
            setBroadcastSending(false);
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Security Audit Log */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                            Real-time Security Audit Log
                        </h3>
                        <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">View Full Log</button>
                    </div>
                    
                    <div className="space-y-4">
                        {logs.map((log) => (
                            <div key={log.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                                <div className={`p-2 rounded-full mr-4 mt-0.5 ${
                                    log.severity === 'high' ? 'bg-red-100 text-red-600' :
                                    log.severity === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                                }`}>
                                    {log.severity === 'high' && <FileWarning className="w-4 h-4" />}
                                    {log.severity === 'medium' && <Activity className="w-4 h-4" />}
                                    {log.severity === 'low' && <Fingerprint className="w-4 h-4" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">{log.action}</p>
                                    <p className="text-xs text-gray-500">{log.entity}</p>
                                </div>
                                <span className="text-xs font-medium text-gray-400">{log.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Compliance Status */}
                <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 text-white">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                        <Lock className="w-5 h-5 mr-2 text-indigo-400" />
                        System Compliance
                    </h3>
                    
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-slate-300">PCI-DSS Status</span>
                                <span className={`text-xs px-2 py-1 rounded font-bold border ${compliance.pci.status === 'COMPLIANT' ? 'bg-emerald-900/50 text-emerald-400 border-emerald-800' : 'bg-red-900/50 text-red-400 border-red-800'}`}>
                                    {compliance.pci.status}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500">Last scan: {compliance.pci.scan}</p>
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-slate-300">Data Privacy (SLDPPA)</span>
                                <span className={`text-xs px-2 py-1 rounded font-bold border ${compliance.privacy.status === 'VERIFIED' ? 'bg-emerald-900/50 text-emerald-400 border-emerald-800' : 'bg-amber-900/50 text-amber-400 border-amber-800'}`}>
                                    {compliance.privacy.status}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500">{compliance.privacy.scan}</p>
                        </div>

                        <div className="pt-4 border-t border-slate-800">
                            <button className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                                <Bell className="w-4 h-4" /> Trigger Security Scan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Platform Promotion & Comms */}
            <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-6">
                <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center">
                    <Megaphone className="w-5 h-5 mr-2 text-indigo-600" />
                    Global Platform Broadcast
                </h3>
                <p className="text-sm text-indigo-700 mb-6">Send important updates, promo codes, or system maintenance alerts to all active vendors and hosts.</p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input type="text" placeholder="Message Subject" className="w-full mb-3 px-4 py-2 rounded-lg border border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
                        <textarea rows="3" placeholder="Type your broadcast message here..." className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500 text-sm"></textarea>
                    </div>
                    <div className="flex flex-col gap-3 sm:w-48">
                        <label className="flex items-center text-sm text-indigo-900 font-medium">
                            <input type="checkbox" className="rounded text-indigo-600 mr-2" defaultChecked /> Push Notification
                        </label>
                        <label className="flex items-center text-sm text-indigo-900 font-medium">
                            <input type="checkbox" className="rounded text-indigo-600 mr-2" defaultChecked /> Email Blast
                        </label>
                        <label className="flex items-center text-sm text-indigo-900 font-medium">
                            <input type="checkbox" className="rounded text-indigo-600 mr-2" /> SMS Alert
                        </label>
                        <button 
                            onClick={handleBroadcast}
                            disabled={broadcastSending}
                            className={`mt-auto flex items-center justify-center gap-2 py-2 text-white rounded-lg text-sm font-bold transition-colors shadow-sm ${
                                broadcastSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'
                            } disabled:opacity-75`}
                        >
                            {broadcastSuccess ? 'Broadcast Sent!' : broadcastSending ? 'Sending...' : <><Send className="w-4 h-4" /> Send Now</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
