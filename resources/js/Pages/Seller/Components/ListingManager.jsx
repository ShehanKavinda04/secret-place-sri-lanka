import React, { useState } from 'react';
import { Plus, Image as ImageIcon, MapPin, Check, Calendar as CalendarIcon, Tag, Edit, Trash2 } from 'lucide-react';

export default function ListingManager() {
    const [activeTab, setActiveTab] = useState('rooms');

    const rooms = [
        { id: 1, name: 'Deluxe Eco Cabin', type: 'Eco-Cabin', price: 'LKR 15,000', status: 'Active', image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=200&auto=format&fit=crop' },
        { id: 2, name: 'Family Treehouse', type: 'Treehouse', price: 'LKR 22,000', status: 'Active', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=200&auto=format&fit=crop' },
        { id: 3, name: 'Secret Guided Waterfall Trek', type: 'Experience', price: 'LKR 5,000', status: 'Draft', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=200&auto=format&fit=crop' }
    ];

    const amenities = [
        { name: 'Free High-Speed Wi-Fi', category: 'Basic', checked: true },
        { name: 'Organic Breakfast Included', category: 'Food', checked: true },
        { name: 'Solar Heated Water', category: 'Eco', checked: true },
        { name: 'Guided Jungle Trekking', category: 'Activities', checked: true },
        { name: 'Air Conditioning', category: 'Basic', checked: false },
        { name: 'Private Plunge Pool', category: 'Luxury', checked: false }
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 font-sansDisplay">Inventory & Listings</h2>
                    <p className="text-sm text-gray-500">Manage your rooms, experiences, and seasonal pricing.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-[#D97706] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#b56305] transition-colors shadow-sm">
                    <Plus className="w-5 h-5" />
                    Add New Listing
                </button>
            </div>

            {/* Sub-Tabs */}
            <div className="flex space-x-2 border-b border-gray-200 mb-6 overflow-x-auto pb-px">
                {['rooms', 'pricing', 'amenities', 'gallery'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors whitespace-nowrap
                            ${activeTab === tab 
                                ? 'border-[#1B4D3E] text-[#1B4D3E]' 
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }
                        `}
                    >
                        {tab === 'rooms' && 'Catalog'}
                        {tab === 'pricing' && 'Dynamic Pricing'}
                        {tab === 'amenities' && 'Amenities'}
                        {tab === 'gallery' && 'Media Gallery'}
                    </button>
                ))}
            </div>

            {/* Catalog Tab */}
            {activeTab === 'rooms' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map(room => (
                        <div key={room.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="relative h-48 overflow-hidden">
                                <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-gray-900 shadow-sm">
                                    {room.price} <span className="text-gray-500 font-medium">/ night</span>
                                </div>
                                <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-bold text-white shadow-sm
                                    ${room.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-500'}
                                `}>
                                    {room.status}
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-semibold text-[#D97706] bg-orange-50 px-2 py-0.5 rounded-full">{room.type}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">{room.name}</h3>
                                <div className="flex items-center gap-2">
                                    <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-xl text-sm font-medium transition-colors border border-gray-200">
                                        <Edit className="w-4 h-4" /> Edit
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Dynamic Pricing Tab */}
            {activeTab === 'pricing' && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Seasonal Rate Adjustments</h3>
                            <p className="text-sm text-gray-500 mb-6">Set your base rates and add rules for high season, weekends, and holidays.</p>
                            
                            <div className="space-y-4">
                                <div className="p-4 border border-emerald-100 bg-emerald-50 rounded-xl flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 flex items-center gap-2"><Tag className="w-4 h-4 text-emerald-600" /> Winter Peak (Dec - Feb)</h4>
                                        <p className="text-xs text-gray-600 mt-1">Applies +25% to base rate</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B4D3E]"></div>
                                    </label>
                                </div>
                                <div className="p-4 border border-orange-100 bg-orange-50 rounded-xl flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 flex items-center gap-2"><Tag className="w-4 h-4 text-orange-600" /> Weekend Premium</h4>
                                        <p className="text-xs text-gray-600 mt-1">Applies +10% on Fri & Sat</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B4D3E]"></div>
                                    </label>
                                </div>
                                <div className="p-4 border border-gray-100 rounded-xl flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 flex items-center gap-2"><Tag className="w-4 h-4 text-gray-400" /> Last Minute Discount</h4>
                                        <p className="text-xs text-gray-600 mt-1">-15% if booked within 24h</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B4D3E]"></div>
                                    </label>
                                </div>
                                <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm font-semibold text-gray-600 hover:border-[#1B4D3E] hover:text-[#1B4D3E] transition-colors">
                                    + Create New Rule
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center text-center">
                            <CalendarIcon className="w-12 h-12 text-gray-300 mb-4" />
                            <h4 className="font-bold text-gray-700 mb-2">Calendar Sync Active</h4>
                            <p className="text-sm text-gray-500 mb-4 max-w-xs">Your rates and availability are syncing via Channel Manager with Booking.com and Airbnb.</p>
                            <button className="text-sm font-semibold text-[#D97706] hover:underline">View Sync Logs</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Amenities Tab */}
            {activeTab === 'amenities' && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Property Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {amenities.map((item, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border flex items-start gap-3 transition-colors cursor-pointer ${item.checked ? 'border-[#1B4D3E] bg-[#1B4D3E]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                                <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${item.checked ? 'bg-[#1B4D3E] border-[#1B4D3E]' : 'border-gray-300'}`}>
                                    {item.checked && <Check className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <div>
                                    <p className={`text-sm font-semibold ${item.checked ? 'text-[#1B4D3E]' : 'text-gray-700'}`}>{item.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Media & Geo-Tagging</h3>
                            <p className="text-sm text-gray-500">High-res photos and GPS coordinates for offbeat locations.</p>
                        </div>
                        <button className="text-sm font-semibold text-[#1B4D3E] flex items-center gap-2 hover:bg-emerald-50 px-4 py-2 rounded-lg transition-colors">
                            <MapPin className="w-4 h-4" /> Edit Coordinates
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="aspect-square border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-[#D97706] hover:text-[#D97706] transition-colors cursor-pointer group">
                            <ImageIcon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">Upload Photo</span>
                        </div>
                        <div className="aspect-square rounded-2xl overflow-hidden relative group">
                            <img src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Gallery 1" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button className="p-2 bg-white rounded-full text-gray-900 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                            <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">COVER</div>
                        </div>
                        <div className="aspect-square rounded-2xl overflow-hidden relative group">
                            <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Gallery 2" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button className="p-2 bg-white rounded-full text-gray-900 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                        <div className="aspect-square rounded-2xl overflow-hidden relative group bg-gray-100 flex items-center justify-center">
                            <div className="text-center p-4">
                                <MapPin className="w-8 h-8 mx-auto text-[#1B4D3E] mb-2" />
                                <p className="text-xs font-semibold text-gray-900">GPS Pin</p>
                                <p className="text-[10px] text-gray-500 mt-1">6.8710° N, 81.0450° E</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
