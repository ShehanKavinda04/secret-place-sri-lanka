import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';

export default function AuthLayout({ title, description, children }) {
    const { auth } = usePage().props;

    return (
        <div className="flex flex-col min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950">
            <Head title={title} />
            
            {/* Shared Navbar */}
            <Navbar auth={auth} />

            <div className="flex flex-1">
                {/* Left Side - 60% (Maroon Background) */}
                <div className="hidden lg:flex lg:w-3/5 relative bg-royalMaroon-950 overflow-hidden flex-col justify-center items-center">
                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#3D0610] via-royalMaroon-900 to-[#5C0A1A] z-0"></div>

                    {/* Subtle circular decorative elements */}
                    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none z-0">
                        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full border border-royalGold-500"></div>
                        <div className="absolute top-[5%] left-[5%] w-[300px] h-[300px] rounded-full border border-royalGold-400"></div>
                        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full border border-royalGold-600"></div>
                    </div>

                    {/* Content over background */}
                    <div className="relative z-10 p-12 max-w-2xl text-center flex flex-col items-center">
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F5E6C8] leading-tight mb-2 tracking-wide">
                            Welcome to SecretPlaces<br />Sri Lanka
                        </h2>
                        <h3 className="font-display text-2xl md:text-3xl text-royalGold-400 mb-8 italic font-medium">
                            Explore Sacred Anuradhapura
                        </h3>
                        
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-royalGold-500 to-transparent rounded-full mb-8"></div>
                        
                        <p className="text-[#F5E6C8]/80 text-lg md:text-xl leading-relaxed max-w-lg font-light">
                            Journey beyond the ordinary into a civilisation 2,500 years in the making. Discover hidden cultural and spiritual places with profound spiritual energy.
                        </p>
                    </div>
                </div>

                {/* Right Side - 40% Auth Forms */}
                <div className="w-full lg:w-2/5 flex items-center justify-center p-6 sm:p-12 relative bg-[#FAF9F6] z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.1)]">
                    <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative z-10">
                        <div className="mb-8 text-center sm:text-left">
                            <h1 className="font-display text-3xl font-extrabold text-royalMaroon-950 tracking-tight">{title}</h1>
                            {description && (
                                <p className="text-slate-500 mt-2 text-sm leading-relaxed">{description}</p>
                            )}
                        </div>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
