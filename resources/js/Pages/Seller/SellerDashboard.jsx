import React, { useState } from 'react';
import { DashboardLayout } from '../../Layouts/DashboardLayout';
import { useAppState } from '../../Context/AppStateContext';
import { 
  Wallet, CalendarDays, Star, QrCode, 
  MapPin, Plus, MessageSquare
} from 'lucide-react';

export default function SellerDashboard() {
  const { convertPrice } = useAppState();
  const [scanResult, setScanResult] = useState(null);

  const stats = [
    { name: 'Total Earnings', value: convertPrice(850000), icon: Wallet, color: 'text-emerald-accent' },
    { name: 'Pending Escrow', value: convertPrice(45000), icon: Wallet, color: 'text-amber-badge' },
    { name: 'Upcoming Guests', value: '12', icon: CalendarDays, color: 'text-teal-highlight' },
    { name: 'Host Rating', value: '4.9 ★', icon: Star, color: 'text-yellow-400' },
  ];

  const bookings = [
    { id: 'SSL-2025-0891', guest: 'John Doe', dates: 'Oct 12 - Oct 14', guests: 2, status: 'Confirmed', escrow: 'Pending Arrival' },
    { id: 'SSL-2025-0892', guest: 'Sarah Smith', dates: 'Oct 15 - Oct 18', guests: 4, status: 'In Progress', escrow: 'Released' },
  ];

  const listings = [
    { id: 1, title: 'Bambarakanda Forest Lodge', status: 'Active', price: convertPrice(15000) + ' / night' },
    { id: 2, title: 'Secret Waterfall Camp', status: 'Pending Approval', price: convertPrice(8000) + ' / person' },
  ];

  const handleScan = (e) => {
    e.preventDefault();
    // Simulate check-in
    setScanResult('Check-in successful! Escrow release triggered.');
    setTimeout(() => setScanResult(null), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-sansDisplay font-bold text-white">Local Host Portal</h1>
            <p className="mt-1 text-sm text-gray-400">Manage your secret spots, guests, and check-ins.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-ceylon-950 bg-emerald-accent hover:bg-emerald-400">
              <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Secret Place
            </button>
          </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Bookings & Availability */}
            <div className="bg-ceylon-800 rounded-3xl shadow border border-ceylon-700 overflow-hidden">
              <div className="px-6 py-5 border-b border-ceylon-700">
                <h3 className="text-lg leading-6 font-medium text-white flex items-center">
                  <CalendarDays className="w-5 h-5 mr-2 text-teal-highlight" />
                  Upcoming Bookings
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-ceylon-700">
                  <thead className="bg-ceylon-900">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ref</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Guest</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Dates</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody className="bg-ceylon-800 divide-y divide-ceylon-700">
                    {bookings.map((b) => (
                      <tr key={b.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{b.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{b.guest}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{b.dates}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-emerald-accent hover:text-emerald-400">
                            <MessageSquare className="w-5 h-5 inline-block" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* My Listings */}
            <div className="bg-ceylon-800 rounded-3xl shadow border border-ceylon-700 overflow-hidden">
              <div className="px-6 py-5 border-b border-ceylon-700">
                <h3 className="text-lg leading-6 font-medium text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-amber-badge" />
                  My Secret Spots
                </h3>
              </div>
              <ul className="divide-y divide-ceylon-700 px-6">
                {listings.map((l) => (
                  <li key={l.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{l.title}</p>
                      <p className="text-sm text-gray-400">{l.price}</p>
                    </div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${l.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {l.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            
            {/* QR Scanner Simulator */}
            <div className="bg-ceylon-800 rounded-3xl shadow p-6 border border-ceylon-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
                <QrCode className="w-48 h-48 text-emerald-accent" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 relative z-10">Arrival Station</h3>
              <p className="text-sm text-gray-400 mb-4 relative z-10">
                Scan guest QR Pass or enter voucher code to verify arrival and release escrow.
              </p>
              
              <form onSubmit={handleScan} className="relative z-10 space-y-4">
                <input 
                  type="text" 
                  placeholder="e.g. SSL-2025-0891" 
                  className="w-full rounded-xl bg-ceylon-900 border-ceylon-600 text-white placeholder-gray-500 focus:ring-emerald-accent focus:border-emerald-accent"
                  required
                />
                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-xl text-ceylon-950 bg-emerald-accent hover:bg-emerald-400">
                  <QrCode className="w-4 h-4 mr-2" />
                  Verify Check-In
                </button>
              </form>

              {scanResult && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/50 text-emerald-400 text-sm text-center relative z-10">
                  {scanResult}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
