import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DataTable({ columns, data, pagination = null, emptyMessage = "No records found" }) {
    // If no data is provided, generate 4 highly realistic sample items to demonstrate layout and mappings
    const isDummy = !data || data.length === 0;
    const items = isDummy ? Array(4).fill(0).map((_, i) => ({
        id: 10492 + i,
        name: ['Sigiriya Eco Lodge', 'Ella Cloud Forest Treks', 'Galle Heritage Homestay', 'Yala Wilderness Guides'][i],
        total_amount: [120.00, 350.50, 85.00, 210.00][i],
        amount: [120.00, 350.50, 85.00, 210.00][i],
        status: ['confirmed', 'pending', 'active', 'completed'][i],
        category: ['accommodation', 'tour', 'transport', 'craft'][i],
        email: `user${i}@example.com`,
        created_at: `2026-10-${12+i}T10:00:00.000000Z`,
        // Nested relation mocks for dynamic API response mappings
        owner: { name: ['Amila Sandaruwan', 'Kasun Perera', 'Nimali Fernando', 'Chaminda Silva'][i] },
        tourist: { name: ['Amila Sandaruwan', 'Kasun Perera', 'Nimali Fernando', 'Chaminda Silva'][i] },
        business: { name: ['Sigiriya Eco Lodge', 'Ella Cloud Forest Treks', 'Galle Heritage Homestay', 'Yala Wilderness Guides'][i] },
        user: { name: ['Amila Sandaruwan', 'Kasun Perera', 'Nimali Fernando', 'Chaminda Silva'][i] }
    })) : data;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((row, rowIdx) => (
                    <div key={row.id || rowIdx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md relative">
                        {isDummy && (
                            <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg z-10 shadow-sm border-b border-l border-emerald-200">
                                Demo Mode
                            </div>
                        )}
                        <div className="h-2 bg-royalMaroon-900 w-full"></div>
                        <div className="p-5 flex-1 flex flex-col space-y-4">
                            {columns.map((col, colIdx) => (
                                <div key={colIdx} className={colIdx === 0 ? "mb-2 border-b border-gray-100 pb-3" : ""}>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">{col.label}</p>
                                    <div className={`text-sm ${colIdx === 0 ? 'text-lg font-bold text-gray-900 font-sansDisplay' : 'text-gray-800'}`}>
                                        {col.render ? col.render(row) : row[col.key]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.total > pagination.per_page && (
                <div className="px-6 py-3 flex items-center justify-between border border-gray-200 rounded-lg bg-white shadow-sm">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{pagination.from}</span> to <span className="font-medium">{pagination.to}</span> of <span className="font-medium">{pagination.total}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                {pagination.links.map((link, idx) => {
                                    if (link.label.includes('Previous')) {
                                        return (
                                            <a
                                                key={idx}
                                                href={link.url || '#'}
                                                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${link.url ? 'text-gray-500 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'}`}
                                            >
                                                <span className="sr-only">Previous</span>
                                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                            </a>
                                        );
                                    }
                                    if (link.label.includes('Next')) {
                                        return (
                                            <a
                                                key={idx}
                                                href={link.url || '#'}
                                                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${link.url ? 'text-gray-500 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'}`}
                                            >
                                                <span className="sr-only">Next</span>
                                                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                            </a>
                                        );
                                    }
                                    return (
                                        <a
                                            key={idx}
                                            href={link.url || '#'}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                link.active 
                                                    ? 'z-10 bg-royalMaroon-50 border-royalMaroon-500 text-royalMaroon-600' 
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
    );
}
