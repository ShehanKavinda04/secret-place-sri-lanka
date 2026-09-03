import React, { useState, useEffect, useContext } from 'react';
import { Shield, Fingerprint, Lock, Activity, Bell, FileWarning, Megaphone, Send } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '@/Layouts/AdminLayout';

export default function SecurityCompliance({ initialData = null }) {
    const { t } = useContext(AppContext) || { t: (k) => k };
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
    
    // Broadcast Form State
    const [broadcastSubject, setBroadcastSubject] = useState('');
    const [broadcastMessage, setBroadcastMessage] = useState('');
    const [usePush, setUsePush] = useState(true);
    const [useEmail, setUseEmail] = useState(true);
    const [useSms, setUseSms] = useState(false);

    const [isLogModalOpen, setIsLogModalOpen] = useState(false);
    const [expandedTraceId, setExpandedTraceId] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanComplete, setScanComplete] = useState(false);

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
        if (!broadcastSubject.trim() || !broadcastMessage.trim()) {
            alert(t('Please enter a subject and message before broadcasting.'));
            return;
        }

        setBroadcastSending(true);
        setBroadcastSuccess(false);
        try {
            await axios.post('/admin/security/broadcast', {
                subject: broadcastSubject,
                message: broadcastMessage,
                channels: {
                    push: usePush,
                    email: useEmail,
                    sms: useSms
                }
            });
            setBroadcastSuccess(true);
            setBroadcastSubject('');
            setBroadcastMessage('');
            setTimeout(() => setBroadcastSuccess(false), 3000);
        } catch (error) {
            console.error('Broadcast failed', error);
        } finally {
            setBroadcastSending(false);
        }
    };

    const handleScan = async () => {
        setIsScanning(true);
        setScanComplete(false);
        try {
            const res = await axios.post('/admin/security/scan');
            // Update local compliance state with new scan time
            setCompliance(prev => ({
                ...prev,
                pci: { ...prev.pci, scan: res.data.timestamp }
            }));
            setScanComplete(true);
            setTimeout(() => setScanComplete(false), 3000);
        } catch (error) {
            console.error('Scan failed', error);
        } finally {
            setIsScanning(false);
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
                            {t('Real-time Security Audit Log')}
                        </h3>
                        <button 
                            onClick={() => setIsLogModalOpen(true)}
                            className="text-sm text-indigo-600 font-medium hover:text-indigo-800"
                        >
                            {t('View Full Log')}
                        </button>
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
                                    <p className="text-sm font-semibold text-gray-900">{t(log.action)}</p>
                                    <p className="text-xs text-gray-500">{log.entity}</p>
                                </div>
                                <span className="text-xs font-medium text-gray-400">{t(log.time)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Compliance Status */}
                <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 text-white">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                        <Lock className="w-5 h-5 mr-2 text-indigo-400" />
                        {t('System Compliance')}
                    </h3>
                    
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-slate-300">{t('PCI-DSS Status')}</span>
                                <span className={`text-xs px-2 py-1 rounded font-bold border ${compliance.pci.status === 'COMPLIANT' ? 'bg-emerald-900/50 text-emerald-400 border-emerald-800' : 'bg-red-900/50 text-red-400 border-red-800'}`}>
                                    {t(compliance.pci.status)}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500">{t('Last scan:')} {t(compliance.pci.scan)}</p>
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-slate-300">{t('Data Privacy (SLDPPA)')}</span>
                                <span className={`text-xs px-2 py-1 rounded font-bold border ${compliance.privacy.status === 'VERIFIED' ? 'bg-emerald-900/50 text-emerald-400 border-emerald-800' : 'bg-amber-900/50 text-amber-400 border-amber-800'}`}>
                                    {t(compliance.privacy.status)}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500">{t(compliance.privacy.scan)}</p>
                        </div>

                        <div className="pt-4 border-t border-slate-800">
                            <button 
                                onClick={handleScan}
                                disabled={isScanning}
                                className={`w-full flex items-center justify-center gap-2 py-2 text-white rounded-lg text-sm font-medium transition-colors ${
                                    scanComplete ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'
                                } disabled:opacity-75`}
                            >
                                <Bell className={`w-4 h-4 ${isScanning ? 'animate-bounce' : ''}`} /> 
                                {scanComplete ? t('Scan Complete') : isScanning ? t('Scanning Network...') : t('Trigger Security Scan')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Platform Promotion & Comms */}
            <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-6">
                <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center">
                    <Megaphone className="w-5 h-5 mr-2 text-indigo-600" />
                    {t('Global Platform Broadcast')}
                </h3>
                <p className="text-sm text-indigo-700 mb-6">{t('Send important updates, promo codes, or system maintenance alerts to all active vendors and hosts.')}</p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input 
                            type="text" 
                            placeholder={t("Message Subject")}
                            value={broadcastSubject}
                            onChange={(e) => setBroadcastSubject(e.target.value)}
                            className="w-full mb-3 px-4 py-2 bg-white text-slate-900 placeholder-slate-400 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none transition-shadow" 
                        />
                        <textarea 
                            rows="3" 
                            placeholder={t("Type your broadcast message here...")}
                            value={broadcastMessage}
                            onChange={(e) => setBroadcastMessage(e.target.value)}
                            className="w-full px-4 py-2 bg-white text-slate-900 placeholder-slate-400 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none transition-shadow"
                        ></textarea>
                    </div>
                    <div className="flex flex-col gap-3 sm:w-48">
                        <label className="flex items-center text-sm text-indigo-900 font-medium">
                            <input 
                                type="checkbox" 
                                checked={usePush}
                                onChange={(e) => setUsePush(e.target.checked)}
                                className="rounded text-indigo-600 mr-2" 
                            /> {t('Push Notification')}
                        </label>
                        <label className="flex items-center text-sm text-indigo-900 font-medium">
                            <input 
                                type="checkbox" 
                                checked={useEmail}
                                onChange={(e) => setUseEmail(e.target.checked)}
                                className="rounded text-indigo-600 mr-2" 
                            /> {t('Email Blast')}
                        </label>
                        <label className="flex items-center text-sm text-indigo-900 font-medium">
                            <input 
                                type="checkbox" 
                                checked={useSms}
                                onChange={(e) => setUseSms(e.target.checked)}
                                className="rounded text-indigo-600 mr-2" 
                            /> {t('SMS Alert')}
                        </label>
                        <button 
                            onClick={handleBroadcast}
                            disabled={broadcastSending}
                            className={`mt-auto flex items-center justify-center gap-2 py-2 text-white rounded-lg text-sm font-bold transition-colors shadow-sm ${
                                broadcastSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'
                            } disabled:opacity-75`}
                        >
                            {broadcastSuccess ? t('Broadcast Sent!') : broadcastSending ? t('Sending...') : <><Send className="w-4 h-4" /> {t('Send Now')}</>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Full Log Modal */}
            {isLogModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 z-[100] animate-fadeIn">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center">
                                <Shield className="w-6 h-6 mr-2 text-indigo-600" />
                                {t('Comprehensive Security Audit Log')}
                            </h2>
                            <button onClick={() => setIsLogModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-4">
                            {logs.map((log) => (
                                <div key={log.id} className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                                    <div className="flex items-start p-3">
                                        <div className={`p-2 rounded-full mr-4 mt-0.5 ${
                                            log.severity === 'high' ? 'bg-red-100 text-red-600' :
                                            log.severity === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                                        }`}>
                                            {log.severity === 'high' && <FileWarning className="w-5 h-5" />}
                                            {log.severity === 'medium' && <Activity className="w-5 h-5" />}
                                            {log.severity === 'low' && <Fingerprint className="w-5 h-5" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-md font-bold text-gray-900">{t(log.action)}</p>
                                            <p className="text-sm text-gray-600">{t('Entity:')} {log.entity}</p>
                                            <p className="text-xs text-gray-500 mt-1">IP: 192.168.1.{Math.floor(Math.random() * 255)} | User-Agent: Mozilla/5.0</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-medium text-gray-500">{t(log.time)}</span>
                                            <span 
                                                onClick={() => setExpandedTraceId(expandedTraceId === log.id ? null : log.id)}
                                                className="text-xs text-indigo-500 font-semibold mt-2 cursor-pointer hover:underline"
                                            >
                                                {expandedTraceId === log.id ? t('Hide Trace') : t('View Trace')}
                                            </span>
                                        </div>
                                    </div>
                                    {expandedTraceId === log.id && (
                                        <div className="px-4 pb-4 pt-2 bg-gray-100 border-t border-gray-200 text-xs font-mono text-gray-700">
                                            <div><span className="text-indigo-600">Event ID:</span> SEC-{log.id}-99823</div>
                                            <div><span className="text-indigo-600">Timestamp:</span> {new Date().toISOString()}</div>
                                            <div><span className="text-indigo-600">Raw Payload:</span></div>
                                            <pre className="mt-1 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{JSON.stringify({
    request_uri: "/api/v1/auth/login",
    method: "POST",
    headers: {
        "x-forwarded-for": "192.168.1.45",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    },
    flags: ["GEO_MISMATCH", "RATE_LIMIT_WARNING"]
}, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="text-center py-4 text-gray-500 text-sm">
                                {t('End of recent logs. Older logs are archived to cold storage.')}
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-100 flex justify-end">
                            <button onClick={() => setIsLogModalOpen(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">{t('Close')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
