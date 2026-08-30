import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/Dashboard/DataTable';
import StatusBadge from '@/Components/Dashboard/StatusBadge';

export default function Users({ users }) {
    const columns = [
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Role', render: (row) => <span className="capitalize text-gray-700">{row.role}</span> },
        { label: 'Joined', render: (row) => new Date(row.created_at).toLocaleDateString() },
        { label: 'Status', render: (row) => <StatusBadge status={row.status || 'Active'} /> },
        { label: 'Actions', render: (row) => (
            <button className="text-royalMaroon-700 hover:text-royalMaroon-900 font-medium text-sm">
                Edit
            </button>
        )},
    ];

    return (
        <AdminLayout header="User Management">
            <Head title="Users" />
            
            <DataTable 
                columns={columns} 
                data={users} 
                emptyMessage="No users found." 
            />
        </AdminLayout>
    );
}
