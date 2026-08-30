import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/Dashboard/DataTable';
import StatusBadge from '@/Components/Dashboard/StatusBadge';

export default function Businesses({ businesses }) {
    const columns = [
        { label: 'Business Name', key: 'name' },
        { label: 'Owner', render: (row) => row.owner?.name || 'Unknown' },
        { label: 'Category', render: (row) => String(row.category || '').toUpperCase() },
        { label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
        { label: 'Actions', render: (row) => (
            <div className="flex gap-3">
                <button className="text-royalMaroon-700 hover:text-royalMaroon-900 font-medium text-sm">Review</button>
            </div>
        )},
    ];

    return (
        <AdminLayout header="Business Approvals">
            <Head title="Businesses" />
            
            <DataTable 
                columns={columns} 
                data={businesses.data} 
                pagination={businesses}
                emptyMessage="No business listings." 
            />
        </AdminLayout>
    );
}
