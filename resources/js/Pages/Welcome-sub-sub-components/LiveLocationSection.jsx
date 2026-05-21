import React from 'react';

export default function LiveLocationSection() {
    return (
        <section id="smart-routing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[7px] pb-[103px]">
            <div className="relative w-full min-h-[400px] lg:min-h-[480px] rounded-3xl overflow-hidden shadow-2xl group bg-[#0d131a] flex flex-col justify-center">
                
                {/* Background Image on Right */}
                <div 
                    className="absolute inset-0 bg-cover bg-center md:bg-right lg:bg-[center_right_-2rem] transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    style={{ backgroundImage: `url('/images/smart_routing_bg.png')` }}
                ></div>
                
                {/* Horizontal Gradient Overlay for Left Side Dark Area */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d131a] via-[#0d131a]/95 md:via-[#0d131a]/80 to-transparent w-full md:w-[85%] lg:w-[70%] xl:w-[60%]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d131a] via-[#0d131a]/40 to-transparent opacity-80 md:hidden"></div>

                {/* Content Container - Now full width so the bottom row can span the whole section */}
                <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 py-12 flex flex-col h-full justify-between gap-8">
                    
                    {/* Restrict width only on the text block so it doesn't overlap the right-side image subject */}
                    <div className="mt-auto md:mt-0 pt-4 md:pt-8 md:w-[70%] lg:w-[60%] xl:w-[55%]">
                        {/* Title */}
                        <h2 className="font-display text-4xl sm:text-5xl lg:text-[4rem] leading-[1.1] text-white tracking-widest uppercase mb-4 drop-shadow-lg" style={{ wordSpacing: '0.1em' }}>
                            Live Location Tracking &amp; Smart Routing
                        </h2>

                        {/* Description */}
                        <p className="font-display text-lg sm:text-xl lg:text-2xl text-[#e5c175] leading-relaxed drop-shadow-md">
                            Instantly discover sacred sites and local businesses in Anuradhapura based on your live location, and get the shortest, fastest routes displayed directly on the map for a seamless journey.
                        </p>
                    </div>

                    {/* Bottom Row - Full width, tags left, button right */}
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 w-full mt-auto">
                        
                        {/* Tags */}
                        <div className="text-white/90 text-[10px] sm:text-xs font-sans tracking-wider flex flex-wrap items-center gap-2 drop-shadow-md pb-1 md:w-[70%] lg:w-[60%] xl:w-[55%]">
                            <span className="uppercase font-medium tracking-[0.1em] mt-1 md:mt-0 block md:inline">MAP YOUR JOURNEY</span>
                        </div>

                        {/* Button - Pushed to bottom right */}
                        <button className="flex items-center justify-center gap-3 text-white hover:text-white group/btn transition-all shrink-0 rounded-full bg-[#39505c]/80 backdrop-blur-md px-5 py-2.5 border-2 border-[#d0b471] shadow-[0_0_12px_rgba(208,180,113,0.3)] hover:shadow-[0_0_20px_rgba(208,180,113,0.5)] whitespace-nowrap self-start md:self-end">
                            <span className="text-xs font-sans font-medium tracking-widest uppercase">Get Started</span>
                            <div className="w-5 h-5 flex items-center justify-center transition-transform group-hover/btn:translate-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-[#d0b471]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
