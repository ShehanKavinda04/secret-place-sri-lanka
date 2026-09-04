import React from 'react';
import { Activity, Clock } from 'lucide-react';

export default function ActivityLog({ activity }) {
    
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-indigo-500" /> 
                        Live Admin Activity Audit Trail
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                        A real-time stream of actions performed by this admin account.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                    Live Connection Active
                </div>
            </div>

            <div className="relative border-l-2 border-slate-200 ml-3 md:ml-4 space-y-8">
                {activity.map((log, index) => (
                    <div key={log.id} className={`relative pl-6 md:pl-8 ${index === 0 ? 'animate-fade-in-up' : ''}`}>
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-indigo-500 shadow-sm"></div>
                        
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 hover:border-slate-300 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-start justify-between">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">
                                        {log.action_type}
                                    </h4>
                                    <p className="text-sm text-slate-700 mt-1">
                                        {log.description}
                                    </p>
                                </div>
                                <div className="mt-2 md:mt-0 flex flex-col md:items-end text-xs text-slate-500 space-y-1">
                                    <span className="flex items-center">
                                        <Clock className="w-3.5 h-3.5 mr-1" />
                                        {new Date(log.created_at).toLocaleString()}
                                    </span>
                                    <span className="font-mono bg-slate-200 px-1.5 py-0.5 rounded text-[10px]">
                                        IP: {log.ip_address}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {activity.length === 0 && (
                    <div className="pl-8 py-8 text-sm text-slate-500 italic">
                        No recent activity recorded for this account.
                    </div>
                )}
            </div>
        </div>
    );
}
