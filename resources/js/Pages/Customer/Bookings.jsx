import React from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/Dashboard/DataTable';
import StatusBadge from '@/Components/Dashboard/StatusBadge';

export default function Bookings({ bookings }) {
    const columns = [
        { label: 'Booking Ref', render: (row) => `BKG-${row.id}` },
        { label: 'Business', render: (row) => row.business?.name || 'Unknown' },
        { label: 'Date', render: (row) => new Date(row.booking_date).toLocaleDateString() },
        { label: 'Total', render: (row) => `$${row.total_amount}` },
        { label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    ];

    return (
        <CustomerLayout header="My Bookings">
            <Head title="My Bookings" />
            
            <DataTable 
                columns={columns} 
                data={bookings} 
                emptyMessage="You haven't booked any adventures yet. Time to explore!" 
            />
        </CustomerLayout>
    );
}
