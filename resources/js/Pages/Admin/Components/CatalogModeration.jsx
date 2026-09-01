import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, ShieldAlert, CheckCircle, Search } from 'lucide-react';
import axios from 'axios';

// Fix Leaflet's default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function CatalogModeration({ initialData = [] }) {
    const [locations, setLocations] = useState(initialData.length > 0 ? initialData : [
        { id: 1, name: 'Eco Cabin - Ella', lat: 6.8667, lng: 81.0466, status: 'verified', type: 'Host' },
        { id: 2, name: 'Kandy Craft Shop', lat: 7.2906, lng: 80.6337, status: 'flagged', type: 'Merchant', issue: 'Inappropriate images reported' },
        { id: 3, name: 'Galle Fort Villa', lat: 6.0328, lng: 80.2168, status: 'verified', type: 'Host' },
        { id: 4, name: 'Sigiriya Safari Tours', lat: 7.9570, lng: 80.7603, status: 'pending', type: 'Host' },
        { id: 5, name: 'Colombo Gem Exporters', lat: 6.9271, lng: 79.8612, status: 'flagged', type: 'Merchant', issue: 'Pricing anomaly detected' },
    ]);

    useEffect(() => {
        if (window.Echo) {
            const channel = window.Echo.channel('admin-dashboard');
            channel.listen('CatalogUpdated', (e) => {
                if (e.catalogData) {
                    setLocations(e.catalogData);
                }
            });
            // We don't strictly leave the channel since other components share it, or we manage it carefully.
        }
    }, []);

    const handleModeration = async (id, action) => {
        try {
            await axios.post(`/admin/catalog/${id}/${action}`);
            setLocations(prev => prev.filter(l => l.id !== id));
        } catch (error) {
            console.error('Error:', error);
            // Optimistic fallback update for demo purposes
            setLocations(prev => prev.filter(l => l.id !== id));
        }
    };

    const [activeTab, setActiveTab] = useState('map');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Global Catalog & Map Moderation</h2>
                    <p className="text-sm text-gray-500">Geospatial overview and content moderation queue.</p>
                </div>
                <div className="mt-4 sm:mt-0 flex bg-slate-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setActiveTab('map')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'map' ? 'bg-white shadow-sm text-slate-900' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        Geo-Map View
                    </button>
                    <button 
                        onClick={() => setActiveTab('queue')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'queue' ? 'bg-white shadow-sm text-slate-900' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        Moderation Queue
                    </button>
                </div>
            </div>

            {activeTab === 'map' && (
                <div className="h-[500px] w-full z-0 relative">
                    <MapContainer center={[7.8731, 80.7718]} zoom={7} scrollWheelZoom={false} className="h-full w-full">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {locations.map(loc => (
                            <Marker 
                                key={loc.id} 
                                position={[loc.lat, loc.lng]} 
                                icon={loc.status === 'flagged' ? redIcon : new L.Icon.Default()}
                            >
                                <Popup>
                                    <div className="font-sans">
                                        <h3 className="font-bold text-sm">{loc.name}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{loc.type}</p>
                                        {loc.status === 'flagged' ? (
                                            <div className="bg-red-50 text-red-700 p-2 rounded text-xs border border-red-100">
                                                <strong>Flagged:</strong> {loc.issue}
                                            </div>
                                        ) : (
                                            <div className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs inline-block">
                                                Verified Listing
                                            </div>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            )}

            {activeTab === 'queue' && (
                <div className="p-6">
                    <div className="mb-4 relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input 
                            type="text" 
                            placeholder="Search flagged items..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 bg-white text-slate-900 placeholder-slate-400 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm" 
                        />
                    </div>
                    
                    <div className="space-y-4">
                        {locations
                            .filter(l => l.status === 'flagged')
                            .filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.type.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map(item => (
                            <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-red-100 bg-red-50/30 rounded-lg">
                                <div className="flex items-start mb-4 sm:mb-0">
                                    <ShieldAlert className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                        <p className="text-sm text-gray-600">Issue: {item.issue}</p>
                                        <span className="inline-block mt-1 text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">{item.type}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button 
                                        onClick={() => handleModeration(item.id, 'dismiss')}
                                        className="flex-1 sm:flex-none px-3 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 text-gray-700"
                                    >
                                        Dismiss
                                    </button>
                                    <button 
                                        onClick={() => handleModeration(item.id, 'suspend')}
                                        className="flex-1 sm:flex-none px-3 py-1.5 bg-red-600 rounded text-sm font-medium hover:bg-red-700 text-white"
                                    >
                                        Suspend Listing
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
