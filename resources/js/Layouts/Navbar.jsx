import { Link } from '@inertiajs/react';

export default function Navbar({ auth }) {
    return (
        <header className="bg-royalMaroon-800 border-b border-royalGold-600/20 text-[#FAF9F6] sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-royalGold-600 via-royalGold-400 to-royalGold-300 flex items-center justify-center shadow-md border border-royalGold-300/30">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-royalMaroon-950">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v5.25H6a.75.75 0 0 0 0 1.5h5.25V18a.75.75 0 0 0 1.5 0v-5.25H18a.75.75 0 0 0 0-1.5h-5.25V6Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="font-display text-xl font-bold tracking-wider text-royalGold-300">SecretPlaces</span>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-royalGold-300/90">
                    <a href="/#hero" className="hover:text-royalGold-300 transition-colors">Home</a>
                    <a href="/#categories" className="hover:text-royalGold-300 transition-colors">Categories</a>
                    <a href="/#smart-routing" className="hover:text-royalGold-300 transition-colors">Map</a>
                    <a href="/#features" className="hover:text-royalGold-300 transition-colors">Features</a>
                    <a href="/#discover" className="hover:text-royalGold-300 transition-colors">Places</a>
                    <a href="/#newsletter" className="hover:text-royalGold-300 transition-colors">Suggestions</a>
                    <Link href="/about-us" className="hover:text-royalGold-300 transition-colors">About Us</Link>
                </nav>

                <div className="flex items-center gap-4">
                    {auth.user ? (
                        <Link href={route('dashboard')} className="px-5 py-2.5 rounded-full bg-royalMaroon-900 border border-royalGold-500/50 text-xs font-bold uppercase tracking-wider text-royalGold-300 hover:bg-royalMaroon-950 transition-all">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm font-semibold text-royalGold-400 hover:text-royalGold-300">Log In</Link>
                            <Link href={route('register')} className="px-5 py-2.5 rounded-full bg-gradient-to-r from-royalGold-500 to-royalGold-300 text-xs font-bold uppercase tracking-wider text-royalMaroon-950 hover:brightness-110">
                                Join Group
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}