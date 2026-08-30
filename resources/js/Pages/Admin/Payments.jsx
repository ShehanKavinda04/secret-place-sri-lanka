import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/Dashboard/DataTable';
import StatusBadge from '@/Components/Dashboard/StatusBadge';

export default function Payments({ payments }) {
    const columns = [
        { label: 'Transaction ID', key: 'transaction_id' },
        { label: 'Gateway', key: 'gateway' },
        { label: 'Amount', render: (row) => `$${row.amount}` },
        { label: 'Date', render: (row) => new Date(row.paid_at || row.created_at).toLocaleDateString() },
        { label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    ];

    return (
        <AdminLayout header="Payments & Payouts">
            <Head title="Payments" />
            
            <DataTable 
                columns={columns} 
                data={payments.data} 
                pagination={payments}
                emptyMessage="No payments recorded." 
            />
        </AdminLayout>
    );
}
