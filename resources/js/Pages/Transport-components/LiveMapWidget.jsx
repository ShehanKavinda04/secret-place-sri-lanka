import { useState, useEffect } from 'react';

export default function LiveMapWidget({ onClick }) {
    const [progress, setProgress] = useState(75);
    const [statusText, setStatusText] = useState("Moving towards Ruwanwelisaya...");
    
    // Simulate real-time tracking stream
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + 0.5; // Increment by 0.5%
                if (next >= 100) {
                    setStatusText("Arrived at destination!");
                    return 100;
                } else if (next > 90) {
                    setStatusText("Approaching drop-off point...");
                } else if (next > 80) {
                    setStatusText("Entering Anuradhapura city limits...");
                }
                return next;
            });
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <button 
            onClick={onClick}
            className="w-full md:w-1/2 relative z-10 h-72 sm:h-96 bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 shadow-inner flex items-center justify-center group cursor-pointer transition-transform hover:scale-[1.02]"
        >
            <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity">
                <img src="/images/sri_lanka_map.jpg" alt="Map View" className="w-full h-full object-cover blur-[1px]" />
            </div>
            
            <div className="relative bg-white/95 p-4 rounded-xl shadow-xl backdrop-blur-sm border border-slate-200 w-64 flex flex-col items-center group-hover:shadow-2xl transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-3 relative">
                    {/* The pulsing dot */}
                    {progress < 100 && <div className="w-4 h-4 bg-teal-600 rounded-full animate-ping absolute"></div>}
                    <div className="w-4 h-4 bg-teal-600 rounded-full relative z-10"></div>
                </div>
                
                <h4 className="font-bold text-slate-800">Vehicle WP-KD 4521</h4>
                
                {/* Real-time status stream */}
                <p className="text-xs text-slate-500 mb-3 text-center h-4">{statusText}</p>
                
                {/* Real-time progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mb-3 relative">
                    <div 
                        className="bg-teal-600 h-full rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                
                <div className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                    Click to view full map
                </div>
            </div>
        </button>
    );
}
