import React, { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { X, MapPin, Image as ImageIcon, CheckCircle, DollarSign, Info } from 'lucide-react';

// Fix for default marker icon in Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});
import { propertyService } from '@/Services/propertyService';

export default function PropertyFormModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        title: '',
        property_type: 'Homestay',
        description: '',
        district: '',
        latitude: 6.8667,
        longitude: 81.0466,
        base_price_lkr: '',
        base_price_usd: '',
        amenities: [],
        eco_features: [],
        images: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (field, value) => {
        setFormData(prev => {
            const list = prev[field];
            if (list.includes(value)) {
                return { ...prev, [field]: list.filter(item => item !== value) };
            } else {
                return { ...prev, [field]: [...list, value] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await propertyService.createProperty({
                ...formData,
                base_price_lkr: Number(formData.base_price_lkr),
                base_price_usd: Number(formData.base_price_usd),
                status: 'draft',
            });
            onClose();
            setStep(1);
            setFormData({
                title: '', property_type: 'Homestay', description: '', district: '', latitude: 6.8667, longitude: 81.0466, base_price_lkr: '', base_price_usd: '', amenities: [], eco_features: [], images: []
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setFormData(prev => ({
                    ...prev,
                    latitude: Number(e.latlng.lat.toFixed(6)),
                    longitude: Number(e.latlng.lng.toFixed(6))
                }));
            },
        });

        return formData.latitude !== null ? (
            <Marker position={[formData.latitude, formData.longitude]} />
        ) : null;
    };

    const steps = [
        { id: 1, name: 'Basic Info', icon: Info },
        { id: 2, name: 'Location', icon: MapPin },
        { id: 3, name: 'Photos', icon: ImageIcon },
        { id: 4, name: 'Features', icon: CheckCircle },
        { id: 5, name: 'Rates', icon: DollarSign },
    ];

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Property Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#1B4D3E] focus:ring-[#1B4D3E] sm:text-sm" placeholder="e.g. Hidden Ella Eco Cabin" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Property Type</label>
                            <select name="property_type" value={formData.property_type} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#1B4D3E] focus:ring-[#1B4D3E] sm:text-sm">
                                <option>Homestay</option>
                                <option>Cabin</option>
                                <option>Villa</option>
                                <option>Boutique Hotel</option>
                                <option>Eco Lodge</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Detailed Description</label>
                            <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#1B4D3E] focus:ring-[#1B4D3E] sm:text-sm" placeholder="Describe what makes your place unique..." />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">District / City</label>
                            <input type="text" name="district" value={formData.district} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#1B4D3E] focus:ring-[#1B4D3E] sm:text-sm" placeholder="e.g. Ella, Badulla" />
                        </div>
                        <div className="bg-slate-100 h-64 rounded-lg flex items-center justify-center border-2 border-slate-300 relative overflow-hidden z-0">
                            <MapContainer 
                                center={[formData.latitude, formData.longitude]} 
                                zoom={12} 
                                scrollWheelZoom={true} 
                                style={{ height: "100%", width: "100%", zIndex: 1 }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationMarker />
                            </MapContainer>
                        </div>
                        <p className="text-xs text-slate-500 italic mt-1">Click anywhere on the map to place the location pin.</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-700">Latitude</label>
                                <input type="number" name="latitude" value={formData.latitude} readOnly className="mt-1 block w-full rounded-md border-slate-300 bg-slate-50 text-slate-500 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-700">Longitude</label>
                                <input type="number" name="longitude" value={formData.longitude} readOnly className="mt-1 block w-full rounded-md border-slate-300 bg-slate-50 text-slate-500 sm:text-sm" />
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-10 text-center hover:bg-slate-50 transition">
                            <ImageIcon className="mx-auto h-12 w-12 text-slate-400" />
                            <div className="mt-4 flex text-sm text-slate-600 justify-center">
                                <label className="relative cursor-pointer rounded-md bg-white font-medium text-[#D97706] focus-within:outline-none hover:text-[#b46205]">
                                    <span>Upload photos</span>
                                    <input type="file" multiple className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">PNG, JPG, WEBP up to 10MB</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {/* Preview placeholders */}
                            <div className="bg-slate-200 aspect-square rounded-md border border-slate-300 flex items-center justify-center text-slate-400 text-xs">Preview</div>
                            <div className="bg-slate-100 aspect-square rounded-md border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                                <span className="text-2xl">+</span>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-medium text-slate-900 mb-3">Eco & Sustainability Features</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {['Solar Power', 'Plastic-free', 'Rainwater Harvesting', 'Organic Garden', 'Waste Composting'].map(feature => (
                                    <label key={feature} className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" checked={formData.eco_features.includes(feature)} onChange={() => handleCheckboxChange('eco_features', feature)} className="h-4 w-4 rounded border-slate-300 text-[#1B4D3E] focus:ring-[#1B4D3E]" />
                                        <span className="text-sm text-slate-700">{feature}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="pt-4 border-t border-slate-200">
                            <h4 className="text-sm font-medium text-slate-900 mb-3">Amenities</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {['Wi-Fi', 'Breakfast Included', 'Hot Water', 'Air Conditioning', 'Kitchen', 'Pool'].map(amenity => (
                                    <label key={amenity} className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" checked={formData.amenities.includes(amenity)} onChange={() => handleCheckboxChange('amenities', amenity)} className="h-4 w-4 rounded border-slate-300 text-[#1B4D3E] focus:ring-[#1B4D3E]" />
                                        <span className="text-sm text-slate-700">{amenity}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Base Price (LKR) / Night</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-slate-500 sm:text-sm">Rs.</span>
                                    </div>
                                    <input type="number" name="base_price_lkr" value={formData.base_price_lkr} onChange={handleChange} className="block w-full rounded-md border-slate-300 pl-10 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] sm:text-sm" placeholder="0.00" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Base Price (USD) / Night</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-slate-500 sm:text-sm">$</span>
                                    </div>
                                    <input type="number" name="base_price_usd" value={formData.base_price_usd} onChange={handleChange} className="block w-full rounded-md border-slate-300 pl-8 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] sm:text-sm" placeholder="0.00" />
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-slate-200">
                            <label className="block text-sm font-medium text-slate-700">House Rules & Extra Fees</label>
                            <textarea rows={2} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#1B4D3E] focus:ring-[#1B4D3E] sm:text-sm" placeholder="Any weekend surcharges, cleaning fees, or check-in times..." />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="2xl">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-[600px]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <h3 className="text-lg font-bold text-[#1B4D3E]">List New Property</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Progress Tracker */}
                <div className="px-6 py-4 bg-white border-b border-slate-100">
                    <div className="flex justify-between relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-slate-200 -z-10"></div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-[#D97706] -z-10 transition-all duration-300" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}></div>
                        
                        {steps.map((s) => {
                            const Icon = s.icon;
                            const isActive = s.id === step;
                            const isCompleted = s.id < step;
                            return (
                                <div key={s.id} className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'border-[#D97706] bg-white text-[#D97706]' : isCompleted ? 'border-[#D97706] bg-[#D97706] text-white' : 'border-slate-300 bg-white text-slate-300'}`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <span className={`text-xs mt-1 font-medium ${isActive ? 'text-[#D97706]' : 'text-slate-500'}`}>{s.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Body */}
                <div className="px-6 py-6 overflow-y-auto flex-1">
                    <form onSubmit={handleSubmit} id="property-form">
                        {renderStepContent()}
                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
                    <button 
                        type="button" 
                        onClick={() => setStep(prev => Math.max(1, prev - 1))}
                        disabled={step === 1}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${step === 1 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'}`}
                    >
                        Back
                    </button>
                    {step < steps.length ? (
                        <button 
                            type="button" 
                            onClick={() => setStep(prev => Math.min(steps.length, prev + 1))}
                            className="px-4 py-2 text-sm font-medium rounded-md text-white bg-[#1B4D3E] hover:bg-[#133c30]"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button 
                            type="submit" 
                            form="property-form"
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-medium rounded-md text-white bg-[#D97706] hover:bg-[#b46205] flex items-center"
                        >
                            {isSubmitting ? 'Saving...' : 'List Property'}
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
}
