import React from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/Dashboard/DataTable';
import StatusBadge from '@/Components/Dashboard/StatusBadge';

export default function Orders({ orders }) {
    const columns = [
        { label: 'Order ID', render: (row) => `ORD-${row.id}` },
        { label: 'Type', render: (row) => String(row.type).toUpperCase() },
        { label: 'Date', render: (row) => new Date(row.created_at).toLocaleDateString() },
        { label: 'Total', render: (row) => `$${row.total_amount}` },
        { label: 'Status', render: (row) => <StatusBadge status={row.payment_status} /> },
    ];

    return (
        <CustomerLayout header="My Orders">
            <Head title="My Orders" />
            
            <DataTable 
                columns={columns} 
                data={orders} 
                emptyMessage="No local crafts or items ordered yet." 
            />
        </CustomerLayout>
    );
}
