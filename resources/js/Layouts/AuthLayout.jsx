import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AuthLayout({ title, description, children }) {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
            <Head title={title} />
            
            {/* Left Side - Branding & Imagery (Hidden on small screens) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#1B4D3E] overflow-hidden flex-col justify-between">
                {/* Background Pattern/Image Overlay */}
                <div 
                    className="absolute inset-0 z-0 opacity-20 mix-blend-overlay"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4D3E] via-transparent to-[#1B4D3E]/80 z-0"></div>

                {/* Content over image */}
                <div className="relative z-10 p-12 flex-grow flex flex-col justify-between">
                    <Link href="/" className="flex items-center gap-3 w-fit hover:opacity-90 transition-opacity">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                            <ApplicationLogo className="w-8 h-8 text-[#1B4D3E]" />
                        </div>
                        <span className="text-white text-2xl font-bold tracking-tight">Secret Place <span className="text-[#D97706]">Sri Lanka</span></span>
                    </Link>

                    <div className="max-w-md mt-20">
                        <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">
                            Discover the unseen beauty of the pearl of the Indian Ocean.
                        </h2>
                        <p className="text-[#F8FAFC]/80 text-lg leading-relaxed">
                            Join our ecosystem to book exclusive retreats, unique experiences, and authentic crafts directly from local hosts and MSMEs.
                        </p>

                        <div className="mt-10 flex gap-4">
                            <div className="w-12 h-1 bg-[#D97706] rounded-full"></div>
                            <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                            <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 relative">
                
                {/* Mobile Logo (Only visible on small screens) */}
                <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
                    <Link href="/">
                        <div className="w-10 h-10 bg-[#1B4D3E] rounded-lg flex items-center justify-center shadow-md">
                            <ApplicationLogo className="w-6 h-6 text-white" />
                        </div>
                    </Link>
                </div>

                <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-[#1B4D3E] tracking-tight">{title}</h1>
                        {description && (
                            <p className="text-slate-500 mt-2 text-sm leading-relaxed">{description}</p>
                        )}
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
