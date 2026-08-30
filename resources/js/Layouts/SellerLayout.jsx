import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Sidebar from '@/Components/Dashboard/Sidebar';
import NotificationBell from '@/Components/Dashboard/NotificationBell';
import { LayoutDashboard, Store, CalendarCheck, DollarSign } from 'lucide-react';

export default function SellerLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const navigation = [
        { name: 'Dashboard', href: route('seller.dashboard'), icon: LayoutDashboard },
        { name: 'My Businesses', href: route('seller.businesses'), icon: Store },
        { name: 'Bookings', href: route('seller.bookings'), icon: CalendarCheck },
        { name: 'Earnings', href: route('seller.earnings'), icon: DollarSign },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4 mb-4">
                            <ApplicationLogo className="block h-8 w-auto text-royalGold-500" />
                            <span className="ml-2 font-bold text-lg font-sansDisplay text-gray-900">Seller Portal</span>
                        </div>
                        <Sidebar items={navigation} theme="seller" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="md:pl-64 flex flex-col flex-1">
                <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none shadow-sm">
                    <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
                        <div className="flex-1 flex items-center">
                            <h1 className="text-xl font-semibold text-gray-900 font-sansDisplay">{header}</h1>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6 gap-4">
                            <NotificationBell unreadCount={0} />
                            
                            {/* Profile dropdown stub */}
                            <div className="relative">
                                <button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royalGold-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                                    <img className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${user.name}&color=7F9CF5&background=EBF4FF`} alt="" />
                                    <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                                        <span className="sr-only">Open user menu for </span>{user.name}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <main className="flex-1 pb-8">
                    <div className="mt-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
