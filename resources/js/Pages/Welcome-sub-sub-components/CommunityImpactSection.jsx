import React from 'react';

export default function CommunityImpactSection() {
    return (
        <section id="community-impact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
                
                {/* Left Column: Text and Stats */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="space-y-4 text-left">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-royalMaroon-950">
                            Community Impact
                        </h2>
                        <p className="text-slate-600 font-light text-base leading-relaxed max-w-lg">
                            Every transaction on Lankasara directly fuels the preservation of Sri Lankan heritage. We visualize the growth of local craft communities and the tangible support you provide.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Stat 1 */}
                        <div className="bg-white border border-royalGold-400/30 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-royalGold-600 mb-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>
                            <div>
                                <div className="text-3xl font-bold text-royalMaroon-950">450+</div>
                                <div className="text-[11px] font-bold tracking-wider text-royalGold-700 uppercase mt-1">MSMEs Supported</div>
                            </div>
                        </div>
                        {/* Stat 2 */}
                        <div className="bg-white border border-royalGold-400/30 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-royalGold-600 mb-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.29 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                            </svg>
                            <div>
                                <div className="text-3xl font-bold text-royalMaroon-950">1.2M</div>
                                <div className="text-[11px] font-bold tracking-wider text-royalGold-700 uppercase mt-1">Heritage Fund (LKR)</div>
                            </div>
                        </div>
                        {/* Stat 3 */}
                        <div className="bg-white border border-royalGold-400/30 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-royalGold-600 mb-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            <div>
                                <div className="text-3xl font-bold text-royalMaroon-950">18</div>
                                <div className="text-[11px] font-bold tracking-wider text-royalGold-700 uppercase mt-1">Traditions Preserved</div>
                            </div>
                        </div>
                        {/* Stat 4 */}
                        <div className="bg-white border border-royalGold-400/30 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-royalGold-600 mb-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>
                            <div>
                                <div className="text-3xl font-bold text-royalMaroon-950">100%</div>
                                <div className="text-[11px] font-bold tracking-wider text-royalGold-700 uppercase mt-1">Verified Authentic</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Charts */}
                <div className="lg:col-span-7 grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
                    {/* Bar Chart Card */}
                    <div className="bg-white border border-royalGold-400/30 rounded-2xl p-6 sm:col-span-2 lg:col-span-1 shadow-sm h-full flex flex-col">
                        <h3 className="text-lg font-bold text-royalMaroon-950">MSME Support Growth (LKR)</h3>
                        <p className="text-sm text-slate-500 mb-8">Direct revenue generated for local artisans monthly</p>
                        
                        <div className="relative flex-1 w-full mt-auto pl-10 min-h-[160px]">
                            {/* Grid lines */}
                            <div className="absolute inset-0 pl-10 flex flex-col justify-between pb-6 z-0">
                                {[320, 240, 160, 80, 0].map((val) => (
                                    <div key={val} className={`w-full border-t ${val === 0 ? 'border-slate-300' : 'border-slate-100'} h-0 relative`}>
                                        <span className="absolute -left-10 -top-2 text-[10px] text-slate-400">{val}k</span>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Bars container */}
                            <div className="relative z-10 w-full h-full flex items-end justify-between px-2 pb-6">
                                {/* Jan */}
                                <div className="w-full max-w-[40px] flex flex-col items-center gap-2 h-full justify-end">
                                    <div className="w-full bg-royalGold-500 rounded-t-sm transition-all duration-500 hover:opacity-80" style={{ height: '31%' }}></div>
                                    <span className="text-[11px] text-slate-500 font-medium absolute bottom-0">Jan</span>
                                </div>
                                {/* Feb */}
                                <div className="w-full max-w-[40px] flex flex-col items-center gap-2 h-full justify-end">
                                    <div className="w-full bg-royalGold-500 rounded-t-sm transition-all duration-500 hover:opacity-80" style={{ height: '56%' }}></div>
                                    <span className="text-[11px] text-slate-500 font-medium absolute bottom-0">Feb</span>
                                </div>
                                {/* Mar */}
                                <div className="w-full max-w-[40px] flex flex-col items-center gap-2 h-full justify-end">
                                    <div className="w-full bg-royalGold-500 rounded-t-sm transition-all duration-500 hover:opacity-80" style={{ height: '43%' }}></div>
                                    <span className="text-[11px] text-slate-500 font-medium absolute bottom-0">Mar</span>
                                </div>
                                {/* Apr */}
                                <div className="w-full max-w-[40px] flex flex-col items-center gap-2 h-full justify-end">
                                    <div className="w-full bg-royalGold-500 rounded-t-sm transition-all duration-500 hover:opacity-80" style={{ height: '75%' }}></div>
                                    <span className="text-[11px] text-slate-500 font-medium absolute bottom-0">Apr</span>
                                </div>
                                {/* May */}
                                <div className="w-full max-w-[40px] flex flex-col items-center gap-2 h-full justify-end">
                                    <div className="w-full bg-royalGold-500 rounded-t-sm transition-all duration-500 hover:opacity-80" style={{ height: '100%' }}></div>
                                    <span className="text-[11px] text-slate-500 font-medium absolute bottom-0">May</span>
                                </div>
                                {/* Jun */}
                                <div className="w-full max-w-[40px] flex flex-col items-center gap-2 h-full justify-end">
                                    <div className="w-full bg-royalMaroon-800 rounded-t-sm transition-all duration-500 hover:opacity-80 shadow-sm" style={{ height: '87%' }}></div>
                                    <span className="text-[11px] text-slate-500 font-medium absolute bottom-0">Jun</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Donut Chart Card */}
                    <div className="bg-white border border-royalGold-400/30 rounded-2xl p-6 sm:col-span-2 lg:col-span-1 shadow-sm">
                        <h3 className="text-lg font-bold text-royalMaroon-950">Fund Distribution</h3>
                        <p className="text-sm text-slate-500 mb-6">How each LKR you spend is allocated</p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-10">
                            <div className="relative w-36 h-36 shrink-0">
                                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-sm">
                                    {/* Community Dev - 10% (Base layer 100%) */}
                                    <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#cbd5e1"
                                        strokeWidth="6.5"
                                    />
                                    {/* Preservation Fund - 25% (90% layer) */}
                                    <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#8A1024"
                                        strokeWidth="6.5"
                                        strokeDasharray="90, 100"
                                    />
                                    {/* Artisan Income - 65% (65% layer) */}
                                    <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#D4AF37"
                                        strokeWidth="6.5"
                                        strokeDasharray="65, 100"
                                    />
                                </svg>
                            </div>

                            <div className="flex-1 space-y-4 w-full">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3.5 h-3.5 rounded-sm bg-royalGold-500 shadow-sm"></div>
                                        <span className="text-sm text-slate-700 font-medium">Artisan Income</span>
                                    </div>
                                    <span className="text-sm font-bold text-royalGold-700">65%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3.5 h-3.5 rounded-sm bg-royalMaroon-700 shadow-sm"></div>
                                        <span className="text-sm text-slate-700 font-medium">Preservation Fund</span>
                                    </div>
                                    <span className="text-sm font-bold text-royalGold-700">25%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3.5 h-3.5 rounded-sm bg-slate-300 shadow-sm"></div>
                                        <span className="text-sm text-slate-700 font-medium">Community Dev</span>
                                    </div>
                                    <span className="text-sm font-bold text-royalGold-700">10%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
