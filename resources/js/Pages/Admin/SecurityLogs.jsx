import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { 
    Search, Download, ShieldAlert, AlertTriangle, 
    ShieldCheck, Activity, ChevronLeft, ChevronRight,
    MapPin, Globe, Server, User, Key, Terminal, X,
    Eye, Trash2, RefreshCw
} from 'lucide-react';

export default function SecurityLogs({ logs, stats, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [severityFilter, setSeverityFilter] = useState(filters?.severity || 'all');
    const [timeframeFilter, setTimeframeFilter] = useState(filters?.timeframe || '24h');
    const [typeFilter, setTypeFilter] = useState(filters?.type || 'all');
    
    const [selectedLog, setSelectedLog] = useState(null);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [payloadView, setPayloadView] = useState('summary');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [localStats, setLocalStats] = useState(stats);
    const [localLogs, setLocalLogs] = useState(logs.data);
    const [toast, setToast] = useState(null);
    const [isPurging, setIsPurging] = useState(false);
    const [showPurgeModal, setShowPurgeModal] = useState(false);

    useEffect(() => {
        setLocalStats(stats);
    }, [stats]);

    useEffect(() => {
        setLocalLogs(logs.data);
    }, [logs.data]);

    // Handle filters
    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                searchQuery !== (filters?.search || '') || 
                severityFilter !== (filters?.severity || 'all') ||
                timeframeFilter !== (filters?.timeframe || '24h') ||
                typeFilter !== (filters?.type || 'all')
            ) {
                setIsRefreshing(true);
                router.get(route('admin.security-logs'), { 
                    search: searchQuery, 
                    severity: severityFilter,
                    timeframe: timeframeFilter,
                    type: typeFilter
                }, { 
                    preserveState: true, 
                    preserveScroll: true,
                    onFinish: () => setIsRefreshing(false)
                });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, severityFilter, timeframeFilter, typeFilter]);

    // Sync Live Stream timeframe with Auto-Refresh
    useEffect(() => {
        if (timeframeFilter === 'live') {
            setAutoRefresh(true);
        }
    }, [timeframeFilter]);

    // Handle Auto-Refresh
    useEffect(() => {
        let interval;
        if (autoRefresh) {
            interval = setInterval(() => {
                setIsRefreshing(true);
                router.reload({ 
                    only: ['logs', 'stats'], 
                    preserveScroll: true, 
                    preserveState: true,
                    onFinish: () => setIsRefreshing(false)
                });
            }, 10000); // 10s
        }
        return () => clearInterval(interval);
    }, [autoRefresh]);

    // Manual Refresh Handler
    const handleManualRefresh = () => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        router.reload({ 
            only: ['logs', 'stats'], 
            preserveScroll: true, 
            preserveState: true,
            onFinish: () => setIsRefreshing(false)
        });
    };

    // Real-time synchronization
    useEffect(() => {
        if (window.Echo) {
            window.Echo.channel('admin-dashboard')
                .listen('SecurityUpdated', (e) => {
                    console.log('Real-time SecurityUpdated event received', e);
                    router.reload({ only: ['logs', 'stats'], preserveScroll: true, preserveState: true });
                });
        }
        return () => {
            if (window.Echo) {
                window.Echo.leaveChannel('admin-dashboard');
            }
        };
    }, []);

    useEffect(() => {
        if (selectedLog) {
            setPayloadView('summary');
        }
    }, [selectedLog]);

    const exportToCSV = (data, filename = 'export.csv') => {
        // Convert data array of objects to CSV string
        const headers = Object.keys(data[0]);
        const csvRows = [
            headers.join(','),
            ...data.map(row => headers.map(field => `"${String(row[field] || '').replace(/"/g, '""')}"`).join(','))
        ];
        const csvString = csvRows.join('\n');
        
        // Add UTF-8 BOM so Excel opens special characters correctly
        const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // <-- this forces the .csv name
        
        // CRITICAL FIX: Stop event propagation so Inertia.js doesn't intercept the click
        link.addEventListener('click', (e) => e.stopPropagation());
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Delay revocation to ensure the browser registers the filename before the blob dies
        setTimeout(() => URL.revokeObjectURL(url), 100);
    };

    const handleExportCSV = async () => {
        const queryParams = new URLSearchParams();
        if (searchQuery) queryParams.append('search', searchQuery);
        if (severityFilter !== 'all') queryParams.append('severity', severityFilter);
        if (timeframeFilter !== 'all') queryParams.append('timeframe', timeframeFilter);
        if (typeFilter !== 'all') queryParams.append('type', typeFilter);
        
        try {
            const url = route('admin.security-logs.export') + '?' + queryParams.toString();
            // Fetch JSON data
            const response = await axios.get(url);
            
            if (response.data && response.data.length > 0) {
                const filename = `security-logs-export-${new Date().toISOString().slice(0,10)}.csv`;
                exportToCSV(response.data, filename);
            } else {
                alert("No data available to export.");
            }
        } catch (error) {
            console.error("Failed to download CSV export:", error);
            alert("Failed to export logs. Please try again.");
        }
    };


    const handlePurgeLogs = () => {
        setShowPurgeModal(true);
    };

    const executePurge = async () => {
        if (isPurging) return;
        setIsPurging(true);
        setShowPurgeModal(false);
        try {
            const response = await axios.delete(route('admin.security-logs.purge.api'));
            if (response.data.success) {
                setToast({ message: 'Old logs successfully purged', type: 'success' });
                
                // Update stats dynamically
                setLocalStats(prev => ({
                    ...prev,
                    totalEvents: Math.max(0, (prev?.totalEvents || 0) - (response.data.purged_count || 0)) + 1 // +1 for the new log
                }));

                // Create new audit log entry
                const newLogEntry = {
                    id: `SEC-${Math.floor(Math.random() * 9000) + 1000}`,
                    timestamp: new Date().toISOString(),
                    user: {
                        name: "Admin",
                        email: "admin@secretplace.lk",
                        role: "Super Admin",
                        avatar: "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
                    },
                    event: "LOG_PURGE_EXECUTED",
                    severity: "info",
                    ip_address: "127.0.0.1",
                    location: "Internal System",
                    user_agent: navigator.userAgent,
                    metadata: {
                        action: "Manual Purge",
                        retention_threshold: "30 days",
                        records_removed: response.data.purged_count || 0
                    }
                };

                // Add it to the top of the table dynamically
                setLocalLogs(prevLogs => [newLogEntry, ...prevLogs].slice(0, 15));

                setTimeout(() => setToast(null), 5000);
            }
        } catch (error) {
            setToast({ message: 'Failed to purge logs.', type: 'error' });
            setTimeout(() => setToast(null), 5000);
        } finally {
            setIsPurging(false);
        }
    };

    const getSeverityBadge = (severity) => {
        const styles = {
            info: 'bg-blue-100 text-blue-800 border-blue-200',
            warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            error: 'bg-orange-100 text-orange-800 border-orange-200',
            critical: 'bg-red-100 text-red-800 border-red-200',
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${styles[severity] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                {severity}
            </span>
        );
    };

    const tabs = [
        { id: 'all', label: 'All Events' },
        { id: 'auth', label: 'Authentication Logs' },
        { id: 'user', label: 'User Actions' },
        { id: 'system', label: 'API & System' },
        { id: 'critical', label: 'Critical Alerts' },
    ];

    const renderActivitySummary = (log) => {
        const { event, metadata } = log;
        if (!metadata || Object.keys(metadata).length === 0) {
            return (
                <div className="text-sm text-slate-500 italic p-4 text-center bg-slate-800/30 rounded-lg border border-slate-700/50">
                    No additional metadata provided for this event.
                </div>
            );
        }

        if (event === 'USER_ROLE_UPDATED') {
            return (
                <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
                        <span className="text-sm font-medium text-slate-400">Action Type</span>
                        <span className="text-sm font-bold text-white bg-slate-700 px-2 py-1 rounded">User Role Updated</span>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center py-5 bg-slate-900/50 rounded-lg border border-slate-700/50 shadow-inner">
                        <span className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-medium">Role Transition</span>
                        <div className="flex items-center space-x-4">
                            <span className="px-4 py-1.5 bg-slate-700 text-slate-300 rounded-full text-sm font-medium border border-slate-600 shadow-sm">
                                {metadata.old_role || 'None'}
                            </span>
                            <ChevronRight className="w-5 h-5 text-slate-500" />
                            <span className="px-4 py-1.5 bg-blue-600/20 text-blue-400 rounded-full text-sm font-bold border border-blue-500/30 shadow-sm">
                                {metadata.new_role}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="bg-slate-900/50 p-3 rounded-lg text-center border border-slate-700/50">
                            <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-medium">Target User ID</span>
                            <span className="text-sm font-mono text-blue-400">#{metadata.target_user_id}</span>
                        </div>
                        <div className="bg-slate-900/50 p-3 rounded-lg text-center border border-slate-700/50">
                            <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-medium">Approved By</span>
                            <span className="text-sm font-medium text-slate-300">{metadata.approved_by || 'System'}</span>
                        </div>
                    </div>
                </div>
            );
        }

        // Generic fallback for unknown events
        return (
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
                <div className="mb-3 pb-2 border-b border-slate-700/50">
                    <span className="text-sm font-bold text-white">Event Details</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    {Object.entries(metadata).map(([key, value]) => (
                        <div key={key} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 border-b border-slate-700/30 last:border-0">
                            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 sm:mb-0">
                                {key.replace(/_/g, ' ')}
                            </span>
                            <span className="text-sm font-mono text-slate-200 bg-slate-900/50 px-2 py-0.5 rounded border border-slate-700/50">
                                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <AdminLayout header="Security Logs & Audit Trail">
            <Head title="Security Logs - Enterprise Admin" />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 font-sansDisplay flex items-center">
                            <ShieldAlert className="w-7 h-7 mr-3 text-royalMaroon-700" />
                            Security Logs & Audit Trail
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-10">Monitor system events, authentication attempts, permission changes, and suspicious activities in real-time.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button 
                            onClick={handleExportCSV}
                            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center shadow-sm transition-all hover:shadow cursor-pointer active:scale-95"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export as CSV
                        </button>
                        <button 
                            onClick={handlePurgeLogs}
                            disabled={isPurging}
                            className={`px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 flex items-center shadow-sm transition-all hover:shadow cursor-pointer active:scale-95 ${isPurging ? 'opacity-50 cursor-wait' : ''}`}
                        >
                            <Trash2 className={`w-4 h-4 mr-2 ${isPurging ? 'animate-pulse' : ''}`} />
                            {isPurging ? 'Purging...' : 'Purge Old Logs'}
                        </button>
                    </div>
                </div>

                {/* KPI Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div 
                        onClick={() => { setTypeFilter('all'); setSeverityFilter('all'); }}
                        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden cursor-pointer hover:shadow-md hover:border-blue-300 transition-all group"
                        title="Click to view all events"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-300">
                            <Activity className="w-16 h-16 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-blue-600 transition-colors">Total Security Events</p>
                        <h3 className="text-3xl font-bold text-gray-900">{localStats?.totalEvents?.toLocaleString()}</h3>
                        <p className="text-xs text-gray-400 mt-2">Last 24 Hours</p>
                    </div>
                    <div 
                        onClick={() => { setTypeFilter('auth'); setSeverityFilter('error'); }}
                        className="bg-red-50 p-6 rounded-xl border border-red-200 shadow-sm relative overflow-hidden cursor-pointer hover:shadow-md hover:bg-red-100 hover:border-red-400 transition-all group"
                        title="Click to view failed logins"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-300">
                            <AlertTriangle className="w-16 h-16 text-red-600" />
                        </div>
                        <p className="text-sm font-medium text-red-800 mb-1 group-hover:text-red-900 transition-colors">Failed Login Attempts</p>
                        <div className="flex items-center">
                            <h3 className="text-3xl font-bold text-red-600">{localStats?.failedLogins?.toLocaleString()}</h3>
                            <span className="ml-2 flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        </div>
                        <p className="text-xs text-red-700 mt-2 opacity-80">Requires monitoring</p>
                    </div>
                    <div 
                        onClick={() => { setTypeFilter('auth'); setSeverityFilter('info'); }}
                        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden cursor-pointer hover:shadow-md hover:border-green-300 transition-all group"
                        title="Click to view successful admin sessions"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-300">
                            <ShieldCheck className="w-16 h-16 text-green-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-green-600 transition-colors">Active Admin Sessions</p>
                        <h3 className="text-3xl font-bold text-gray-900">{localStats?.activeAdmins}</h3>
                        <p className="text-xs text-green-600 mt-2 font-medium">Verified safe</p>
                    </div>
                    <div 
                        onClick={() => { setSeverityFilter('critical'); }}
                        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden cursor-pointer hover:shadow-md hover:border-orange-300 transition-all group"
                        title="Click to view critical flagged IPs"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-300">
                            <Globe className="w-16 h-16 text-orange-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-orange-600 transition-colors">Suspicious / Flagged IPs</p>
                        <h3 className="text-3xl font-bold text-gray-900">{localStats?.flaggedIps}</h3>
                        <p className="text-xs text-orange-600 mt-2 font-medium">Automatically blocked</p>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 overflow-x-auto">
                        <nav className="flex -mb-px px-4" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setTypeFilter(tab.id)}
                                    className={`whitespace-nowrap py-4 px-5 border-b-2 font-medium text-sm transition-colors ${
                                        typeFilter === tab.id
                                            ? 'border-royalMaroon-700 text-royalMaroon-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                    
                    <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 bg-gray-50/50">
                        <div className="md:col-span-5 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="Search by Email, IP Address, or Event Name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white text-slate-900 placeholder-slate-400 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royalMaroon-500 outline-none shadow-sm"
                            />
                        </div>
                        <div className="md:col-span-3">
                            <select 
                                value={severityFilter}
                                onChange={(e) => setSeverityFilter(e.target.value)}
                                className="w-full bg-white text-slate-900 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royalMaroon-500 outline-none py-2 px-3 shadow-sm"
                            >
                                <option value="all">All Severities</option>
                                <option value="info">Info</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                        <div className="md:col-span-4">
                            <select 
                                value={timeframeFilter}
                                onChange={(e) => setTimeframeFilter(e.target.value)}
                                className="w-full bg-white text-slate-900 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royalMaroon-500 outline-none py-2 px-3 shadow-sm"
                            >
                                <option value="live">Live Stream (Auto-updating)</option>
                                <option value="1h">Last 1 Hour</option>
                                <option value="24h">Last 24 Hours</option>
                                <option value="7d">Last 7 Days</option>
                                <option value="custom">Custom Date Range...</option>
                            </select>
                        </div>
                    </div>

                    {/* Main Audit Log Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 border-y border-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-48">
                                        Timestamp
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Actor
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Event / Action
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Severity
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        IP Address & Loc
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Payload
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {localLogs.length > 0 ? localLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            <div className="text-[13px] font-medium text-gray-900">
                                                {new Date(log.timestamp).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                            </div>
                                            <div className="text-[11px] font-mono text-gray-500">
                                                {new Date(log.timestamp).toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                                                    <img src={log.user.avatar} alt="" className="h-full w-full object-cover" />
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-[13px] font-bold text-gray-900">{log.user.name}</div>
                                                    <div className="text-[11px] font-mono text-gray-500">{log.user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            <div className="text-[12px] font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded inline-flex border border-slate-200">
                                                {log.event}
                                            </div>
                                            <div className="text-[11px] text-gray-500 mt-1 max-w-[200px] truncate" title={log.user_agent}>
                                                {log.user_agent}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            {getSeverityBadge(log.severity)}
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            <div className="flex items-center text-[12px] font-mono text-gray-800 font-medium">
                                                <Server className="w-3 h-3 mr-1.5 text-gray-400" />
                                                {log.ip_address}
                                            </div>
                                            <div className="flex items-center text-[11px] text-gray-500 mt-0.5">
                                                <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                                                {log.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                                            <button 
                                                onClick={() => setSelectedLog(log)}
                                                className="px-2.5 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-xs font-medium transition-colors shadow-sm inline-flex items-center"
                                            >
                                                <Eye className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                                                Inspect
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <ShieldCheck className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                            <p className="text-sm font-medium text-gray-900">No security events found</p>
                                            <p className="text-sm text-gray-500 mt-1">Adjust your filters to see more results.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination & Footer Controls */}
                    {logs.total > 0 && (
                        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex items-center text-sm text-gray-600 space-x-6">
                                <button 
                                    onClick={handleManualRefresh}
                                    disabled={isRefreshing}
                                    className={`flex items-center font-medium transition-colors group ${isRefreshing ? 'text-royalMaroon-600 cursor-wait' : 'hover:text-royalMaroon-700 cursor-pointer'}`}
                                    title="Refresh Data Now"
                                >
                                    <RefreshCw className={`w-4 h-4 mr-1.5 transition-colors ${isRefreshing ? 'animate-spin text-royalMaroon-600' : 'text-gray-400 group-hover:text-royalMaroon-600'}`} />
                                    {isRefreshing ? 'Refreshing...' : 'Refresh Now'}
                                </button>
                                
                                <div className="border-l border-gray-300 h-5" />

                                <label className="flex items-center cursor-pointer group">
                                    <input 
                                        type="checkbox" 
                                        className="rounded border-gray-300 text-royalMaroon-600 focus:ring-royalMaroon-500 w-4 h-4 mr-2 transition-colors cursor-pointer"
                                        checked={autoRefresh}
                                        onChange={(e) => setAutoRefresh(e.target.checked)}
                                    />
                                    <span className="flex items-center font-medium group-hover:text-gray-900 transition-colors">
                                        Auto-refresh (10s)
                                    </span>
                                    {autoRefresh && (
                                        <span className="ml-2.5 flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royalMaroon-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-royalMaroon-500"></span>
                                        </span>
                                    )}
                                </label>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end">
                                <div className="mr-4">
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{logs.from}</span> to <span className="font-medium">{logs.to}</span> of <span className="font-medium">{logs.total}</span> entries
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        {logs.links.map((link, idx) => {
                                            if (link.label.includes('Previous')) {
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => link.url && router.get(link.url, { search: searchQuery, severity: severityFilter, timeframe: timeframeFilter, type: typeFilter }, { preserveState: true, preserveScroll: true })}
                                                        disabled={!link.url}
                                                        className={`relative inline-flex items-center px-2 py-1.5 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${link.url ? 'text-gray-500 hover:bg-gray-50' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                                                    >
                                                        <ChevronLeft className="h-4 w-4" />
                                                    </button>
                                                );
                                            }
                                            if (link.label.includes('Next')) {
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => link.url && router.get(link.url, { search: searchQuery, severity: severityFilter, timeframe: timeframeFilter, type: typeFilter }, { preserveState: true, preserveScroll: true })}
                                                        disabled={!link.url}
                                                        className={`relative inline-flex items-center px-2 py-1.5 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${link.url ? 'text-gray-500 hover:bg-gray-50' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                                                    >
                                                        <ChevronRight className="h-4 w-4" />
                                                    </button>
                                                );
                                            }
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => link.url && router.get(link.url, { search: searchQuery, severity: severityFilter, timeframe: timeframeFilter, type: typeFilter }, { preserveState: true, preserveScroll: true })}
                                                    className={`relative inline-flex items-center px-3 py-1.5 border text-xs font-medium ${
                                                        link.active 
                                                            ? 'z-10 bg-royalMaroon-50 border-royalMaroon-500 text-royalMaroon-700 font-bold' 
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

            {/* JSON Payload Inspector Drawer */}
            <div 
                className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
                    selectedLog ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Backdrop */}
                <div 
                    className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
                        selectedLog ? 'opacity-100' : 'opacity-0'
                    }`} 
                    onClick={() => setSelectedLog(null)} 
                />
                
                {/* Slide-over Panel */}
                <div 
                    className={`absolute inset-y-0 right-0 max-w-2xl w-full flex transform transition-transform duration-300 ease-out ${
                        selectedLog ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                {selectedLog && (
                    <div className="bg-slate-900 shadow-2xl h-full flex flex-col w-full text-slate-300 overflow-hidden border-l border-slate-700">
                        {/* Drawer Header */}
                        <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                            <div>
                                <h2 className="text-lg font-bold text-white flex items-center">
                                    <Terminal className="w-5 h-5 mr-2 text-blue-400" />
                                    Log Event Inspector
                                </h2>
                                <p className="text-slate-500 text-xs mt-1 font-mono">
                                    {selectedLog.id}
                                </p>
                            </div>
                            <button onClick={() => setSelectedLog(null)} className="text-slate-500 hover:text-white p-1.5 rounded-lg transition-colors bg-slate-800 hover:bg-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Drawer Body */}
                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            
                            {/* Summary Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 flex items-center"><Key className="w-3 h-3 mr-1"/> Event Context</p>
                                    <p className="text-sm font-mono text-white font-bold">{selectedLog.event}</p>
                                    <div className="mt-2">
                                        {getSeverityBadge(selectedLog.severity)}
                                    </div>
                                </div>
                                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 flex items-center"><User className="w-3 h-3 mr-1"/> Actor Identity</p>
                                    <p className="text-sm text-white font-medium">{selectedLog.user.name}</p>
                                    <p className="text-xs font-mono text-slate-400 mt-0.5">{selectedLog.user.email}</p>
                                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-slate-700 text-[10px] rounded text-slate-300">{selectedLog.user.role}</span>
                                </div>
                            </div>

                            {/* Geo Map Simulation Block */}
                            <div className="bg-slate-800 rounded-lg p-1 border border-slate-700">
                                <div className="bg-slate-900 rounded-md p-4 flex items-start">
                                    <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center mr-4 border border-slate-700">
                                        <Globe className="w-6 h-6 text-blue-500 opacity-80" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-1">Network Origination</h4>
                                        <div className="flex space-x-6">
                                            <div>
                                                <p className="text-[10px] text-slate-500 uppercase">IP Address</p>
                                                <p className="text-sm font-mono text-blue-400">{selectedLog.ip_address}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-500 uppercase">Geolocation</p>
                                                <p className="text-sm text-slate-300">{selectedLog.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payload View Selector & Content */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
                                        <Activity className="w-4 h-4 mr-1.5" />
                                        Event Metadata
                                    </h4>
                                    <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
                                        <button 
                                            onClick={() => setPayloadView('summary')}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                                payloadView === 'summary' 
                                                    ? 'bg-slate-700 text-white shadow-sm' 
                                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                                            }`}
                                        >
                                            Activity Summary
                                        </button>
                                        <button 
                                            onClick={() => setPayloadView('json')}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                                payloadView === 'json' 
                                                    ? 'bg-slate-700 text-white shadow-sm' 
                                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                                            }`}
                                        >
                                            Raw JSON
                                        </button>
                                    </div>
                                </div>
                                
                                {payloadView === 'summary' ? (
                                    renderActivitySummary(selectedLog)
                                ) : (
                                    <div className="bg-[#0d1117] rounded-lg border border-slate-700/80 overflow-hidden shadow-inner">
                                        <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
                                            <div className="flex space-x-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                                            </div>
                                            <span className="text-[10px] text-slate-500 font-mono">application/json</span>
                                        </div>
                                        <pre className="p-4 text-[13px] font-mono leading-relaxed overflow-x-auto text-green-400">
                                            <code dangerouslySetInnerHTML={{ 
                                                __html: JSON.stringify(selectedLog.metadata, null, 2)
                                                    .replace(/"(.*?)":/g, '<span class="text-blue-300">"$1"</span>:')
                                                    .replace(/:\s"(.*?)"/g, ': <span class="text-orange-300">"$1"</span>')
                                                    .replace(/:\s(\d+)/g, ': <span class="text-purple-400">$1</span>')
                                            }} />
                                        </pre>
                                    </div>
                                )}
                            </div>
                            
                            {/* Device Info */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Device Signature</h4>
                                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700 text-xs font-mono text-slate-400 break-all">
                                    {selectedLog.user_agent}
                                </div>
                            </div>

                        </div>
                        
                        {/* Drawer Footer */}
                        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-between">
                            {selectedLog.severity === 'critical' ? (
                                <button 
                                    onClick={() => alert(`IP ${selectedLog.ip_address} has been blocked.`)}
                                    className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded text-sm font-medium hover:bg-red-600/30 transition-colors"
                                >
                                    Block IP Address
                                </button>
                            ) : <div></div>}
                            
                            <button 
                                onClick={() => setSelectedLog(null)}
                                className="px-5 py-2 bg-slate-800 text-white rounded text-sm font-medium hover:bg-slate-700 transition-colors"
                            >
                                Close Inspector
                            </button>
                        </div>
                    </div>
                )}
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg border flex items-center transition-all ${
                    toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                    {toast.type === 'success' ? (
                        <ShieldCheck className="w-5 h-5 mr-3 text-green-600" />
                    ) : (
                        <AlertTriangle className="w-5 h-5 mr-3 text-red-600" />
                    )}
                    <span className="font-medium text-sm">{toast.message}</span>
                    <button onClick={() => setToast(null)} className="ml-4 text-gray-500 hover:text-gray-700">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Confirmation Modal */}
            <Modal show={showPurgeModal} onClose={() => setShowPurgeModal(false)} maxWidth="md">
                <div className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                        <Trash2 className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 text-center mb-2">Purge Old Logs?</h2>
                    <p className="text-sm text-gray-500 text-center mb-6">
                        Are you sure you want to purge logs older than <strong>30 days</strong>? This action cannot be undone and will permanently remove old records from the database to optimize performance.
                    </p>
                    <div className="flex justify-center space-x-3">
                        <button
                            onClick={() => setShowPurgeModal(false)}
                            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={executePurge}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm"
                        >
                            Confirm Purge
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
