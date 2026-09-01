import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { 
    Search, Filter, Store, AlertCircle, 
    CheckCircle2, XCircle, Download, Check, 
    X, FileText, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function Businesses({ businesses, stats, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');
    const [categoryFilter, setCategoryFilter] = useState(filters?.category || 'all');
    const [selectedBusiness, setSelectedBusiness] = useState(null);

    // Handle search/filter changes with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                searchQuery !== (filters?.search || '') || 
                statusFilter !== (filters?.status || 'all') ||
                categoryFilter !== (filters?.category || 'all')
            ) {
                router.get(route('admin.businesses'), { 
                    search: searchQuery, 
                    status: statusFilter,
                    category: categoryFilter
                }, { 
                    preserveState: true, 
                    preserveScroll: true 
                });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, statusFilter, categoryFilter]);

    // Real-time synchronization
    useEffect(() => {
        if (window.Echo) {
            window.Echo.channel('admin-dashboard')
                .listen('PendingApprovalsUpdated', (e) => {
                    console.log('Real-time PendingApprovalsUpdated event received', e);
                    router.reload({ only: ['businesses', 'stats'], preserveScroll: true, preserveState: true });
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
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            pending: 'bg-yellow-100 text-yellow-800',
            suspended: 'bg-orange-100 text-orange-800',
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
                {status || 'Unknown'}
            </span>
        );
    };

    const handleQuickAction = (id, action) => {
        router.post(`/admin/businesses/${id}/${action}`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                if (selectedBusiness && selectedBusiness.id === id) {
                    setSelectedBusiness(null);
                }
            }
        });
    };

    const tabs = [
        { id: 'all', label: 'All Requests' },
        { id: 'pending', label: 'Pending Review' },
        { id: 'approved', label: 'Approved' },
        { id: 'rejected', label: 'Rejected' },
        { id: 'suspended', label: 'Suspended' },
    ];

    return (
        <AdminLayout header="Business Approvals">
            <Head title="Merchant Hub & Approvals" />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 font-sansDisplay">Merchant Hub & Business Approvals</h1>
                        <p className="text-sm text-gray-500 mt-1">Review, approve, and manage business applications across the platform.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center shadow-sm transition-colors">
                            <Download className="w-4 h-4 mr-2" />
                            Export Data
                        </button>
                    </div>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                            <Store className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Merchants</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.total || 0}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4 relative overflow-hidden">
                        <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600 z-10">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <div className="z-10">
                            <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.pending || 0}</h3>
                        </div>
                        {stats?.pending > 0 && (
                            <div className="absolute top-0 right-0 w-2 h-full bg-yellow-400"></div>
                        )}
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Approved Businesses</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.approved || 0}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-red-50 rounded-lg text-red-600">
                            <XCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Rejected Applications</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.rejected || 0}</h3>
                        </div>
                    </div>
                </div>

                {/* Tabs & Filters */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {/* Tabs */}
                    <div className="border-b border-gray-200 overflow-x-auto">
                        <nav className="flex -mb-px px-4" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setStatusFilter(tab.id)}
                                    className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm transition-colors ${
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
                    
                    {/* Filters Toolbar */}
                    <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="Search Business, Owner, or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white text-slate-900 placeholder-slate-400 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royalMaroon-500 focus:border-royalMaroon-500 outline-none shadow-sm"
                            />
                        </div>
                        <div className="flex w-full sm:w-auto space-x-3">
                            <select 
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full sm:w-48 bg-white text-slate-900 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royalMaroon-500 outline-none py-2 px-3 shadow-sm"
                            >
                                <option value="all">All Categories</option>
                                <option value="accommodations">Accommodations</option>
                                <option value="transport">Transport</option>
                                <option value="crafts">Crafts</option>
                                <option value="experiences">Experiences</option>
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
                                        Business Details
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Owner
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Submitted Date
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
                                {businesses.data.length > 0 ? businesses.data.map((business) => (
                                    <tr key={business.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input type="checkbox" className="rounded border-gray-300 text-royalMaroon-600 focus:ring-royalMaroon-500" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 font-bold uppercase overflow-hidden shadow-sm">
                                                        {business.name ? business.name.substring(0, 2) : 'B'}
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900">{business.name}</div>
                                                    <div className="text-xs text-gray-500 font-mono mt-0.5">ID: {business.registration_id || `REG-00${business.id}`}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{business.owner?.name || 'Unknown Owner'}</div>
                                            <div className="text-xs text-gray-500">{business.owner?.email || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded border border-gray-200 bg-gray-50 text-xs font-medium text-gray-700 capitalize">
                                                {business.category || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(business.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(business.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                {business.status === 'pending' && (
                                                    <>
                                                        <button 
                                                            onClick={() => handleQuickAction(business.id, 'approve')}
                                                            title="Approve"
                                                            className="p-1.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleQuickAction(business.id, 'reject')}
                                                            title="Reject"
                                                            className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                <button 
                                                    onClick={() => setSelectedBusiness(business)}
                                                    className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md text-xs font-medium transition-colors shadow-sm ml-2"
                                                >
                                                    Review Details
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center">
                                            <FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                            <p className="text-sm font-medium text-gray-900">No applications found</p>
                                            <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {businesses.total > 0 && (
                        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{businesses.from}</span> to <span className="font-medium">{businesses.to}</span> of <span className="font-medium">{businesses.total}</span> entries
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        {businesses.links.map((link, idx) => {
                                            if (link.label.includes('Previous')) {
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => link.url && router.get(link.url, { search: searchQuery, status: statusFilter, category: categoryFilter }, { preserveState: true, preserveScroll: true })}
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
                                                        onClick={() => link.url && router.get(link.url, { search: searchQuery, status: statusFilter, category: categoryFilter }, { preserveState: true, preserveScroll: true })}
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
                                                    onClick={() => link.url && router.get(link.url, { search: searchQuery, status: statusFilter, category: categoryFilter }, { preserveState: true, preserveScroll: true })}
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

            {/* Business Review Modal/Slide-over Simulation */}
            <Modal show={selectedBusiness !== null} onClose={() => setSelectedBusiness(null)} maxWidth="2xl">
                {selectedBusiness && (
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                        <div className="bg-royalMaroon-900 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white font-sansDisplay">Application Review</h2>
                            <button onClick={() => setSelectedBusiness(null)} className="text-white/80 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <div className="flex items-start space-x-4 mb-8">
                                <div className="h-16 w-16 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold uppercase shadow-sm">
                                    {selectedBusiness.name ? selectedBusiness.name.substring(0, 2) : 'B'}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{selectedBusiness.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">Submitted on {new Date(selectedBusiness.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        </div>
                                        {getStatusBadge(selectedBusiness.status)}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Details Block */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Business Information</h4>
                                        <dl className="space-y-3">
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Registration ID</dt>
                                                <dd className="text-sm text-gray-900 font-mono mt-0.5">{selectedBusiness.registration_id || `REG-00${selectedBusiness.id}`}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Category</dt>
                                                <dd className="text-sm text-gray-900 capitalize mt-0.5">{selectedBusiness.category || 'N/A'}</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Owner Information</h4>
                                        <dl className="space-y-3">
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                                <dd className="text-sm text-gray-900 mt-0.5">{selectedBusiness.owner?.name || 'Unknown'}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Contact Email</dt>
                                                <dd className="text-sm text-gray-900 mt-0.5">{selectedBusiness.owner?.email || 'N/A'}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>

                                {/* Documents Block (Mocked) */}
                                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Verification Documents</h4>
                                    
                                    <ul className="space-y-4">
                                        <li className="flex items-center justify-between">
                                            <div className="flex items-center text-sm">
                                                <FileText className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="font-medium text-gray-700">Business Registration (BR)</span>
                                            </div>
                                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Uploaded</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <div className="flex items-center text-sm">
                                                <FileText className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="font-medium text-gray-700">Identity Proof (NIC)</span>
                                            </div>
                                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Uploaded</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <div className="flex items-center text-sm">
                                                <FileText className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="font-medium text-gray-700">Bank Passbook Copy</span>
                                            </div>
                                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Uploaded</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                            {selectedBusiness.status === 'pending' && (
                                <>
                                    <button
                                        onClick={() => handleQuickAction(selectedBusiness.id, 'reject')}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 hover:text-red-600 rounded-lg text-sm font-medium transition-colors shadow-sm"
                                    >
                                        Reject Application
                                    </button>
                                    <button
                                        onClick={() => handleQuickAction(selectedBusiness.id, 'approve')}
                                        className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center"
                                    >
                                        <Check className="w-4 h-4 mr-2" />
                                        Approve Business
                                    </button>
                                </>
                            )}
                            {selectedBusiness.status !== 'pending' && (
                                <button
                                    onClick={() => setSelectedBusiness(null)}
                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    Close Panel
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </AdminLayout>
    );
}
