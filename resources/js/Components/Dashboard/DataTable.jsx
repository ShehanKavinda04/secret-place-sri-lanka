import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EmptyState from './EmptyState';

export default function DataTable({ columns, data, pagination = null, emptyMessage = "No records found" }) {
    if (!data || data.length === 0) {
        return (
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <EmptyState title="No Data" message={emptyMessage} />
            </div>
        );
    }

    return (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sansDisplay"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((row, rowIdx) => (
                            <tr key={row.id || rowIdx} className="hover:bg-gray-50 transition-colors">
                                {columns.map((col, colIdx) => (
                                    <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.total > pagination.per_page && (
                <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 bg-gray-50">
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
