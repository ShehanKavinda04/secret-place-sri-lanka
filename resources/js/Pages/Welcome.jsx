// resources/js/Pages/Welcome.jsx
import { Head } from '@inertiajs/react';
import { useState, useMemo } from 'react';

// Layouts 
import Navbar from '@/Layouts/Navbar';
import Hero from './Welcome-sub-sub-components/Hero';
import FeaturesSection from './Welcome-sub-sub-components/FeaturesSection';
import CategoriesSection from './Welcome-sub-sub-components/CategoriesSection';
import SpotsSection from './Welcome-sub-sub-components/SpotsSection';
import Newsletter from './Welcome-sub-sub-components/Newsletter';
import FeatureModal from './Welcome-sub-sub-components/FeatureModal';
import Footer from '@/Layouts/Footer';


import { secretSpots, categories, categoryCards, features } from './Welcome-sub-sub-components/WelcomeData';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');

    // Spots filter 
    const filteredSpots = useMemo(() => {
        return secretSpots.filter(spot => {
            const matchesCategory = activeCategory === 'All' || spot.category === activeCategory;
            const matchesSearch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 spot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 spot.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, activeCategory]);

    // Mock Booking Handler 
    const handleMockBooking = (e) => {
        e.preventDefault();
        setBookingStatus('Processing...');
        setTimeout(() => {
            setBookingStatus(`🎉 Reservation Request for ${bookingDate} Submitted Successfully!`);
        }, 1200);
    };

    return (
        <>
            <Head title="Secret Places Sri Lanka - Royal Travel Guide" />
            
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950">
                <Navbar auth={auth} />

                <Hero />
                
                <FeaturesSection 
                    features={features} 
                    setSelectedFeature={setSelectedFeature} 
                />

                <CategoriesSection 
                    categoryCards={categoryCards} 
                    setActiveCategory={setActiveCategory} 
                />

                <SpotsSection 
                    filteredSpots={filteredSpots}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    categories={categories}
                />

                <Newsletter />

                <FeatureModal 
                    selectedFeature={selectedFeature}
                    setSelectedFeature={setSelectedFeature}
                    bookingDate={bookingDate}
                    setBookingDate={setBookingDate}
                    bookingStatus={bookingStatus}
                    setBookingStatus={setBookingStatus}
                    handleMockBooking={handleMockBooking}
                />

                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </>
    );
}