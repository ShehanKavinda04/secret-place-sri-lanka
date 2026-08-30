import React from 'react';
import { ResponsiveContainer } from 'recharts';

export default function ChartCard({ title, subtitle, children, height = 300 }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 font-sansDisplay">{title}</h3>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
            <div style={{ height: `${height}px` }} className="w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {children}
                </ResponsiveContainer>
            </div>
        </div>
    );
}
