import React, { useState } from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head } from '@inertiajs/react';
import HospitalityKPIs from './Components/HospitalityKPIs';
import ListingManager from './Components/ListingManager';
import ReservationEngine from './Components/ReservationEngine';
import FinancialLedger from './Components/FinancialLedger';
import ReviewSentiment from './Components/ReviewSentiment';
import { LayoutDashboard, Home, Calendar, DollarSign, MessageSquare } from 'lucide-react';

export default function Overview({ stats }) {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'listings', name: 'Listings', icon: Home },
        { id: 'reservations', name: 'Reservations', icon: Calendar },
        { id: 'financials', name: 'Financials', icon: DollarSign },
        { id: 'reviews', name: 'Reviews', icon: MessageSquare },
    ];

    return (
        <SellerLayout header="Host Portal">
            <Head title="Host Dashboard - Secret Place Sri Lanka" />

            <div className="bg-white px-2 py-2 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-2 mb-6">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ease-in-out
                            ${activeTab === tab.id 
                                ? 'bg-[#1B4D3E] text-white shadow-md shadow-[#1B4D3E]/20' 
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                            }
                        `}
                    >
                        <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`} />
                        {tab.name}
                    </button>
                ))}
            </div>

            <div className="mt-4">
                {activeTab === 'overview' && <HospitalityKPIs stats={stats} />}
                {activeTab === 'listings' && <ListingManager />}
                {activeTab === 'reservations' && <ReservationEngine />}
                {activeTab === 'financials' && <FinancialLedger />}
                {activeTab === 'reviews' && <ReviewSentiment />}
            </div>
        </SellerLayout>
    );
}
