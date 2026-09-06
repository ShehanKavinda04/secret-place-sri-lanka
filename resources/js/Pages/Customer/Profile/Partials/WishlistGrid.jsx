import React from 'react';
import { Heart, MapPin, Trash2, Home } from 'lucide-react';
import { customerProfileService } from '@/Services/customerProfileService';

export default function WishlistGrid({ wishlist, headless = false }) {

    const handleRemove = async (itemId) => {
        await customerProfileService.toggleWishlist(itemId);
    };

    return (
        <div className="space-y-6">
            {!headless && (
                <h3 className="text-2xl font-bold text-royalHeritage-textIvory font-display mb-4">Saved Secret Places</h3>
            )}
            
            {wishlist.length === 0 ? (
                <div className="rounded-2xl shadow-xl border border-[#8B6914]/40 p-12 text-center" style={{ background: '#5C1020' }}>
                    <Heart className="w-12 h-12 text-royalHeritage-goldAccent mx-auto mb-4 opacity-50" />
                    <h4 className="text-xl font-bold text-royalHeritage-textIvory font-display mb-2">Your wishlist is empty</h4>
                    <p className="text-royalHeritage-textWarmWhite opacity-80 mb-8 max-w-md mx-auto">
                        Keep track of your favorite eco-lodges, hidden villas, and local experiences by clicking the heart icon on any listing.
                    </p>
                    <a href="/places" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#2A040A] font-extrabold rounded-full hover:brightness-110 transition-all shadow-lg">
                        Discover Places
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map(item => (
                        <div key={item.id} className="rounded-2xl shadow-lg border border-[#8B6914]/40 overflow-hidden group hover:shadow-2xl transition-shadow" style={{ background: '#5C1020' }}>
                            
                            <div className="h-48 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                                <img 
                                    src={item.image_url} 
                                    alt={item.title}
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 z-20 flex gap-2">
                                    <span className="bg-royalHeritage-card/80 backdrop-blur-md text-royalHeritage-goldAccentBright p-2 rounded-full shadow-lg border border-royalHeritage-borderGold">
                                        {item.item_type === 'property' ? <Home className="w-4 h-4" /> : <Heart className="w-4 h-4 fill-royalHeritage-goldAccentBright" />}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h4 className="text-xl font-bold text-royalHeritage-textIvory font-display mb-1 line-clamp-1" title={item.title}>
                                    {item.title}
                                </h4>
                                <div className="flex items-center text-sm text-royalHeritage-textWarmWhite opacity-70 mb-5">
                                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0 text-royalHeritage-borderGold" />
                                    <span className="line-clamp-1">{item.location}</span>
                                </div>
                                
                                <div className="flex items-center justify-between mt-4 border-t border-royalHeritage-borderGold/30 pt-4">
                                    <span className="text-xl font-extrabold text-royalHeritage-goldAccentBright">{item.price}</span>
                                    
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => handleRemove(item.item_id)}
                                            className="p-2.5 text-royalHeritage-textWarmWhite opacity-60 hover:opacity-100 hover:text-red-400 hover:bg-red-900/30 rounded-xl transition-colors border border-transparent hover:border-red-500/50"
                                            title="Remove from saved"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        <button className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#2A040A] font-extrabold rounded-xl transition-all shadow-md hover:brightness-110 text-sm">
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
