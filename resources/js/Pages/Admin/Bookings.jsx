import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/Dashboard/DataTable';
import StatusBadge from '@/Components/Dashboard/StatusBadge';

export default function Bookings({ bookings }) {
    const columns = [
        { label: 'Reference', render: (row) => `BKG-${row.id}` },
        { label: 'Customer', render: (row) => row.tourist?.name || 'Unknown' },
        { label: 'Business', render: (row) => row.business?.name || 'Unknown' },
        { label: 'Amount', render: (row) => `$${row.total_amount}` },
        { label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    ];

    return (
        <AdminLayout header="All Bookings">
            <Head title="Bookings" />
            
            <DataTable 
                columns={columns} 
                data={bookings.data} 
                pagination={bookings}
                emptyMessage="No bookings found." 
            />
        </AdminLayout>
    );
}
