export default function FeatureModal({ 
    selectedFeature, 
    setSelectedFeature, 
    bookingDate, 
    setBookingDate, 
    bookingStatus, 
    setBookingStatus, 
    handleMockBooking 
}) {
    if (!selectedFeature) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 transition-all duration-300 animate-fadeIn">
            <div className="bg-royalMaroon-800 border-2 border-royalGold-500 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-[#FAF9F6] shadow-2xl relative space-y-6">
                
                {/* Close Modal button */}
                <button 
                    onClick={() => { setSelectedFeature(null); setBookingStatus(''); }}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-royalMaroon-950 text-royalGold-400 hover:text-royalGold-300 flex items-center justify-center font-bold border border-royalGold-500/30 transition-colors"
                >
                    ✕
                </button>

                {/* Header Icon + Info */}
                <div className="flex items-center gap-4 border-b border-royalGold-600/30 pb-4">
                    <div className="w-14 h-14 rounded-2xl bg-royalTeal text-royalGold-300 flex items-center justify-center border border-royalGold-400/20">
                        {selectedFeature.icon}
                    </div>
                    <div className="text-left">
                        <h3 className="font-display text-xl font-bold text-royalGold-300 uppercase tracking-wide">
                            {selectedFeature.title}
                        </h3>
                        <span className="text-[10px] bg-royalGold-500/10 border border-royalGold-400/20 text-royalGold-400 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest mt-1 inline-block">
                            {selectedFeature.dynamicTag}
                        </span>
                    </div>
                </div>

                {/* Detailed description */}
                <div className="text-left text-sm text-royalGold-300/80 leading-relaxed font-light">
                    <p>{selectedFeature.details}</p>
                </div>

                {/* Functional Live Demos Inside Modal */}
                <div className="bg-royalMaroon-950/60 rounded-2xl p-4 border border-royalGold-500/10 space-y-3">
                    <span className="text-[9px] uppercase font-bold text-royalGold-400/50 block tracking-widest text-left">Live Functional Sandbox</span>
                    
                    {selectedFeature.id === 'booking' && (
                        <form onSubmit={handleMockBooking} className="space-y-3 text-left">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-royalGold-400 uppercase tracking-wider">Select Adventure Date</label>
                                <input 
                                    type="date" 
                                    required
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    className="w-full bg-royalMaroon-900 border border-royalGold-600/30 rounded-xl px-3 py-2 text-sm text-royalGold-300 focus:outline-none focus:border-royalGold-400"
                                />
                            </div>
                            <button type="submit" className="w-full py-2.5 rounded-xl bg-royalGold-500 hover:bg-royalGold-400 text-royalMaroon-950 font-bold text-xs uppercase tracking-wider transition-colors">
                                Book Instant Slot
                            </button>
                            {bookingStatus && (
                                <div className="text-xs font-semibold text-center text-emerald-400 bg-emerald-950/20 border border-emerald-800/30 rounded-xl py-2">
                                    {bookingStatus}
                                </div>
                            )}
                        </form>
                    )}

                    {selectedFeature.id === 'tracking' && (
                        <div className="py-4 text-center space-y-3">
                            {/* Mock map radar animation */}
                            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-emerald-500/20 border border-emerald-500/40 animate-ping" />
                                <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-100 z-10" />
                            </div>
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">📡 Mapped coordinates active: 80.6337° E, 7.2906° N</span>
                            <p className="text-[11px] text-royalGold-450/65 font-light">Interactive tracking locates 3 hidden waterfall trails within 2.5km radius.</p>
                        </div>
                    )}

                    {selectedFeature.id === 'storytelling' && (
                        <div className="p-3 space-y-3 text-left">
                            <div className="flex items-center justify-between text-xs text-royalGold-300 font-semibold bg-royalMaroon-900 px-3 py-2 rounded-xl border border-royalGold-500/10">
                                <span>🔊 Play Audio Story: Sigiriya Inscription</span>
                                <span className="text-[9px] uppercase bg-royalGold-500/20 px-1.5 py-0.5 rounded text-royalGold-400 animate-pulse">Playing</span>
                            </div>
                            {/* Mock player slider bar */}
                            <div className="space-y-1">
                                <div className="w-full bg-royalMaroon-900 rounded-full h-1.5">
                                    <div className="bg-royalGold-500 h-1.5 rounded-full w-[45%]" />
                                </div>
                                <div className="flex justify-between text-[9px] text-royalGold-400/50">
                                    <span>02:18</span>
                                    <span>05:10</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedFeature.id === 'language' && (
                        <div className="p-3 text-center space-y-3">
                            <span className="text-xs font-bold text-royalGold-400 uppercase tracking-wider block">Select Platform Language</span>
                            <div className="flex justify-center gap-2">
                                <button type="button" className="px-3 py-1.5 rounded-lg border-2 border-royalGold-500 bg-royalGold-500 text-royalMaroon-950 text-xs font-bold uppercase">English</button>
                                <button type="button" className="px-3 py-1.5 rounded-lg border border-royalGold-500/40 text-royalGold-400 text-xs font-semibold hover:bg-royalMaroon-900 transition-colors">සිංහල</button>
                                <button type="button" className="px-3 py-1.5 rounded-lg border border-royalGold-500/40 text-royalGold-400 text-xs font-semibold hover:bg-royalMaroon-900 transition-colors">தமிழ்</button>
                            </div>
                        </div>
                    )}

                    {selectedFeature.id === 'analytics' && (
                        <div className="p-2 space-y-3 text-left">
                            <span className="text-xs font-bold text-royalGold-400 uppercase tracking-wider block">Homestay Revenue Trends</span>
                            {/* Mock analytical bar chart */}
                            <div className="flex items-end justify-between h-20 bg-royalMaroon-900/80 rounded-xl p-3 border border-royalGold-500/10">
                                <div className="w-6 bg-royalGold-500/30 hover:bg-royalGold-500 h-[30%] rounded transition-all duration-300" title="Mar: LKR 45k" />
                                <div className="w-6 bg-royalGold-500/30 hover:bg-royalGold-500 h-[50%] rounded transition-all duration-300" title="Apr: LKR 75k" />
                                <div className="w-6 bg-royalGold-500 hover:bg-royalGold-600 h-[85%] rounded transition-all duration-300" title="May: LKR 125k" />
                                <div className="w-6 bg-royalGold-600 h-[70%] rounded transition-all duration-300" title="Jun (Proj): LKR 100k" />
                            </div>
                            <div className="flex justify-between text-[9px] text-royalGold-400/50 px-1">
                                <span>Mar</span>
                                <span>Apr</span>
                                <span>May</span>
                                <span>Jun (Est)</span>
                            </div>
                        </div>
                    )}

                    {selectedFeature.id === 'payments' && (
                        <div className="p-3 text-left space-y-3">
                            <span className="text-xs font-bold text-royalGold-400 uppercase tracking-wider block">Mock Payment Gateway</span>
                            <div className="bg-royalMaroon-900 border border-royalGold-500/10 rounded-xl p-3 space-y-2">
                                <div className="flex justify-between text-xs text-royalGold-450/70 font-semibold">
                                    <span>LankaPay Network</span>
                                    <span className="text-emerald-400">● Safe</span>
                                </div>
                                {/* Dummy credit card fields */}
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="col-span-2 bg-royalMaroon-950 rounded px-2 py-1 text-[10px] text-royalGold-300 font-mono">•••• •••• •••• 4242</div>
                                    <div className="bg-royalMaroon-950 rounded px-2 py-1 text-[10px] text-royalGold-300 font-mono text-center">12/28</div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Back to Home Button */}
                <button 
                    onClick={() => { setSelectedFeature(null); setBookingStatus(''); }}
                    className="w-full py-3 bg-gradient-to-r from-royalGold-500 to-royalGold-300 text-royalMaroon-950 font-bold rounded-xl text-xs uppercase tracking-wider hover:brightness-110"
                >
                    Back to Main Desk
                </button>
            </div>
        </div>
    );
}