import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { 
    Search, Download, CalendarDays, CheckCircle, 
    Clock, XCircle, DollarSign, ChevronLeft, 
    ChevronRight, CreditCard, MapPin, X, Users as UsersIcon
} from 'lucide-react';

export default function Bookings({ bookings, stats, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');
    const [dateFilter, setDateFilter] = useState(filters?.date || 'all');
    const [selectedBooking, setSelectedBooking] = useState(null);

    // Handle search/filter changes with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                searchQuery !== (filters?.search || '') || 
                statusFilter !== (filters?.status || 'all') ||
                dateFilter !== (filters?.date || 'all')
            ) {
                router.get(route('admin.bookings'), { 
                    search: searchQuery, 
                    status: statusFilter,
                    date: dateFilter
                }, { 
                    preserveState: true, 
                    preserveScroll: true 
                });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, statusFilter, dateFilter]);

    // Real-time synchronization
    useEffect(() => {
        if (window.Echo) {
            window.Echo.channel('admin-dashboard')
                .listen('OperationsUpdated', (e) => {
                    console.log('Real-time OperationsUpdated event received', e);
                    router.reload({ only: ['bookings', 'stats'], preserveScroll: true, preserveState: true });
                });
        }
        return () => {
            if (window.Echo) {
                window.Echo.leaveChannel('admin-dashboard');
            }
        };
    }, []);

    const getStatusBadge = (status) => {
        const styles = {
            confirmed: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            completed: 'bg-blue-100 text-blue-800',
            cancelled: 'bg-red-100 text-red-800',
            disputed: 'bg-orange-100 text-orange-800',
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
                {status || 'Unknown'}
            </span>
        );
    };

    const handleQuickAction = (id, action) => {
        // Implement action handler here (e.g., status updates)
        // router.post(`/admin/bookings/${id}/${action}`, ...);
        alert(`Action ${action} triggered for BKG-${id}`);
    };

    const tabs = [
        { id: 'all', label: 'All Bookings' },
        { id: 'confirmed', label: 'Confirmed' },
        { id: 'pending', label: 'Pending' },
        { id: 'completed', label: 'Completed' },
        { id: 'cancelled', label: 'Cancelled' },
        { id: 'disputed', label: 'Disputed' },
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'LKR',
        }).format(amount || 0);
    };

    return (
        <AdminLayout header="Operations">
            <Head title="Booking & Operations" />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 font-sansDisplay">Operations & Booking Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Monitor, manage, and resolve all system bookings and operational activities in real time.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center shadow-sm transition-colors">
                            <Download className="w-4 h-4 mr-2" />
                            Export Operations Log
                        </button>
                    </div>
                </div>

                {/* KPI Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                            <CalendarDays className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Bookings</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.total || 0}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-green-50 rounded-lg text-green-600">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Confirmed</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.confirmed || 0}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.pending || 0}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-red-50 rounded-lg text-red-600">
                            <XCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Cancelled</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.cancelled || 0}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4 relative overflow-hidden">
                        <div className="p-3 bg-royalMaroon-50 rounded-lg text-royalMaroon-600 z-10">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div className="z-10">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Volume</p>
                            <h3 className="text-xl font-bold text-gray-900">{formatCurrency(stats?.volume)}</h3>
                        </div>
                        <div className="absolute top-0 right-0 w-2 h-full bg-royalMaroon-700"></div>
                    </div>
                </div>

                {/* Tabs & Filters Toolbar */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {/* Tabs */}
                    <div className="border-b border-gray-200 overflow-x-auto">
                        <nav className="flex -mb-px px-4" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setStatusFilter(tab.id)}
                                    className={`whitespace-nowrap py-4 px-5 border-b-2 font-medium text-sm transition-colors ${
                                        statusFilter === tab.id
                                            ? 'border-royalMaroon-700 text-royalMaroon-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                    
                    {/* Filters */}
                    <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="Search Booking ID, Customer, or Business..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white text-slate-900 placeholder-slate-400 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royalMaroon-500 focus:border-royalMaroon-500 outline-none shadow-sm"
                            />
                        </div>
                        <div className="flex w-full sm:w-auto space-x-3">
                            <select 
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="w-full sm:w-48 bg-white text-slate-900 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royalMaroon-500 outline-none py-2 px-3 shadow-sm"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="last7">Last 7 Days</option>
                                <option value="last30">Last 30 Days</option>
                            </select>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                        <input type="checkbox" className="rounded border-gray-300 text-royalMaroon-600 focus:ring-royalMaroon-500" />
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Booking Ref
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Merchant / Business
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.data.length > 0 ? bookings.data.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input type="checkbox" className="rounded border-gray-300 text-royalMaroon-600 focus:ring-royalMaroon-500" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-bold text-gray-900">
                                                <CalendarDays className="w-4 h-4 text-gray-400 mr-2" />
                                                #BKG-{booking.id.toString().padStart(4, '0')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-900">{booking.tourist?.name || 'Guest User'}</div>
                                            <div className="text-xs text-gray-500">{booking.tourist?.email || 'No email provided'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{booking.business?.name || 'Unknown Business'}</div>
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-600 capitalize">
                                                    {booking.business?.category || 'Service'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="text-sm font-bold text-gray-900">
                                                {formatCurrency(booking.total_amount)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(booking.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(booking.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(booking.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button 
                                                onClick={() => setSelectedBooking(booking)}
                                                className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md text-xs font-medium transition-colors shadow-sm"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center">
                                            <CalendarDays className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                            <p className="text-sm font-medium text-gray-900">No bookings found</p>
                                            <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {bookings.total > 0 && (
                        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{bookings.from}</span> to <span className="font-medium">{bookings.to}</span> of <span className="font-medium">{bookings.total}</span> items
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        {bookings.links.map((link, idx) => {
                                            if (link.label.includes('Previous')) {
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => link.url && router.get(link.url, { search: searchQuery, status: statusFilter, date: dateFilter }, { preserveState: true, preserveScroll: true })}
                                                        disabled={!link.url}
                                                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${link.url ? 'text-gray-500 hover:bg-gray-50' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                                                    >
                                                        <span className="sr-only">Previous</span>
                                                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                );
                                            }
                                            if (link.label.includes('Next')) {
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => link.url && router.get(link.url, { search: searchQuery, status: statusFilter, date: dateFilter }, { preserveState: true, preserveScroll: true })}
                                                        disabled={!link.url}
                                                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${link.url ? 'text-gray-500 hover:bg-gray-50' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                                                    >
                                                        <span className="sr-only">Next</span>
                                                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                );
                                            }
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => link.url && router.get(link.url, { search: searchQuery, status: statusFilter, date: dateFilter }, { preserveState: true, preserveScroll: true })}
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
            </div>

            {/* Slide-Over Booking Detail Drawer */}
            <Modal show={selectedBooking !== null} onClose={() => setSelectedBooking(null)} maxWidth="3xl">
                {selectedBooking && (
                    <div className="bg-white rounded-lg shadow-2xl flex flex-col max-h-[90vh]">
                        {/* Drawer Header */}
                        <div className="bg-slate-900 px-6 py-5 flex justify-between items-center shrink-0">
                            <div>
                                <h2 className="text-xl font-bold text-white font-sansDisplay flex items-center">
                                    Booking Reference: #BKG-{selectedBooking.id.toString().padStart(4, '0')}
                                </h2>
                                <p className="text-slate-400 text-sm mt-1">
                                    Placed on {new Date(selectedBooking.created_at).toLocaleString()}
                                </p>
                            </div>
                            <button onClick={() => setSelectedBooking(null)} className="text-slate-400 hover:text-white p-2">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        {/* Drawer Body */}
                        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
                            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Current Status</p>
                                    <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-500">Total Amount</p>
                                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(selectedBooking.total_amount)}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* Customer Info */}
                                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                                        <UsersIcon className="w-4 h-4 mr-2" /> Customer Details
                                    </h4>
                                    <dl className="space-y-3">
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">Full Name</dt>
                                            <dd className="text-sm font-semibold text-gray-900 mt-0.5">{selectedBooking.tourist?.name || 'Guest User'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">Contact Email</dt>
                                            <dd className="text-sm text-gray-900 mt-0.5">{selectedBooking.tourist?.email || 'N/A'}</dd>
                                        </div>
                                    </dl>
                                </div>

                                {/* Merchant Info */}
                                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                                        <Store className="w-4 h-4 mr-2" /> Merchant Details
                                    </h4>
                                    <dl className="space-y-3">
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">Business Name</dt>
                                            <dd className="text-sm font-semibold text-gray-900 mt-0.5">{selectedBooking.business?.name || 'Unknown'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">Category</dt>
                                            <dd className="text-sm text-gray-900 mt-0.5 capitalize">{selectedBooking.business?.category || 'Service'}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            {/* Operational Timeline & Payment */}
                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Transaction & Operational Log</h4>
                                
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div className="flex items-center text-sm">
                                        <CreditCard className="w-4 h-4 text-gray-400 mr-3" />
                                        <span className="font-medium text-gray-700">Payment Gateway ID</span>
                                    </div>
                                    <span className="text-sm font-mono text-gray-600">TXN-9{selectedBooking.id}84{selectedBooking.total_amount % 100}A</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div className="flex items-center text-sm">
                                        <Clock className="w-4 h-4 text-gray-400 mr-3" />
                                        <span className="font-medium text-gray-700">Booking Created</span>
                                    </div>
                                    <span className="text-sm text-gray-600">{new Date(selectedBooking.created_at).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <div className="flex items-center text-sm">
                                        <CheckCircle className="w-4 h-4 text-gray-400 mr-3" />
                                        <span className="font-medium text-gray-700">Status Last Updated</span>
                                    </div>
                                    <span className="text-sm text-gray-600">{new Date(selectedBooking.updated_at).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center shrink-0">
                            <div>
                                {selectedBooking.status !== 'cancelled' && (
                                    <button
                                        onClick={() => handleQuickAction(selectedBooking.id, 'cancel')}
                                        className="px-4 py-2 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors shadow-sm"
                                    >
                                        Force Cancel & Refund
                                    </button>
                                )}
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setSelectedBooking(null)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors shadow-sm"
                                >
                                    Close Panel
                                </button>
                                {selectedBooking.status === 'pending' && (
                                    <button
                                        onClick={() => handleQuickAction(selectedBooking.id, 'confirm')}
                                        className="px-4 py-2 bg-royalMaroon-900 text-white hover:bg-royalMaroon-950 rounded-lg text-sm font-medium transition-colors shadow-sm"
                                    >
                                        Override to Confirmed
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </AdminLayout>
    );
}


