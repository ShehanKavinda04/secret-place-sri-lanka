import React, { useState, useMemo } from 'react';
import { Activity, Search, Filter, Download, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

export default function ActivityAuditLog({ logs }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    const filteredLogs = useMemo(() => {
        let result = logs;

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(log => 
                log.action_type.toLowerCase().includes(term) ||
                log.description.toLowerCase().includes(term) ||
                log.ip_address.toLowerCase().includes(term)
            );
        }

        if (filterStatus !== 'all') {
            result = result.filter(log => log.status.toLowerCase() === filterStatus.toLowerCase());
        }

        if (dateFilter !== 'all') {
            const now = new Date().getTime();
            const day = 24 * 60 * 60 * 1000;
            let threshold = 0;
            
            if (dateFilter === 'today') threshold = now - day;
            if (dateFilter === 'week') threshold = now - (7 * day);
            if (dateFilter === 'month') threshold = now - (30 * day);

            result = result.filter(log => new Date(log.created_at).getTime() >= threshold);
        }

        return result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }, [logs, searchTerm, filterStatus, dateFilter]);

    const handleExportCSV = () => {
        const headers = ["Timestamp", "Action", "Description", "IP Address", "Status"];
        const rows = filteredLogs.map(l => [
            new Date(l.created_at).toLocaleString(),
            l.action_type,
            l.description,
            l.ip_address,
            l.status
        ]);
        
        const csvContent = "data:text/csv;charset=utf-8," 
            + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
            
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `security_audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-[#0F172A]">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[#0F172A]">System Activity & Audit Log</h3>
                        <p className="text-sm text-slate-500">Real-time stream of security events and actions</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search logs..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-[#0F172A] focus:ring-[#0F172A] w-full md:w-48"
                        />
                    </div>
                    
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2 h-[38px]">
                        <Filter className="w-4 h-4 text-slate-400" />
                        <select 
                            value={filterStatus} 
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="text-sm border-none bg-transparent focus:ring-0 py-1 pl-1 pr-6 cursor-pointer text-slate-700 font-medium"
                        >
                            <option value="all">All Status</option>
                            <option value="success">Success</option>
                            <option value="failed">Failed</option>
                        </select>
                        <div className="w-px h-4 bg-slate-200 mx-1"></div>
                        <select 
                            value={dateFilter} 
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="text-sm border-none bg-transparent focus:ring-0 py-1 pl-1 pr-6 cursor-pointer text-slate-700 font-medium"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">Past Week</option>
                            <option value="month">Past Month</option>
                        </select>
                    </div>

                    <button 
                        onClick={handleExportCSV}
                        className="h-[38px] px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto min-h-[300px]">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200 sticky top-0">
                        <tr>
                            <th className="px-6 py-4">Event / Action</th>
                            <th className="px-6 py-4">Description</th>
                            <th className="px-6 py-4">IP Address</th>
                            <th className="px-6 py-4">Timestamp</th>
                            <th className="px-6 py-4 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredLogs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                    No audit logs match your search criteria.
                                </td>
                            </tr>
                        ) : (
                            filteredLogs.map(log => (
                                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            {log.action_type.includes('AUTH') ? (
                                                <div className="w-6 h-6 rounded bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center shrink-0">
                                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                                </div>
                                            ) : log.action_type.includes('SECURITY') ? (
                                                <div className="w-6 h-6 rounded bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center shrink-0">
                                                    <ArrowDownRight className="w-3.5 h-3.5" />
                                                </div>
                                            ) : (
                                                <div className="w-6 h-6 rounded bg-[#10B981]/10 text-[#10B981] flex items-center justify-center shrink-0">
                                                    <Activity className="w-3.5 h-3.5" />
                                                </div>
                                            )}
                                            <span className="font-bold text-[#0F172A]">{log.action_type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate" title={log.description}>
                                        {log.description}
                                        {log.target_id && <span className="ml-2 text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{log.target_id}</span>}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500 whitespace-nowrap">
                                        {log.ip_address}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                            {new Date(log.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                            log.status === 'Success' 
                                                ? 'bg-[#10B981]/10 text-[#10B981]' 
                                                : 'bg-[#EF4444]/10 text-[#EF4444]'
                                        }`}>
                                            {log.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
