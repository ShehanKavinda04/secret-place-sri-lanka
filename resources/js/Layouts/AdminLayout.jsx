import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Sidebar from '@/Components/Dashboard/Sidebar';
import NotificationBell from '@/Components/Dashboard/NotificationBell';
import { LayoutDashboard, Users, Store, CalendarCheck, CreditCard, Search, Globe, DollarSign, ShieldAlert } from 'lucide-react';

export default function AdminLayout({ header, children }) {
    const user = usePage().props.auth.user || { name: 'Super Admin', email: 'admin@sps.lk' };
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [currency, setCurrency] = useState('LKR');
    const [language, setLanguage] = useState('English');

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
        { name: 'Users & Roles', href: route('admin.users'), icon: Users },
        { name: 'Merchant Hub', href: route('admin.businesses'), icon: Store },
        { name: 'Operations', href: route('admin.bookings'), icon: CalendarCheck },
        { name: 'Finance Engine', href: route('admin.payments'), icon: CreditCard },
        { name: 'Security Logs', href: route('admin.security-logs'), icon: ShieldAlert },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar - Deep Slate Navy */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 bg-slate-900">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto border-r border-slate-800 shadow-xl">
                        <div className="flex items-center flex-shrink-0 px-4 mb-6">
                            <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center mr-3">
                                <span className="text-white font-bold font-sansDisplay text-lg">S</span>
                            </div>
                            <span className="font-bold text-lg font-sansDisplay text-white">Super Admin</span>
                        </div>
                        <Sidebar items={navigation} theme="dark" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="md:pl-64 flex flex-col flex-1">
                <div className="sticky top-0 z-20 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
                    <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
                        <div className="flex-1 flex items-center">
                            {/* Multi-Search Bar */}
                            <div className="w-full max-w-lg lg:max-w-xs relative">
                                <label htmlFor="search" className="sr-only">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="search"
                                        name="search"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                        placeholder="Search Vendor ID, Booking ID, SKU..."
                                        type="search"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6 gap-3 sm:gap-4">
                            {/* Language Toggle */}
                            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 font-medium px-2 py-1 rounded-md hover:bg-gray-50 transition-colors">
                                <Globe className="w-4 h-4" />
                                <span className="hidden sm:inline-block">{language}</span>
                            </button>
                            
                            {/* Currency Toggle */}
                            <button 
                                onClick={() => setCurrency(c => c === 'LKR' ? 'USD' : 'LKR')}
                                className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 font-medium px-2 py-1 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                <DollarSign className="w-4 h-4" />
                                <span>{currency}</span>
                            </button>

                            <div className="h-6 w-px bg-gray-200 mx-1"></div>

                            <NotificationBell 
                                unreadCount={unreadCount} 
                                notifications={notifications} 
                                onOpen={() => setUnreadCount(0)} 
                            />
                            
                            {/* Profile dropdown */}
                            <div className="relative">
                                <button 
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                                >
                                    <img className="h-8 w-8 rounded-full border border-gray-200" src={`https://ui-avatars.com/api/?name=${user.name}&color=4F46E5&background=EEF2FF`} alt="" />
                                    <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                                        <span className="sr-only">Open user menu for </span>{user.name}
                                    </span>
                                </button>
                                {profileOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                        <div className="px-4 py-2 border-b border-gray-100 bg-slate-50 rounded-t-md">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 mt-1">
                                            Platform Settings
                                        </Link>
                                        <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">
                                            Sign Out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                <main className="flex-1 pb-12">
                    <div className="mt-6">
                        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                            {header && (
                                <div className="mb-6">
                                    <h1 className="text-2xl font-bold text-slate-900 font-sansDisplay">{header}</h1>
                                </div>
                            )}
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
