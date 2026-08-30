import React from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/Dashboard/DataTable';
import StatusBadge from '@/Components/Dashboard/StatusBadge';

export default function Earnings({ earnings }) {
    const columns = [
        { label: 'Date', render: (row) => new Date(row.paid_at || row.created_at).toLocaleDateString() },
        { label: 'Booking Ref', render: (row) => row.booking ? `BKG-${row.booking.id}` : 'N/A' },
        { label: 'Gateway', key: 'gateway' },
        { label: 'Amount', render: (row) => `$${row.amount}` },
        { label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    ];

    return (
        <SellerLayout header="Earnings & Payouts">
            <Head title="Earnings" />
            
            <DataTable 
                columns={columns} 
                data={earnings.data} 
                pagination={earnings}
                emptyMessage="No earnings recorded." 
            />
        </SellerLayout>
    );
}
