import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';

export default function AboutUs({ auth }) {
    return (
        <>
            <Head title="About Us - Secret Places Sri Lanka" />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />
                
                <main className="flex-grow flex flex-col items-center justify-center p-8 lg:p-24">
                    <div className="max-w-4xl text-center space-y-8">
                        <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-royalMaroon-950">
                            About Us
                        </h1>
                        <div className="w-24 h-1 bg-royalGold-500 mx-auto rounded-full"></div>
                        <p className="text-xl text-[#605a54] leading-relaxed font-light">
                            Welcome to Secret Places Sri Lanka. We are dedicated to uncovering the hidden gems, sacred sites, and cultural wonders of Anuradhapura and beyond. Our mission is to guide you through a seamless, smart, and spiritually enriching journey.
                        </p>
                    </div>
                </main>

                <Footer auth={auth} laravelVersion="" phpVersion="" />
            </div>
        </>
    );
}
