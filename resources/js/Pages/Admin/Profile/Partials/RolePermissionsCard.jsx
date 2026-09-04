import React from 'react';
import { Key, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function RolePermissionsCard({ profile }) {
    
    return (
        <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-6 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 p-3 opacity-10">
                <ShieldCheck className="w-24 h-24" />
            </div>

            <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center relative z-10">
                <Key className="w-5 h-5 mr-2 text-indigo-400" /> 
                Role & Permissions Matrix
            </h3>
            
            <div className="relative z-10 space-y-6">
                <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Current Assigned Role</p>
                    <div className="inline-flex items-center px-3 py-1 rounded-md text-sm font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {profile.role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </div>
                </div>

                <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Granular Capabilities</p>
                    <ul className="space-y-2">
                        {profile.permissions.map((perm, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="flex-shrink-0 w-4 h-4 mt-0.5 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2 border border-emerald-500/30">
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                                </span>
                                <span className="text-sm text-slate-200">{perm}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-4 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 flex items-start">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-xs text-slate-400">
                        Permissions are managed by Master Administrators. Any live changes to your clearance level will reflect here instantly.
                    </p>
                </div>
            </div>
        </div>
    );
}
