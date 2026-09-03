import React, { useState, useEffect, useContext } from 'react';
import { 
    createColumnHelper, 
    flexRender, 
    getCoreRowModel, 
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel
} from '@tanstack/react-table';
import { Search, ChevronDown, ChevronUp, AlertCircle, Package, Home } from 'lucide-react';
import { AppContext } from '@/Layouts/AdminLayout';

const columnHelper = createColumnHelper();

export default function OperationsMonitor({ initialData = [] }) {
    const { t } = useContext(AppContext) || { t: (k) => k };

    const columns = [
        columnHelper.accessor('id', {
            header: t('Reference ID'),
            cell: info => <span className="font-bold text-indigo-600">{info.getValue()}</span>,
        }),
        columnHelper.accessor('type', {
            header: t('Type'),
            cell: info => (
                <div className="flex items-center text-gray-600 text-sm capitalize">
                    {info.getValue() === 'product' ? <Package className="w-4 h-4 mr-1 text-emerald-500" /> : <Home className="w-4 h-4 mr-1 text-amber-500" />}
                    {info.getValue()}
                </div>
            )
        }),
        columnHelper.accessor('vendor', {
            header: t('Vendor/Host'),
            cell: info => <span className="font-medium text-slate-900">{info.getValue()}</span>,
        }),
        columnHelper.accessor('customer', {
            header: t('Customer'),
        }),
        columnHelper.accessor('amount', {
            header: t('Amount (LKR)'),
            cell: info => <span className="font-semibold text-slate-900">{info.getValue().toLocaleString()}</span>,
        }),
        columnHelper.accessor('status', {
            header: t('Status'),
            cell: info => {
                const status = info.getValue();
                let color = 'bg-gray-100 text-gray-800';
                if (status === 'shipped' || status === 'confirmed') color = 'bg-indigo-100 text-indigo-800';
                if (status === 'delivered' || status === 'completed') color = 'bg-emerald-100 text-emerald-800';
                if (status === 'disputed') color = 'bg-red-100 text-red-800 font-bold';

                return <span className={`inline-flex px-2 py-1 rounded text-xs capitalize ${color}`}>{status}</span>;
            }
        }),
        columnHelper.accessor('issue', {
            header: t('Disputes / Issues'),
            cell: info => info.getValue() ? (
                <span className="flex items-center text-xs text-red-600 font-medium">
                    <AlertCircle className="w-3 h-3 mr-1" /> {info.getValue()}
                </span>
            ) : (
                <span className="text-gray-400 text-xs">-</span>
            )
        }),
    ];
    const mockData = [
        { id: 'ORD-5091', type: 'product', vendor: 'Kandy Brassworks', customer: 'John Doe', amount: 15000, status: 'shipped', issue: null },
        { id: 'RES-8821', type: 'accommodation', vendor: 'Natures Grace Lodge', customer: 'Jane Smith', amount: 45000, status: 'confirmed', issue: null },
        { id: 'ORD-5092', type: 'product', vendor: 'Ceylon Spice Co.', customer: 'Alice Wong', amount: 8500, status: 'disputed', issue: 'Damaged in transit' },
        { id: 'RES-8822', type: 'accommodation', vendor: 'Galle Heritage Villa', customer: 'Mark Johnson', amount: 120000, status: 'disputed', issue: 'Host cancelled last minute' },
        { id: 'ORD-5093', type: 'product', vendor: 'Local Tea Estates', customer: 'Sarah Connor', amount: 2500, status: 'delivered', issue: null },
        { id: 'RES-8823', type: 'accommodation', vendor: 'Ella Eco Cabin', customer: 'Tom Hardy', amount: 35000, status: 'completed', issue: null },
    ];

    const [data, setData] = useState(initialData.length > 0 ? initialData : mockData);
    const [globalFilter, setGlobalFilter] = useState('');

    useEffect(() => {
        if (window.Echo) {
            const channel = window.Echo.channel('admin-dashboard');
            channel.listen('OperationsUpdated', (e) => {
                if (e.operationsData) {
                    setData(e.operationsData);
                }
            });
        }
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        initialState: {
            pagination: { pageSize: 5 }
        }
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">{t('Unified Operations & Disputes')}</h2>
                    <p className="text-sm text-gray-500">{t('Track nationwide physical product shipments and room reservations.')}</p>
                </div>
                <div className="mt-4 sm:mt-0 relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                        value={globalFilter ?? ''}
                        onChange={e => setGlobalFilter(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 bg-white text-slate-900 placeholder-slate-400 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm" 
                        placeholder={t("Search IDs, vendors, or customers...")}
                    />
                </div>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th 
                                        key={header.id} 
                                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center gap-1">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: <ChevronUp className="w-3 h-3" />,
                                                desc: <ChevronDown className="w-3 h-3" />
                                            }[header.column.getIsSorted()] ?? null}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {table.getRowModel().rows.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        {t('No operational records found.')}
                    </div>
                )}
            </div>
            
            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500">
                    {t('Showing')} {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} {t('to')} {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getPrePaginationRowModel().rows.length)} {t('of')} {table.getPrePaginationRowModel().rows.length} {t('entries')}
                </span>
                <div className="flex gap-2">
                    <button
                        className="px-3 py-1 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {t('Previous')}
                    </button>
                    <button
                        className="px-3 py-1 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {t('Next')}
                    </button>
                </div>
            </div>
        </div>
    );
}
