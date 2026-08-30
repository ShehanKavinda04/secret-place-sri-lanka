import React from 'react';

export default function StatusBadge({ status }) {
    const getStyles = () => {
        const s = status?.toLowerCase() || '';
        if (['approved', 'confirmed', 'completed', 'active'].includes(s)) {
            return 'bg-green-100 text-green-800 border-green-200';
        }
        if (['pending', 'processing', 'in progress'].includes(s)) {
            return 'bg-amber-100 text-amber-800 border-amber-200';
        }
        if (['rejected', 'cancelled'].includes(s)) {
            return 'bg-red-100 text-red-800 border-red-200';
        }
        return 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${getStyles()}`}>
            {status}
        </span>
    );
}
