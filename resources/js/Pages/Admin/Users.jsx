import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { 
    Search, Filter, MoreVertical, Users as UsersIcon, 
    ShieldCheck, Store, Briefcase, Edit2, Trash2, 
    ShieldBan, ChevronLeft, ChevronRight, Plus 
} from 'lucide-react';

export default function Users({ users, stats, filters }) {
    const [editingUser, setEditingUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [roleFilter, setRoleFilter] = useState(filters?.role || 'all');
    
    // Dropdown state for rows
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const { data, setData, put, processing, errors, reset } = useForm({
        role: ''
    });

    // Handle search/filter changes with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== (filters?.search || '') || roleFilter !== (filters?.role || 'all')) {
                router.get(route('admin.users'), { 
                    search: searchQuery, 
                    role: roleFilter 
                }, { 
                    preserveState: true, 
                    preserveScroll: true 
                });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, roleFilter]);

    // Real-time synchronization
    useEffect(() => {
        if (window.Echo) {
            window.Echo.channel('admin-dashboard')
                .listen('UsersUpdated', (e) => {
                    console.log('Real-time UsersUpdated event received', e);
                    router.reload({ only: ['users', 'stats'], preserveScroll: true, preserveState: true });
                });
        }
        return () => {
            if (window.Echo) {
                window.Echo.leaveChannel('admin-dashboard');
            }
        };
    }, []);

    const openEditModal = (user) => {
        setEditingUser(user);
        setData('role', user.role);
        setOpenDropdownId(null);
    };

    const closeEditModal = () => {
        setEditingUser(null);
        reset();
    };

    const submitEdit = (e) => {
        e.preventDefault();
        put(route('admin.users.update', editingUser.id), {
            onSuccess: () => closeEditModal(),
        });
    };

    const getRoleBadge = (role) => {
        const styles = {
            admin: 'bg-indigo-100 text-indigo-800',
            business_owner: 'bg-emerald-100 text-emerald-800',
            tourist: 'bg-blue-100 text-blue-800',
        };
        const labels = {
            admin: 'Admin',
            business_owner: 'Merchant',
            tourist: 'Tourist'
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[role] || 'bg-gray-100 text-gray-800'}`}>
                {labels[role] || role}
            </span>
        );
    };

    const getStatusBadge = (status = 'active') => {
        const styles = {
            active: 'bg-green-100 text-green-800',
            suspended: 'bg-red-100 text-red-800',
            pending: 'bg-yellow-100 text-yellow-800',
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status] || styles.active}`}>
                {status}
            </span>
        );
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setOpenDropdownId(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <AdminLayout header="User Management">
            <Head title="Users & Roles" />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 font-sansDisplay">User & Role Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage user access, roles, and platform permissions.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                            Manage Permissions
                        </button>
                        <button className="px-4 py-2 bg-royalMaroon-900 text-white rounded-lg text-sm font-medium hover:bg-royalMaroon-950 transition-colors flex items-center shadow-sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New User
                        </button>
                    </div>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                            <UsersIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Users</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.total || 0}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Super Admins</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.admins || 0}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                            <Store className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Merchants</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.merchants || 0}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Tourists</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.tourists || 0}</h3>
                        </div>
                    </div>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input 
                            type="text" 
                            placeholder="Search Name, Email, or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white text-slate-900 placeholder-slate-400 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
                        />
                    </div>
                    <div className="flex w-full sm:w-auto space-x-3">
                        <select 
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="w-full sm:w-40 bg-white text-slate-900 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none py-2 px-3"
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admins</option>
                            <option value="business_owner">Merchants</option>
                            <option value="tourist">Tourists</option>
                        </select>
                        <button className="px-4 py-2 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 flex items-center whitespace-nowrap">
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Main Data Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Joined Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.data.length > 0 ? users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getRoleBadge(user.role)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge('active')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenDropdownId(openDropdownId === user.id ? null : user.id);
                                                }}
                                                className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                            
                                            {openDropdownId === user.id && (
                                                <div 
                                                    className="origin-top-right absolute right-8 top-10 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-50"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <div className="py-1">
                                                        <button
                                                            onClick={() => openEditModal(user)}
                                                            className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                                        >
                                                            <Edit2 className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                                                            Change Role
                                                        </button>
                                                        <button className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left">
                                                            <ShieldBan className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                                                            Suspend User
                                                        </button>
                                                    </div>
                                                    <div className="py-1">
                                                        <button className="group flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                                                            <Trash2 className="mr-3 h-4 w-4 text-red-400 group-hover:text-red-500" />
                                                            Delete User
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500">
                                            No users found matching your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination Footer */}
                    {users.total > 0 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{users.from}</span> to <span className="font-medium">{users.to}</span> of <span className="font-medium">{users.total}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        {users.links.map((link, idx) => {
                                            if (link.label.includes('Previous')) {
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => link.url && router.get(link.url, { search: searchQuery, role: roleFilter }, { preserveState: true, preserveScroll: true })}
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
                                                        onClick={() => link.url && router.get(link.url, { search: searchQuery, role: roleFilter }, { preserveState: true, preserveScroll: true })}
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
                                                    onClick={() => link.url && router.get(link.url, { search: searchQuery, role: roleFilter }, { preserveState: true, preserveScroll: true })}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                        link.active 
                                                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' 
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

            {/* Edit Role Modal */}
            <Modal show={editingUser !== null} onClose={closeEditModal} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Edit User Role</h2>
                    
                    {editingUser && (
                        <form onSubmit={submitEdit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                                <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center space-x-3">
                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold flex-shrink-0">
                                        {editingUser.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-medium">{editingUser.name}</div>
                                        <div className="text-gray-500 text-xs">{editingUser.email}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role Permission</label>
                                <select
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="w-full border-gray-300 bg-white text-slate-900 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3 outline-none"
                                >
                                    <option value="admin">Super Admin</option>
                                    <option value="business_owner">Merchant</option>
                                    <option value="tourist">Tourist</option>
                                </select>
                                {errors.role && <div className="text-red-500 text-xs mt-1">{errors.role}</div>}
                            </div>
                            
                            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-royalMaroon-900 hover:bg-royalMaroon-950 focus:outline-none disabled:opacity-50 transition-colors"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </Modal>
        </AdminLayout>
    );
}
