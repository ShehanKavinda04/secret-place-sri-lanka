import React from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head } from '@inertiajs/react';
import EmptyState from '@/Components/Dashboard/EmptyState';

export default function Wishlist({ items }) {
    return (
        <CustomerLayout header="My Wishlist">
            <Head title="Wishlist" />
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                {items && items.data && items.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Render items here later */}
                    </div>
                ) : (
                    <EmptyState 
                        title="Your wishlist is empty" 
                        message="Save places and experiences you want to visit later by clicking the heart icon." 
                    />
                )}
            </div>
        </CustomerLayout>
    );
}
