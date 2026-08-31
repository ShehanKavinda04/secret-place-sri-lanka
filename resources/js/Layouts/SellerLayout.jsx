import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { 
    LayoutDashboard, 
    Home, 
    Calendar, 
    DollarSign, 
    MessageSquare, 
    Bell, 
    Globe, 
    ChevronDown, 
    Building, 
    Menu, 
    X, 
    Settings
} from 'lucide-react';

export default function SellerLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [propertyOpen, setPropertyOpen] = useState(false);
    const [currency, setCurrency] = useState('LKR');
    const [language, setLanguage] = useState('EN');

    const navigation = [
        { name: 'Dashboard', href: route('seller.dashboard'), icon: LayoutDashboard },
        { name: 'Property Listings', href: route('seller.businesses'), icon: Home },
        { name: 'Reservations', href: route('seller.bookings'), icon: Calendar },
        { name: 'Financials', href: route('seller.earnings'), icon: DollarSign },
        { name: 'Guest Reviews', href: '#', icon: MessageSquare },
    ];

    const currentRoute = route().current();

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-[#D97706]/30 selection:text-[#D97706] flex flex-col md:flex-row">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/50 md:hidden" 
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-[#1B4D3E] text-white shadow-xl transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-20 px-6 bg-[#143d31]">
                        <div className="flex items-center gap-3">
                            <ApplicationLogo className="w-10 h-10 text-[#D97706]" />
                            <div>
                                <span className="block font-bold text-lg font-sansDisplay leading-tight">Host Portal</span>
                                <span className="block text-xs text-emerald-200/70">Secret Place Sri Lanka</span>
                            </div>
                        </div>
                        <button className="md:hidden text-emerald-200 hover:text-white" onClick={() => setSidebarOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="px-6 py-6 border-b border-[#143d31]">
                        <div className="relative">
                            <button 
                                onClick={() => setPropertyOpen(!propertyOpen)}
                                className="w-full flex items-center justify-between bg-[#143d31] p-3 rounded-xl hover:bg-[#11352a] transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#D97706]/20 rounded-lg text-[#D97706]">
                                        <Building className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-white truncate">Ella Eco Cabin</p>
                                        <p className="text-xs text-emerald-200">Active Property</p>
                                    </div>
                                </div>
                                <ChevronDown className="w-4 h-4 text-emerald-300" />
                            </button>
                            
                            {propertyOpen && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                                    <button className="w-full text-left px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 flex items-center justify-between font-medium">
                                        Ella Eco Cabin
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    </button>
                                    <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 border-t border-gray-100">
                                        Knuckles Tent Camp
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = currentRoute === item.href.split('/').pop() || (currentRoute === 'seller.dashboard' && item.name === 'Dashboard');
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                        ${isActive 
                                            ? 'bg-[#D97706] text-white font-medium shadow-md shadow-[#D97706]/20' 
                                            : 'text-emerald-100/80 hover:bg-[#143d31] hover:text-white'
                                        }
                                    `}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-emerald-200/70'}`} />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="p-4 mt-auto">
                        <Link href={route('profile.edit')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-100/80 hover:bg-[#143d31] hover:text-white transition-colors">
                            <Settings className="w-5 h-5 text-emerald-200/70" />
                            Settings
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900 font-sansDisplay hidden sm:block">{header}</h1>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Currency Toggle */}
                        <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
                            <button 
                                onClick={() => setCurrency('LKR')}
                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${currency === 'LKR' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                LKR
                            </button>
                            <button 
                                onClick={() => setCurrency('USD')}
                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${currency === 'USD' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                USD
                            </button>
                        </div>

                        {/* Language Toggle */}
                        <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
                            {['EN', 'SI', 'TA'].map(lang => (
                                <button 
                                    key={lang}
                                    onClick={() => setLanguage(lang)}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${language === lang ? 'bg-[#1B4D3E] shadow text-white' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>

                        {/* Notification Bell */}
                        <button className="relative p-2 text-gray-400 hover:text-[#D97706] transition-colors rounded-full hover:bg-orange-50">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        {/* User Menu */}
                        <div className="relative ml-2">
                            <button 
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2 focus:outline-none"
                            >
                                <img 
                                    className="h-10 w-10 rounded-full border-2 border-[#1B4D3E]/20 object-cover" 
                                    src={`https://ui-avatars.com/api/?name=${user.name}&color=1B4D3E&background=F8FAFC&bold=true`} 
                                    alt="Host Avatar" 
                                />
                                <div className="hidden lg:block text-left">
                                    <p className="text-sm font-bold text-gray-900 leading-tight">{user.name}</p>
                                    <p className="text-xs text-gray-500 font-medium">Verified Host</p>
                                </div>
                                <ChevronDown className="hidden lg:block w-4 h-4 text-gray-400" />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                    <Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1B4D3E]">
                                        Account Settings
                                    </Link>
                                    <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">
                                        Secure Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="sm:hidden mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 font-sansDisplay">{header}</h1>
                        </div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
