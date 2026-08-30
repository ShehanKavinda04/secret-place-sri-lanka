import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Sidebar from '@/Components/Dashboard/Sidebar';
import NotificationBell from '@/Components/Dashboard/NotificationBell';
import { LayoutDashboard, Users, Store, CalendarCheck, CreditCard } from 'lucide-react';

export default function AdminLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (window.Echo) {
            window.Echo.channel('admin-notifications')
                .listen('AdminNotificationEvent', (e) => {
                    setNotifications(prev => [{
                        id: Date.now(),
                        title: e.title,
                        message: e.message,
                        time: 'Just now'
                    }, ...prev]);
                    setUnreadCount(prev => prev + 1);
                });
        }
        return () => {
            if (window.Echo) window.Echo.leaveChannel('admin-notifications');
        }
    }, []);

    const navigation = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard },
        { name: 'Users', href: route('admin.users'), icon: Users },
        { name: 'Businesses', href: route('admin.businesses'), icon: Store },
        { name: 'Bookings', href: route('admin.bookings'), icon: CalendarCheck },
        { name: 'Payments', href: route('admin.payments'), icon: CreditCard },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 bg-royalMaroon-950">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto border-r border-royalMaroon-900 shadow-xl">
                        <div className="flex items-center flex-shrink-0 px-4 mb-4">
                            <ApplicationLogo className="block h-8 w-auto text-royalGold-400" />
                            <span className="ml-2 font-bold text-lg font-sansDisplay text-white">Trust & Safety</span>
                        </div>
                        <Sidebar items={navigation} theme="admin" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="md:pl-64 flex flex-col flex-1">
                <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
                    <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
                        <div className="flex-1 flex items-center">
                            <h1 className="text-2xl font-semibold text-gray-900 font-sansDisplay">{header}</h1>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6 gap-4">
                            <NotificationBell 
                                unreadCount={unreadCount} 
                                notifications={notifications} 
                                onOpen={() => setUnreadCount(0)} 
                            />
                            
                            {/* Profile dropdown */}
                            <div className="relative">
                                <button 
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royalMaroon-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                                >
                                    <img className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${user.name}&color=7F9CF5&background=EBF4FF`} alt="" />
                                    <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                                        <span className="sr-only">Open user menu for </span>{user.name}
                                    </span>
                                </button>
                                {profileOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Profile Settings
                                        </Link>
                                        <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Sign Out
                                        </Link>
                                    </div>
                                )}
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
