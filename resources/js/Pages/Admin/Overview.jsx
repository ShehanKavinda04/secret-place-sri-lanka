import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { LayoutDashboard, Store, Map, CreditCard, ShoppingBag, ShieldCheck } from 'lucide-react';

import ExecutiveKPIs from './Components/ExecutiveKPIs';
import MerchantOnboardingHub from './Components/MerchantOnboardingHub';
import CatalogModeration from './Components/CatalogModeration';
import FinancialEngine from './Components/FinancialEngine';
import OperationsMonitor from './Components/OperationsMonitor';
import SecurityCompliance from './Components/SecurityCompliance';

export default function Overview({ stats, pendingApprovals = [], kpiData, catalogData = [], financeData, operationsData = [], securityData }) {
    const [activeTab, setActiveTab] = useState('kpi');

    const tabs = [
        { id: 'kpi', name: 'Executive KPIs', icon: LayoutDashboard },
        { id: 'onboarding', name: 'Onboarding Hub', icon: Store },
        { id: 'catalog', name: 'Catalog & Maps', icon: Map },
        { id: 'finance', name: 'Financial Engine', icon: CreditCard },
        { id: 'operations', name: 'Operations Monitor', icon: ShoppingBag },
        { id: 'security', name: 'Security & Broadcast', icon: ShieldCheck },
    ];

    return (
        <AdminLayout header="Super Admin Control Center">
            <Head title="Super Admin Dashboard" />

            <div className="mb-8 overflow-x-auto border-b border-gray-200">
                <nav className="flex space-x-8 min-w-max px-2" aria-label="Tabs">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                    ${isActive 
                                        ? 'border-indigo-500 text-indigo-600' 
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                `}
                            >
                                <Icon className={`
                                    -ml-0.5 mr-2 h-5 w-5 
                                    ${isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'}
                                `} />
                                <span>{tab.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="min-h-[600px]">
                {activeTab === 'kpi' && <ExecutiveKPIs initialData={kpiData} />}
                {activeTab === 'onboarding' && <MerchantOnboardingHub initialData={pendingApprovals} />}
                {activeTab === 'catalog' && <CatalogModeration initialData={catalogData} />}
                {activeTab === 'finance' && <FinancialEngine initialData={financeData} />}
                {activeTab === 'operations' && <OperationsMonitor initialData={operationsData} />}
                {activeTab === 'security' && <SecurityCompliance initialData={securityData} />}
            </div>
        </AdminLayout>
    );
}

