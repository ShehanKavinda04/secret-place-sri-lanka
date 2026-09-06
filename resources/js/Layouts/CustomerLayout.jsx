import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Bell, Calendar, ChevronDown, Heart, LayoutDashboard, Menu, ShoppingBag, UserCircle, X } from 'lucide-react';

export default function CustomerLayout({ header, children }) {
    const { url } = usePage();
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [currency, setCurrency] = useState('LKR');
    const [language, setLanguage] = useState('EN');
    const [unreadCount, setUnreadCount] = useState(0);

    const navigation = [
        { name: 'Dashboard', href: route('customer.dashboard'), routeName: 'customer.dashboard', icon: LayoutDashboard },
        { name: 'My Bookings', href: route('customer.bookings'), routeName: 'customer.bookings', icon: Calendar },
        { name: 'My Orders', href: route('customer.orders'), routeName: 'customer.orders', icon: ShoppingBag },
        { name: 'Wishlist', href: route('customer.wishlist'), routeName: 'customer.wishlist', icon: Heart },
        { name: 'My Profile', href: route('customer.profile'), routeName: 'customer.profile', icon: UserCircle },
    ];

    useEffect(() => {
        if (!window.Echo) return undefined;
        window.Echo.channel('admin-notifications').listen('AdminNotificationEvent', () => {
            setUnreadCount((previous) => previous + 1);
        });
        return () => window.Echo.leaveChannel('admin-notifications');
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col md:flex-row">
            {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1B4D3E] text-white shadow-xl transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-20 px-6 bg-[#143d31]">
                        <div className="flex items-center gap-3"><ApplicationLogo className="w-10 h-10 text-[#D97706]" /><div><span className="block font-bold text-lg font-sansDisplay leading-tight">Customer Portal</span><span className="block text-xs text-emerald-200/70">Secret Place Sri Lanka</span></div></div>
                        <button className="md:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X className="w-6 h-6" /></button>
                    </div>
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = route().current(item.routeName) || url === item.href;
                            return <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-[#D97706] text-white font-medium shadow-md' : 'text-emerald-100/80 hover:bg-[#143d31] hover:text-white'}`}><item.icon className="w-5 h-5" />{item.name}</Link>;
                        })}
                    </nav>
                </div>
            </aside>
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 sticky top-0">
                    <div className="flex items-center gap-4"><button className="md:hidden p-2 -ml-2 text-gray-500" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu className="w-6 h-6" /></button><h1 className="text-2xl font-bold text-gray-900 font-sansDisplay hidden sm:block">{header}</h1></div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">{['LKR', 'USD'].map((item) => <button key={item} onClick={() => setCurrency(item)} className={`px-3 py-1.5 text-xs font-bold rounded-md ${currency === item ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>{item}</button>)}</div>
                        <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">{['EN', 'SI', 'TA'].map((item) => <button key={item} onClick={() => setLanguage(item)} className={`px-3 py-1.5 text-xs font-bold rounded-md ${language === item ? 'bg-[#1B4D3E] text-white' : 'text-gray-500'}`}>{item}</button>)}</div>
                        <button className="relative p-2 text-gray-400 hover:text-[#D97706]" onClick={() => setUnreadCount(0)} aria-label="Notifications"><Bell className="w-6 h-6" />{unreadCount > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />}</button>
                        <div className="relative ml-2"><button onClick={() => setProfileOpen((previous) => !previous)} className="flex items-center gap-2"><span className="h-10 w-10 rounded-full border-2 border-[#1B4D3E]/20 flex items-center justify-center text-[#1B4D3E] font-bold">{user?.name?.charAt(0)}</span><div className="hidden lg:block text-left"><p className="text-sm font-bold text-gray-900">{user?.name}</p><p className="text-xs text-gray-500">Customer</p></div><ChevronDown className="hidden lg:block w-4 h-4 text-gray-400" /></button>{profileOpen && <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"><Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Account Settings</Link><Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Log Out</Link></div>}</div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto"><div className="p-4 sm:p-6 lg:p-8"><div className="sm:hidden mb-6"><h1 className="text-2xl font-bold text-gray-900 font-sansDisplay">{header}</h1></div>{children}</div></main>
            </div>
        </div>
    );
}
