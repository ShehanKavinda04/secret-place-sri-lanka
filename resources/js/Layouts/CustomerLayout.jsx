import React from 'react';
import AuthenticatedLayout from './AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import NotificationBell from '@/Components/Dashboard/NotificationBell';

export default function CustomerLayout({ header, children }) {
    const { url } = usePage();

    const tabs = [
        { name: 'Overview', href: route('dashboard') },
        { name: 'My Bookings', href: route('customer.bookings') },
        { name: 'My Orders', href: route('customer.orders') },
        { name: 'Wishlist', href: route('customer.wishlist') },
    ];

    const customerHeader = (
        <div className="flex items-center justify-between">
            <div className="flex-1">
                <h2 className="text-2xl font-semibold leading-tight text-gray-800 font-sansDisplay">
                    {header}
                </h2>
                <div className="mt-4">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => {
                            const isActive = url === new URL(tab.href).pathname || url.startsWith(new URL(tab.href).pathname + '/');
                            return (
                                <Link
                                    key={tab.name}
                                    href={tab.href}
                                    className={`
                                        whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                        ${isActive 
                                            ? 'border-royalTeal-500 text-royalTeal-600' 
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }
                                    `}
                                >
                                    {tab.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
                <NotificationBell unreadCount={2} />
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout header={customerHeader}>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {children}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
