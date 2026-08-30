import React, { useState } from 'react';
import { DashboardLayout } from '../../Layouts/DashboardLayout';
import { useAppState } from '../../Context/AppStateContext';
import { 
  Search, SlidersHorizontal, MapPin, 
  Heart, Calendar, QrCode, Sparkles
} from 'lucide-react';

export default function CustomerDashboard() {
  const { convertPrice } = useAppState();
  
  const categories = [
    'All', 'Waterfalls', 'Eco Lodges', 'Cultural Homestays', 'Ancient Ruins', 'Secret Beaches'
  ];

  const places = [
    { 
      id: 1, 
      title: 'Bambarakanda Forest Lodge', 
      location: 'Badulla/Ella', 
      price: 15000, 
      rating: 4.9, 
      reviews: 128,
      seclusion: 'High',
      image: 'https://images.unsplash.com/photo-1544281679-052309dafbba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 2, 
      title: 'Ritigala Ancient Retreat', 
      location: 'Anuradhapura', 
      price: 8000, 
      rating: 4.8, 
      reviews: 84,
      seclusion: 'Very High',
      image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 3, 
      title: 'Secret Cove Glamping', 
      location: 'Galle', 
      price: 25000, 
      rating: 5.0, 
      reviews: 42,
      seclusion: 'Ultra Secret',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
  ];

  const trips = [
    { id: 'SSL-2025-0891', title: 'Bambarakanda Weekend', date: 'Oct 12 - Oct 14', status: 'Upcoming' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Header & Search */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-sansDisplay font-bold text-white tracking-tight">Discover Hidden Ceylon</h1>
            <p className="mt-1 text-sm text-gray-400">Find secluded waterfalls, cloud forests, and sacred ruins.</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative rounded-full shadow-sm w-full md:w-64 lg:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input 
                type="text" 
                placeholder="Where to next?" 
                className="focus:ring-emerald-accent focus:border-emerald-accent block w-full pl-10 sm:text-sm border-ceylon-700 bg-ceylon-800 rounded-full text-white placeholder-gray-400 py-3"
              />
            </div>
            <button className="p-3 rounded-full bg-ceylon-800 border border-ceylon-700 text-gray-400 hover:text-white hover:bg-ceylon-700 transition">
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, idx) => (
            <button 
              key={cat}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                idx === 0 
                  ? 'bg-emerald-accent text-ceylon-950 border-emerald-accent' 
                  : 'bg-ceylon-800 text-gray-300 border-ceylon-700 hover:bg-ceylon-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Content Area: Listings */}
          <div className="xl:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {places.map((place) => (
                <div key={place.id} className="bg-ceylon-800 rounded-3xl overflow-hidden border border-ceylon-700 hover:border-emerald-500/50 transition group cursor-pointer">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={place.image} 
                      alt={place.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <button className="p-2 rounded-full bg-ceylon-950/50 backdrop-blur-sm text-gray-300 hover:text-rose-accent hover:bg-ceylon-950/80 transition">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-1 bg-ceylon-950/70 backdrop-blur-md rounded-lg text-xs font-medium text-amber-300 border border-amber-500/30">
                        {place.seclusion} Seclusion
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white leading-tight mb-1">{place.title}</h3>
                        <p className="text-sm text-gray-400 flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-emerald-accent" />
                          {place.location}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 text-sm font-medium text-white">
                        <span className="text-yellow-400">★</span>
                        <span>{place.rating}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-end border-t border-ceylon-700 pt-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Starting at</p>
                        <p className="text-lg font-bold text-emerald-400">{convertPrice(place.price)} <span className="text-sm font-normal text-gray-400">/ night</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* My Trips & QR */}
            <div className="bg-ceylon-800 rounded-3xl shadow p-6 border border-ceylon-700">
              <h2 className="text-lg font-medium text-white mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-teal-highlight" />
                My Trips
              </h2>
              <div className="space-y-4">
                {trips.map(trip => (
                  <div key={trip.id} className="p-4 bg-ceylon-900 rounded-2xl border border-ceylon-700 flex justify-between items-center group cursor-pointer hover:border-emerald-500/50">
                    <div>
                      <p className="text-sm font-bold text-white">{trip.title}</p>
                      <p className="text-xs text-gray-400">{trip.date}</p>
                    </div>
                    <div className="bg-ceylon-800 p-2 rounded-xl text-emerald-accent group-hover:bg-emerald-accent group-hover:text-ceylon-950 transition">
                      <QrCode className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Concierge Widget */}
            <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 rounded-3xl p-6 border border-emerald-500/30 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-20">
                <Sparkles className="w-40 h-40 text-emerald-300" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2 relative z-10 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-emerald-400" />
                Ceylon AI Concierge
              </h2>
              <p className="text-sm text-emerald-100/70 mb-4 relative z-10">
                Ask about monsoon windows, leech protection, or sacred forest dress codes.
              </p>
              <button className="w-full relative z-10 flex justify-center items-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-xl text-ceylon-950 bg-emerald-accent hover:bg-emerald-400 transition-colors">
                Chat with Concierge
              </button>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
