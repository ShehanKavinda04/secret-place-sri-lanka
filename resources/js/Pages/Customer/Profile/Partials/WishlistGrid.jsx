import React from 'react';
import { Heart, MapPin, Trash2, Home } from 'lucide-react';
import { customerProfileService } from '@/Services/customerProfileService';

export default function WishlistGrid({ wishlist }) {

    const handleRemove = async (itemId) => {
        await customerProfileService.toggleWishlist(itemId);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 font-sansDisplay mb-4">Saved Secret Places</h3>
            
            {wishlist.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Your wishlist is empty</h4>
                    <p className="text-slate-500 mb-6 max-w-md mx-auto">
                        Keep track of your favorite eco-lodges, hidden villas, and local experiences by clicking the heart icon on any listing.
                    </p>
                    <a href="/places" className="inline-flex items-center px-6 py-3 bg-forestGreen-700 text-white font-bold rounded-lg hover:bg-forestGreen-800 transition-colors">
                        Discover Places
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map(item => (
                        <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group">
                            
                            <div className="h-48 relative overflow-hidden">
                                <img 
                                    src={item.image_url} 
                                    alt={item.title}
                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <span className="bg-white/90 backdrop-blur-sm text-forestGreen-700 p-1.5 rounded-full shadow-sm">
                                        {item.item_type === 'property' ? <Home className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-5">
                                <h4 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1" title={item.title}>
                                    {item.title}
                                </h4>
                                <div className="flex items-center text-sm text-slate-500 mb-4">
                                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0 text-cinnamon-500" />
                                    <span className="line-clamp-1">{item.location}</span>
                                </div>
                                
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-lg font-bold text-slate-900">{item.price}</span>
                                    
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleRemove(item.item_id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                            title="Remove from saved"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        <button className="px-4 py-2 bg-slate-900 hover:bg-forestGreen-700 text-white font-bold rounded-lg transition-colors text-sm shadow-sm">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
