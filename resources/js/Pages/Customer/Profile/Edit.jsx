import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { customerProfileService } from '@/Services/customerProfileService';
import CustomerPersonalInfoCard from '@/Components/Customer/CustomerPersonalInfoCard';
import ActiveBookings from './Partials/ActiveBookings';
import OrderHistory from './Partials/OrderHistory';
import WishlistGrid from './Partials/WishlistGrid';
import SecurityPreferences from './Partials/SecurityPreferences';
import { UserCircle, Calendar, ShoppingBag, Heart, Shield } from 'lucide-react';

export default function Edit({ auth }) {
    const [profile, setProfile] = useState(null);
    const [notifications, setNotifications] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [orders, setOrders] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('personal');

    useEffect(() => {
        const load = async () => {
            try {
                const data = await customerProfileService.fetchProfileData();
                setProfile(data.profile);
                setNotifications(data.notifications);
                setBookings(data.bookings);
                setOrders(data.orders);
                setWishlist(data.wishlist);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        load();

        const unsubscribe = customerProfileService.subscribe((p, n, b, o, w) => {
            setProfile(p);
            setNotifications(n);
            setBookings(b);
            setOrders(o);
            setWishlist(w);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading || !profile) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 animate-pulse space-y-6">
                        <div className="h-48 bg-slate-200 rounded-2xl"></div>
                        <div className="h-96 bg-slate-200 rounded-2xl"></div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    const tabs = [
        { id: 'personal', name: 'Personal & Travel Details', icon: UserCircle },
        { id: 'bookings', name: 'My Bookings & Trips', icon: Calendar },
        { id: 'orders', name: 'My Orders & Deliveries', icon: ShoppingBag },
        { id: 'wishlist', name: 'Saved Secret Places', icon: Heart },
        { id: 'security', name: 'Security & Notifications', icon: Shield },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-slate-800 leading-tight">My Account Center</h2>}
        >
            <Head title="My Profile - Secret Place Sri Lanka" />

            <div className="py-8 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Tab Navigation */}
                    <div className="mt-8 border-b border-slate-200 bg-white rounded-t-xl px-4 sm:px-6 overflow-x-auto hide-scrollbar">
                        <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm flex items-center transition-colors
                                        ${activeTab === tab.id
                                            ? 'border-forestGreen-600 text-forestGreen-700'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                        }
                                    `}
                                >
                                    <tab.icon className={`w-5 h-5 mr-2 ${activeTab === tab.id ? 'text-forestGreen-600' : 'text-slate-400'}`} />
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-6 bg-transparent">
                        {activeTab === 'personal' && (
                            <CustomerPersonalInfoCard userId={auth.user.id.toString()} />
                        )}
                        
                        {activeTab === 'bookings' && (
                            <ActiveBookings bookings={bookings} />
                        )}

                        {activeTab === 'orders' && (
                            <OrderHistory orders={orders} />
                        )}

                        {activeTab === 'wishlist' && (
                            <WishlistGrid wishlist={wishlist} />
                        )}

                        {activeTab === 'security' && (
                            <SecurityPreferences profile={profile} notifications={notifications} />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
