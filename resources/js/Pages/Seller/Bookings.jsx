import React from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/Dashboard/DataTable';
import StatusBadge from '@/Components/Dashboard/StatusBadge';

export default function Bookings({ bookings }) {
    const columns = [
        { label: 'Ref', render: (row) => `BKG-${row.id}` },
        { label: 'Customer', render: (row) => row.tourist?.name || 'Unknown' },
        { label: 'Business', render: (row) => row.business?.name || 'Unknown' },
        { label: 'Date', render: (row) => new Date(row.booking_date).toLocaleDateString() },
        { label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
        { label: 'Actions', render: (row) => (
            <button className="text-royalGold-600 hover:text-royalGold-900 font-medium text-sm">
                Manage
            </button>
        )},
    ];

    return (
        <SellerLayout header="Bookings">
            <Head title="Bookings" />
            
            <DataTable 
                columns={columns} 
                data={bookings} 
                emptyMessage="No bookings received yet." 
            />
        </SellerLayout>
    );
}
