import React, { useState, useEffect } from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head } from '@inertiajs/react';
import { Plus, LayoutGrid, List as ListIcon, MapPin, Edit, Trash2, CalendarDays, ExternalLink, RefreshCw } from 'lucide-react';
import PropertyFormModal from './Components/PropertyFormModal';
import { propertyService } from '@/Services/propertyService';

export default function PropertyListings() {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currency, setCurrency] = useState('LKR');

    // Stats
    const stats = {
        total: properties.length,
        active: properties.filter(p => p.status === 'active').length,
        review: properties.filter(p => p.status === 'under_review').length,
        inactive: properties.filter(p => p.status === 'draft' || p.status === 'inactive').length,
    };

    useEffect(() => {
        // Fetch initial data
        const loadProperties = async () => {
            setIsLoading(true);
            try {
                // In a real scenario, use actual host ID from auth context
                const data = await propertyService.fetchProperties('host-123');
                setProperties(data);
            } catch (error) {
                console.error("Failed to fetch properties", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadProperties();

        // Subscribe to real-time changes
        const unsubscribe = propertyService.subscribeToPropertyChanges((newProperties) => {
            setProperties(newProperties);
        });

        return () => unsubscribe();
    }, []);

    const handleStatusToggle = async (property) => {
        const newStatus = property.status === 'active' ? 'inactive' : 'active';
        
        // Optimistic UI Update
        const previousProperties = [...properties];
        setProperties(properties.map(p => p.id === property.id ? { ...p, status: newStatus } : p));
        
        try {
            await propertyService.toggleStatus(property.id, newStatus);
            // Optionally show a success toast here
        } catch (error) {
            console.error("Failed to update status", error);
            // Rollback on failure
            setProperties(previousProperties);
            // Show error toast
        }
    };

    const StatusBadge = ({ status }) => {
        const styles = {
            active: 'bg-green-100 text-green-800',
            draft: 'bg-slate-100 text-slate-800',
            under_review: 'bg-amber-100 text-amber-800',
            inactive: 'bg-red-100 text-red-800',
        };
        const labels = {
            active: 'Live',
            draft: 'Draft',
            under_review: 'In Review',
            inactive: 'Disabled'
        };
        return (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <SellerLayout header="Property Listings">
            <Head title="Property Listings" />
            
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Header & Stats */}
                <div className="md:flex md:items-center md:justify-between mb-6">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-[#1B4D3E] sm:text-3xl sm:truncate">Manage Properties</h2>
                        <p className="mt-1 text-sm text-slate-500">Add new eco-stays, update pricing, and manage availability.</p>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D97706] hover:bg-[#b46205] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D97706]"
                        >
                            <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Add New Property
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Properties', value: stats.total, color: 'text-slate-900' },
                        { label: 'Live / Bookable', value: stats.active, color: 'text-green-600' },
                        { label: 'Under Review', value: stats.review, color: 'text-amber-600' },
                        { label: 'Inactive / Draft', value: stats.inactive, color: 'text-red-600' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white overflow-hidden shadow rounded-lg p-5">
                            <dt className="text-sm font-medium text-slate-500 truncate">{stat.label}</dt>
                            <dd className={`mt-1 text-3xl font-semibold ${stat.color}`}>{stat.value}</dd>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="flex justify-between items-center bg-white p-4 rounded-t-lg border-b border-slate-200 shadow-sm">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-slate-700">Display Currency:</span>
                        <div className="flex bg-slate-100 rounded-md p-1">
                            {['LKR', 'USD'].map(curr => (
                                <button
                                    key={curr}
                                    onClick={() => setCurrency(curr)}
                                    className={`px-3 py-1 text-sm font-medium rounded-md ${currency === curr ? 'bg-white shadow text-[#1B4D3E]' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    {curr}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-100 rounded-md p-1">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow text-[#1B4D3E]' : 'text-slate-500'}`}
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => setViewMode('table')}
                            className={`p-1.5 rounded-md ${viewMode === 'table' ? 'bg-white shadow text-[#1B4D3E]' : 'text-slate-500'}`}
                        >
                            <ListIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Property List */}
                <div className="bg-[#F8FAFC] min-h-[400px] p-6 shadow-inner rounded-b-lg">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-64 text-[#1B4D3E]">
                            <RefreshCw className="w-8 h-8 animate-spin mb-4" />
                            <p>Syncing properties...</p>
                        </div>
                    ) : properties.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-slate-200">
                            <MapPin className="mx-auto h-12 w-12 text-slate-300" />
                            <h3 className="mt-2 text-sm font-medium text-slate-900">No properties added yet</h3>
                            <p className="mt-1 text-sm text-slate-500">Get started by creating a new property listing.</p>
                            <div className="mt-6">
                                <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1B4D3E] hover:bg-[#133c30]">
                                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                                    Add New Property
                                </button>
                            </div>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {properties.map(property => (
                                <div key={property.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition group">
                                    <div className="h-48 bg-slate-200 relative overflow-hidden">
                                        {property.cover_image ? (
                                            <img src={property.cover_image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                                        )}
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2 py-1 bg-white/90 backdrop-blur text-xs font-semibold rounded text-[#1B4D3E] shadow-sm">
                                                {property.property_type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{property.title}</h3>
                                                <p className="text-sm text-slate-500 flex items-center mt-1">
                                                    <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                                                    {property.district}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                                            <div>
                                                <p className="text-xs text-slate-500">Base Price</p>
                                                <p className="text-lg font-bold text-[#D97706]">
                                                    {currency === 'LKR' ? `Rs. ${property.base_price_lkr.toLocaleString()}` : `$${property.base_price_usd}`} <span className="text-xs font-normal text-slate-500">/ night</span>
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <StatusBadge status={property.status} />
                                                <label className="flex items-center cursor-pointer mt-2">
                                                    <div className="relative">
                                                        <input type="checkbox" className="sr-only" checked={property.status === 'active'} onChange={() => handleStatusToggle(property)} />
                                                        <div className={`block w-10 h-6 rounded-full transition-colors ${property.status === 'active' ? 'bg-[#1B4D3E]' : 'bg-slate-300'}`}></div>
                                                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${property.status === 'active' ? 'transform translate-x-4' : ''}`}></div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        {/* Actions */}
                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                            <button className="flex items-center justify-center px-3 py-2 border border-slate-300 rounded text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                                                <Edit className="w-4 h-4 mr-2" /> Edit
                                            </button>
                                            <button className="flex items-center justify-center px-3 py-2 border border-slate-300 rounded text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                                                <CalendarDays className="w-4 h-4 mr-2" /> Calendar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-slate-200">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Property</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Base Price</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {properties.map((property) => (
                                        <tr key={property.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded object-cover" src={property.cover_image || 'https://via.placeholder.com/40'} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-slate-900">{property.title}</div>
                                                        <div className="text-sm text-slate-500">{property.property_type}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-slate-900">{property.district}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-slate-900">
                                                    {currency === 'LKR' ? `Rs. ${property.base_price_lkr.toLocaleString()}` : `$${property.base_price_usd}`}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-3">
                                                    <StatusBadge status={property.status} />
                                                    <label className="flex items-center cursor-pointer">
                                                        <div className="relative">
                                                            <input type="checkbox" className="sr-only" checked={property.status === 'active'} onChange={() => handleStatusToggle(property)} />
                                                            <div className={`block w-8 h-5 rounded-full transition-colors ${property.status === 'active' ? 'bg-[#1B4D3E]' : 'bg-slate-300'}`}></div>
                                                            <div className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${property.status === 'active' ? 'transform translate-x-3' : ''}`}></div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-[#1B4D3E] hover:text-[#133c30] mr-4"><Edit className="w-4 h-4 inline" /></button>
                                                <button className="text-slate-500 hover:text-slate-700 mr-4"><CalendarDays className="w-4 h-4 inline" /></button>
                                                <button className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4 inline" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <PropertyFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </SellerLayout>
    );
}
