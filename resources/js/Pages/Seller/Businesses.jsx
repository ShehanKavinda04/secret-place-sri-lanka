import React from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/Dashboard/DataTable';
import StatusBadge from '@/Components/Dashboard/StatusBadge';
import { Plus } from 'lucide-react';

export default function Businesses({ businesses }) {
    const columns = [
        { label: 'Name', key: 'name' },
        { label: 'Category', render: (row) => String(row.category || '').toUpperCase() },
        { label: 'Location', render: (row) => `${row.city}` },
        { label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
        { label: 'Actions', render: (row) => (
            <Link href="#" className="text-royalGold-600 hover:text-royalGold-900 font-medium text-sm">
                Edit
            </Link>
        )},
    ];

    return (
        <SellerLayout header="My Businesses">
            <Head title="My Businesses" />
            
            <div className="mb-6 flex justify-end">
                <Link href="#" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-royalGold-600 hover:bg-royalGold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royalGold-500">
                    <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Add New Business
                </Link>
            </div>

            <DataTable 
                columns={columns} 
                data={businesses.data} 
                pagination={businesses}
                emptyMessage="You haven't listed any businesses yet." 
            />
        </SellerLayout>
    );
}
