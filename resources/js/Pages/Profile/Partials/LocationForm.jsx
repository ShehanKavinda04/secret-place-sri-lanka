import React, { useState, useEffect, useRef } from 'react';
import { profileService } from '@/Services/profileService';
import { Check, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition }) => {
    const markerRef = useRef(null);
    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });

    return position === null ? null : (
        <Marker 
            position={position}
            ref={markerRef}
            draggable={true}
            eventHandlers={{
                dragend: () => {
                    const marker = markerRef.current;
                    if (marker != null) {
                        const latLng = marker.getLatLng();
                        setPosition([latLng.lat, latLng.lng]);
                    }
                }
            }}
        />
    );
};

export default function LocationForm({ profile }) {
    const districts = [
        'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 
        'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 
        'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala', 
        'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 
        'Trincomalee', 'Vavuniya'
    ];

    const [formData, setFormData] = useState({
        address: profile.address,
        district: profile.district,
    });
    
    // Map coords
    const [position, setPosition] = useState(
        profile.latitude && profile.longitude ? [profile.latitude, profile.longitude] : [6.9271, 79.8612] // Default to Colombo
    );

    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setFormData({ address: profile.address, district: profile.district });
        if (profile.latitude && profile.longitude) {
            setPosition([profile.latitude, profile.longitude]);
        }
    }, [profile]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await profileService.updateProfile({
                ...formData,
                latitude: position[0],
                longitude: position[1],
            });
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error("Failed to update location", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 relative">
            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-slate-500" /> Location & Physical Address
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Street Address</label>
                        <input 
                            type="text" 
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">District</label>
                        <select 
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                            required
                        >
                            <option value="">Select a district...</option>
                            {districts.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">GPS Location</label>
                    <p className="text-xs text-slate-500 mb-4">Drag the pin or click on the map to set your exact location for guests.</p>
                    
                    <div className="h-64 w-full rounded-lg overflow-hidden border border-slate-300 z-10 relative">
                        <MapContainer 
                            center={position} 
                            zoom={13} 
                            style={{ height: '100%', width: '100%' }}
                            scrollWheelZoom={false}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <LocationMarker position={position} setPosition={setPosition} />
                        </MapContainer>
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-slate-500">
                        <span>Lat: {position[0].toFixed(6)}</span>
                        <span>Lng: {position[1].toFixed(6)}</span>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button 
                        type="submit" 
                        disabled={isSaving}
                        className="px-6 py-2 bg-[#1B4D3E] text-white font-bold rounded-lg shadow-md shadow-[#1B4D3E]/20 hover:bg-[#143d31] transition-colors disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Location'}
                    </button>
                </div>
            </form>

            {showToast && (
                <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in-up">
                    <Check className="w-4 h-4 mr-2" /> Location saved successfully
                </div>
            )}
        </div>
    );
}
