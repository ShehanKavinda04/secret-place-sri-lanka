
export default function Footer({ auth, laravelVersion, phpVersion }) {
    return (
        <footer className="border-t border-royalGold-500/20 bg-royalMaroon-900 text-[#FAF9F6] py-16 text-center text-xs space-y-6">
                    <div className="flex justify-center gap-6 text-royalGold-400 font-bold uppercase tracking-wider">
                        <a href="#hero" className="hover:text-royalGold-300 transition-colors">Home</a>
                        <a href="#features" className="hover:text-royalGold-300 transition-colors">Features</a>
                        <a href="#discover" className="hover:text-royalGold-300 transition-colors">Explorer Desk</a>
                        <a href="#newsletter" className="hover:text-royalGold-300 transition-colors">Adventure Club</a>
                    </div>
                    
                    <div className="text-royalGold-500/60 max-w-md mx-auto font-light leading-relaxed px-4">
                        Discover responsibly. Respect local cultures, protect historical sights, and practice strict waste management to preserve the natural beauty of the island.
                    </div>

                    <div className="border-t border-royalGold-600/10 pt-8 w-11/12 max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center text-slate-400 gap-4">
                        <div>
                            © {new Date().getFullYear()} SecretPlaces Sri Lanka. Coordinated with love by Local Nomads.
                        </div>
                        <div className="font-mono text-[10px] text-royalGold-400/40">
                            Powered by Laravel v{laravelVersion} (PHP v{phpVersion}) • React + Inertia
                        </div>
                    </div>
                </footer>
    );
}