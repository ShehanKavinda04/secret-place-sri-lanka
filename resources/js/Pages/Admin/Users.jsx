import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import DataTable from '@/Components/Dashboard/DataTable';
import StatusBadge from '@/Components/Dashboard/StatusBadge';
import Modal from '@/Components/Modal';

export default function Users({ users }) {
    const [editingUser, setEditingUser] = useState(null);
    const { data, setData, put, processing, errors, reset } = useForm({
        role: ''
    });

    const openEditModal = (user) => {
        setEditingUser(user);
        setData('role', user.role);
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
    const columns = [
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Role', render: (row) => <span className="capitalize text-gray-700">{row.role}</span> },
        { label: 'Joined', render: (row) => new Date(row.created_at).toLocaleDateString() },
        { label: 'Status', render: (row) => <StatusBadge status={row.status || 'Active'} /> },
        { label: 'Actions', render: (row) => (
            <button 
                onClick={() => openEditModal(row)}
                className="text-royalMaroon-700 hover:text-royalMaroon-900 font-medium text-sm"
            >
                Edit
            </button>
        )},
    ];

    return (
        <AdminLayout header="User Management">
            <Head title="Users" />
            
            <DataTable 
                columns={columns} 
                data={users.data} 
                pagination={users}
                emptyMessage="No users found." 
            />

            <Modal show={editingUser !== null} onClose={closeEditModal} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Edit User Role</h2>
                    
                    {editingUser && (
                        <form onSubmit={submitEdit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                                <div className="text-sm text-gray-900 bg-gray-50 p-2 rounded border border-gray-200">
                                    {editingUser.name} ({editingUser.email})
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="business_owner">Business Owner</option>
                                    <option value="tourist">Tourist</option>
                                </select>
                                {errors.role && <div className="text-red-500 text-xs mt-1">{errors.role}</div>}
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-royalMaroon-900 hover:bg-royalMaroon-950 focus:outline-none disabled:opacity-50"
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
