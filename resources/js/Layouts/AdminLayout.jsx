import React, { useState, useEffect, createContext, useContext } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Sidebar from '@/Components/Dashboard/Sidebar';
import NotificationBell from '@/Components/Dashboard/NotificationBell';
import { LayoutDashboard, Users, Store, CalendarCheck, CreditCard, Search, Globe, DollarSign, ShieldAlert } from 'lucide-react';
import { translations } from '@/translations';

export const AppContext = createContext();

export default function AdminLayout({ header, children }) {
    const user = usePage().props.auth.user || { name: 'Super Admin', email: 'admin@sps.lk' };
    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    
    // Initialize from localStorage if available
    const [currency, setCurrencyState] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('sps_admin_currency') || 'LKR';
        }
        return 'LKR';
    });
    
    const [language, setLanguageState] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('sps_admin_language') || 'English';
        }
        return 'English';
    });
    
    const setCurrency = (c) => {
        setCurrencyState(c);
        if (typeof window !== 'undefined') localStorage.setItem('sps_admin_currency', c);
    };
    
    const setLanguage = (l) => {
        setLanguageState(l);
        if (typeof window !== 'undefined') localStorage.setItem('sps_admin_language', l);
    };
    
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const [currDropdownOpen, setCurrDropdownOpen] = useState(false);
    
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.has('search')) {
            setSearchQuery(queryParams.get('search'));
        }
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            router.get(
                window.location.pathname,
                { search: searchQuery },
                { preserveState: true, preserveScroll: true }
            );
        }
    };

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

    const t = (text) => {
        if (translations[language] && translations[language][text]) {
            return translations[language][text];
        }
        return text;
    };

    const navigation = [
        { name: t('Dashboard'), href: route('admin.dashboard'), icon: LayoutDashboard },
        { name: t('Users & Roles'), href: route('admin.users'), icon: Users },
        { name: t('Merchant Hub'), href: route('admin.businesses'), icon: Store },
        { name: t('Operations'), href: route('admin.bookings'), icon: CalendarCheck },
        { name: t('Finance Engine'), href: route('admin.payments'), icon: CreditCard },
        { name: t('Security Logs'), href: route('admin.security-logs'), icon: ShieldAlert },
    ];

    return (
        <AppContext.Provider value={{ language, currency, t }}>
            <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar - Deep Slate Navy */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 bg-slate-900">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto border-r border-slate-800 shadow-xl">
                        <div className="flex items-center flex-shrink-0 px-4 mb-6">
                            <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center mr-3">
                                <span className="text-white font-bold font-sansDisplay text-lg">S</span>
                            </div>
                            <span className="font-bold text-lg font-sansDisplay text-white">{t('Super Admin')}</span>
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
                                        <Search className="h-5 w-5 text-slate-500" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="search"
                                        name="search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleSearch}
                                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-royalMaroon-500 focus:border-royalMaroon-500 sm:text-sm transition-colors shadow-sm"
                                        placeholder={t("Search Vendor ID, Booking ID, SKU...")}
                                        type="search"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6 gap-3 sm:gap-4">
                            {/* Language Dropdown */}
                            <div className="relative">
                                <button 
                                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 font-medium px-2 py-1 rounded-md hover:bg-gray-50 transition-colors focus:outline-none"
                                >
                                    <Globe className="w-4 h-4" />
                                    <span className="hidden sm:inline-block">{language}</span>
                                </button>
                                {langDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setLangDropdownOpen(false)}></div>
                                        <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 py-1">
                                            {['English', 'Sinhala', 'Tamil'].map(lang => (
                                                <button
                                                    key={lang}
                                                    onClick={() => { setLanguage(lang); setLangDropdownOpen(false); }}
                                                    className={`block w-full text-left px-4 py-2 text-sm ${language === lang ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                                                >
                                                    {lang}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            {/* Currency Dropdown */}
                            <div className="relative">
                                <button 
                                    onClick={() => setCurrDropdownOpen(!currDropdownOpen)}
                                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 font-medium px-2 py-1 rounded-md hover:bg-gray-50 transition-colors focus:outline-none"
                                >
                                    <DollarSign className="w-4 h-4" />
                                    <span>{currency}</span>
                                </button>
                                {currDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setCurrDropdownOpen(false)}></div>
                                        <div className="absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 py-1">
                                            {['LKR', 'USD', 'EUR', 'GBP'].map(curr => (
                                                <button
                                                    key={curr}
                                                    onClick={() => { setCurrency(curr); setCurrDropdownOpen(false); }}
                                                    className={`block w-full text-left px-4 py-2 text-sm ${currency === curr ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                                                >
                                                    {curr}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

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
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                            <div className="px-4 py-2 border-b border-gray-100 bg-slate-50 rounded-t-md">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            <Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 mt-1">
                                                {t('Platform Settings')}
                                            </Link>
                                            <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">
                                                {t('Sign Out')}
                                            </Link>
                                        </div>
                                    </>
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
                                    <h1 className="text-2xl font-bold text-slate-900 font-sansDisplay">{t(header)}</h1>
                                </div>
                            )}
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
        </AppContext.Provider>
    );
}
