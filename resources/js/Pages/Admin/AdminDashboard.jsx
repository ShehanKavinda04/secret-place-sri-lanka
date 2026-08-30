import React from 'react';
import { DashboardLayout } from '../../Layouts/DashboardLayout';
import { useAppState } from '../../Context/AppStateContext';
import { 
  TrendingUp, Users, MapPin, ShieldAlert, 
  CheckCircle, XCircle, Banknote, AlertTriangle
} from 'lucide-react';

export default function AdminDashboard() {
  const { convertPrice } = useAppState();
  
  // Mock Data
  const stats = [
    { name: 'Gross Booking Volume (GMV)', value: convertPrice(12500000), icon: TrendingUp, color: 'text-emerald-accent' },
    { name: '12% Platform Commission', value: convertPrice(1500000), icon: Banknote, color: 'text-teal-highlight' },
    { name: 'Active Listings', value: '1,429', icon: MapPin, color: 'text-blue-400' },
    { name: 'Verified Hosts', value: '384', icon: Users, color: 'text-amber-badge' },
  ];

  const pendingListings = [
    { id: 1, title: 'Bambarakanda Forest Lodge', host: 'Nimal S.', district: 'Badulla/Ella', type: 'eco_lodge' },
    { id: 2, title: 'Ritigala Ancient Retreat', host: 'Kasun W.', district: 'Anuradhapura', type: 'cultural_homestay' },
  ];

  const escrowFunds = [
    { id: 'SSL-2025-0891', host: 'Saman T.', bank: 'Commercial Bank', amount: convertPrice(45000), status: 'Ready to clear' },
    { id: 'SSL-2025-0892', host: 'Ruwan K.', bank: 'HNB', amount: convertPrice(25000), status: 'Ready to clear' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-sansDisplay font-bold text-white">Platform Trust Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">Manage listings, hosts, escrow payouts, and safety advisories.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.name} className="relative bg-ceylon-800 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-2xl overflow-hidden border border-ceylon-700">
              <dt>
                <div className={`absolute bg-ceylon-900 rounded-xl p-3 ${item.color}`}>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-400 truncate">{item.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-white">{item.value}</p>
              </dd>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Moderation Queue */}
          <div className="bg-ceylon-800 rounded-3xl shadow p-6 border border-ceylon-700">
            <h2 className="text-lg font-medium text-white mb-4 flex items-center">
              <ShieldAlert className="w-5 h-5 mr-2 text-amber-badge" />
              Listing Moderation Queue
            </h2>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-ceylon-700">
                {pendingListings.map((listing) => (
                  <li key={listing.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{listing.title}</p>
                      <p className="text-sm text-gray-400">{listing.district} &bull; {listing.type}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-full text-emerald-accent bg-emerald-accent/10 hover:bg-emerald-accent/20">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-full text-rose-accent bg-rose-accent/10 hover:bg-rose-accent/20">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <button className="w-full flex justify-center items-center px-4 py-2 border border-ceylon-600 shadow-sm text-sm font-medium rounded-xl text-white bg-ceylon-900 hover:bg-ceylon-700">
                View All Pending
              </button>
            </div>
          </div>

          {/* Escrow Settlement */}
          <div className="bg-ceylon-800 rounded-3xl shadow p-6 border border-ceylon-700">
            <h2 className="text-lg font-medium text-white mb-4 flex items-center">
              <Banknote className="w-5 h-5 mr-2 text-teal-highlight" />
              Escrow Settlement Desk
            </h2>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-ceylon-700">
                {escrowFunds.map((fund) => (
                  <li key={fund.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{fund.id}</p>
                      <p className="text-sm text-gray-400">{fund.host} &bull; {fund.bank}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{fund.amount}</p>
                      <button className="mt-1 text-xs text-emerald-accent font-medium hover:text-emerald-400">
                        Release Funds
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <button className="w-full flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-xl text-ceylon-950 bg-teal-highlight hover:bg-teal-400">
                Batch Bank Disbursement
              </button>
            </div>
          </div>

        </div>

        {/* Safety Broadcast */}
        <div className="bg-rose-900/20 rounded-3xl p-6 border border-rose-900/50">
          <h2 className="text-lg font-medium text-rose-400 mb-2 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Dispute Resolution & Wilderness Safety Center
          </h2>
          <p className="text-sm text-rose-200/70 mb-4">
            Broadcast regional weather/monsoon advisories across the platform.
          </p>
          <div className="flex items-center space-x-4">
            <input 
              type="text" 
              placeholder="Enter advisory message..." 
              className="flex-1 rounded-xl bg-ceylon-900 border-ceylon-700 text-white placeholder-gray-500 focus:ring-rose-500 focus:border-rose-500"
            />
            <select className="rounded-xl bg-ceylon-900 border-ceylon-700 text-white focus:ring-rose-500 focus:border-rose-500">
              <option>All Districts</option>
              <option>Nuwara Eliya</option>
              <option>Badulla</option>
            </select>
            <button className="px-6 py-2 bg-rose-accent text-white font-medium rounded-xl hover:bg-rose-500 shadow-sm">
              Broadcast
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
