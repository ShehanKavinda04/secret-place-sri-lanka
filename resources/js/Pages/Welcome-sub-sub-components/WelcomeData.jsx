import React from 'react';

// Premium custom-curated secret spots styled to match the royal theme
export const secretSpots = [
    {
        id: 1,
        name: "Jaya Sri Maha Bodhi",
        category: "Sacred Sites & Shrines",
        description: "One of the world's oldest historically documented trees, radiating immense spiritual peace and sacred Buddhist heritage.",
        image: "/images/jaya_sri_maha_bodhi.png",
        rating: "4.9",
        reviews: 320,
        location: "Anuradhapura, North Central Province",
        tags: ["Sacred Tree", "Buddhism", "Ancient Heritage"],
        difficulty: "Easy"
    },
    {
        id: 2,
        name: "Ruwanweli Maha Seya",
        category: "Rituals, Poojas & Ceremonies",
        description: "A magnificent, awe-inspiring ancient stupa housing sacred relics, standing as a grand marvel of engineering and devotion.",
        image: "/images/ruwanweli_maha_seya.png",
        rating: "4.9",
        reviews: 415,
        location: "Anuradhapura, North Central Province",
        tags: ["Ancient Stupa", "Relics", "Devotion"],
        difficulty: "Easy"
    },
    {
        id: 3,
        name: "Vessagiriya",
        category: "Spiritual Experiences & Wellness",
        description: "An ancient forest monastery complex where pious monks meditated amidst scenic, rugged rock caves and serene surroundings.",
        image: "/images/vessagiriya_monastery.png",
        rating: "4.8",
        reviews: 110,
        location: "Anuradhapura, North Central Province",
        tags: ["Forest Monastery", "Meditation", "Rock Caves"],
        difficulty: "Medium"
    },
    {
        id: 4,
        name: "Ranmasu Uyana",
        category: "Ancient Hydraulic & Architecture Wonders",
        description: "A fascinating ancient royal park renowned for its advanced hydraulic systems and the mysterious, symbolic stargate carving.",
        image: "/images/ranmasu_uyana.png",
        rating: "4.7",
        reviews: 156,
        location: "Anuradhapura, North Central Province",
        tags: ["Royal Park", "Hydraulics", "Stargate Carving"],
        difficulty: "Easy"
    },
    {
        id: 5,
        name: "Kalasohona Monastic Environment",
        category: "Local Heritage MSMEs & Crafts",
        description: "A tranquil, lesser-known historic monastic site wrapped in deep natural solitude, perfect for quiet spiritual contemplation.",
        image: "/images/kalasohona_monastery.png",
        rating: "4.8",
        reviews: 74,
        location: "Anuradhapura Outskirts, North Central Province",
        tags: ["Heritage Crafts", "Stone Carving", "Ancient ruins"],
        difficulty: "Medium"
    },
    {
        id: 6,
        name: "Mihintale",
        category: "Transport & Pilgrimage Logistics",
        description: "The revered, historic mountain peak celebrated as the cradle of Buddhism and spiritual awakening in Sri Lanka.",
        image: "/images/mihintale_peak.png",
        rating: "4.9",
        reviews: 280,
        location: "Mihintale, North Central Province",
        tags: ["Pilgrimage route", "Buddhism Cradle", "Mountain Peak"],
        difficulty: "Medium"
    }
];

export const categories = [
    'All', 
    'Sacred Sites & Shrines', 
    'Rituals, Poojas & Ceremonies', 
    'Spiritual Experiences & Wellness', 
    'Ancient Hydraulic & Architecture Wonders', 
    'Local Heritage MSMEs & Crafts', 
    'Transport & Pilgrimage Logistics'
];

export const categoryCards = [
    {
        title: "Sacred Sites & Shrines",
        description: "Discover historic temples, ancient shrines, and deeply revered holy places.",
        image: "/images/sacred_sites.png",
        hashtags: "#SacredSites #Shrines #Temples #Ancient",
        exploreText: "EXPLORE THE SACRED"
    },
    {
        title: "Rituals, Poojas & Ceremonies",
        description: "Experience live traditional rituals, sacred poojas, and cultural religious observances.",
        image: "/images/rituals_ceremonies.png",
        hashtags: "#Poojas #Rituals #Ceremonies #Faith",
        exploreText: "WITNESS FAITH"
    },
    {
        title: "Spiritual Experiences & Wellness",
        description: "Rejuvenate with peaceful meditation programs, yoga, and holistic spiritual healing.",
        image: "/images/spiritual_wellness.png",
        hashtags: "#Meditation #Wellness #Yoga #Peace",
        exploreText: "FIND SERENITY"
    },
    {
        title: "Ancient Hydraulic & Architecture Wonders",
        description: "Explore magnificent ancient reservoirs, stone carvings, and historic engineering marvels.",
        image: "/images/ancient_hydraulic.png",
        hashtags: "#Hydraulics #Architecture #Ruins #Wonders",
        exploreText: "UNVEIL MAJESTY"
    },
    {
        title: "Local Heritage MSMEs & Crafts",
        description: "Support traditional local artisans, authentic cottage industries, and cultural crafts.",
        image: "/images/heritage_crafts.png",
        hashtags: "#MSMEs #Crafts #Artisans #Heritage",
        exploreText: "SUPPORT LOCAL"
    },
    {
        title: "Transport & Pilgrimage Logistics",
        description: "Plan your sacred journey smoothly with reliable local transport.",
        image: "/images/pilgrimage_logistics.png",
        hashtags: "#Transport #Logistics #Pilgrimage #Routes",
        exploreText: "JOURNEY SAFELY"
    }
];

// 6 Feature Components as requested
export const features = [
    {
        id: 'booking',
        title: "Live Booking System",
        description: "Instant real-time reservations for services and activities at sacred sites.",
        dynamicTag: "🟢 142 Active Bookings",
        details: "Access an automated live scheduling engine. Book local mountain guides, secluded heritage homestays, and sacred site pilgrimage tours. Integrates directly with instant SMS notifications and secure digital ticket verification.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
        )
    },
    {
        id: 'tracking',
        title: "Live Location Tracking",
        description: "Real-time map navigation to discover nearby sacred attractions seamlessly.",
        dynamicTag: "📍 87 Mapped Places Near You",
        details: "Navigate remote landscapes using our high-fidelity offline map modules. Discover waterfall pools, ancient trails, and meditation caves. Shows elevation maps, trail conditions, and local ranger safety checkpoints.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
        )
    },
    {
        id: 'storytelling',
        title: "Digital Storytelling",
        description: "High-quality media and detailed history highlighting religious significance.",
        dynamicTag: "📖 48 Active Stories Mapped",
        details: "Immerse yourself in history through premium audio guides and rich digital chronicles. Learn about ancient inscriptions, temple architecture, and cultural folk tales narrated by local heritage scholars.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0-6-6H3v8.25h3.375A3.375 3.375 0 0 1 9.75 21.137m3.75-2.387a6 6 0 0 1 6-6H21v8.25h-3.375a3.375 3.375 0 0 0-3.375 3.375M9 7.5h.008v.008H9V7.5Zm3 0h.008v.008H12V7.5Zm3 0h.008v.008H15V7.5Zm-6 3h.008v.008H9v-.008Zm3 0h.008v.008H12v-.008Zm3 0h.008v.008H15v-.008Z" />
            </svg>
        )
    },
    {
        id: 'language',
        title: "Multi-Language Content",
        description: "Accessible information tailored in Sinhala, Tamil, or English languages.",
        dynamicTag: "🌐 3 Languages Available",
        details: "Ensure universal accessibility for local pilgrims and foreign nomads alike. Toggle between Sinhala (සිංහල), Tamil (தமிழ்), and English (English) with synchronized local dialect audio transcripts.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21a9.003 9.003 0 0 0 8.354-5.646M10.5 21A9.003 9.003 0 0 1 2.146 15.354M10.5 21V3m0 18c-2.21 0-4-3.582-4-8s1.79-8 4-8m0 18c2.21 0 4-3.582 4-8s-1.79-8-4-8M3.343 7.5a9.001 9.001 0 0 1 14.314 0M2.146 15.354a9 9 0 0 1 16.708 0M10.5 3a9.003 9.003 0 0 0-8.354 5.646M10.5 3a9.003 9.003 0 0 1 8.354 5.646" />
            </svg>
        )
    },
    {
        id: 'analytics',
        title: "MSME Analytics",
        description: "Simplified business dashboard tracking income and visitor insights.",
        dynamicTag: "📈 18 Active MSMEs Online",
        details: "Supporting remote community economics. Local homestay operators, guides, and craft artisans access a clean metrics dashboard to view booking income trends, site traffic, and guest review summaries.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
        )
    },
    {
        id: 'payments',
        title: "Secure Payments",
        description: "Safe multi-channel environment supporting local and international cards.",
        dynamicTag: "🔒 SSL Certified LankaPay",
        details: "Transact with complete peace of mind. Our gateway handles Sri Lankan local cards (LankaPay), international credit cards (Visa/Mastercard), and mobile wallet options seamlessly.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
        )
    }
];
