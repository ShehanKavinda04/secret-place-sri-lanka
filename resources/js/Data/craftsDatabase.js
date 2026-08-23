export const categoryDatabase = {
    'stone-carving': { 
        title: 'Traditional Stone Sculpting', 
        desc: 'Master stonemasons recreate the glory of ancient Anuradhapura.',
        banner: '/images/stone_sculpting.png',
        filters: [
            { id: 'moonstones', label: 'Moonstones (Sandakada Pahana)' },
            { id: 'guardstones', label: 'Guardstones (Muragala)' },
            { id: 'statues', label: 'Buddha Statues' },
            { id: 'pillars', label: 'Carved Pillars' },
            { id: 'plaques', label: 'Decorative Plaques' },
        ],
        products: [
            { id: 101, filterId: 'moonstones', title: "Granite Moonstone Replica", subtitle: "Intricately carved granite half-lotus moonstone replica.", price: "Rs. 15,000.00", rating: "4.9", reviewsCount: 310, description: "A beautifully detailed replica of the Anuradhapura era moonstone, carved from pure granite.", features: ["Pure granite", "Hand chiseled", "Authentic design"], image: "/images/crafts/moonstone.png", subImages: ["/images/crafts/moonstone.png"] },
            { id: 102, filterId: 'guardstones', title: "Traditional Guardstone", subtitle: "Detailed Muragala carving for entrance protection.", price: "Rs. 12,500.00", rating: "4.8", reviewsCount: 154, description: "Protect your home with this traditional guardstone featuring the Nagaraja.", features: ["Granite", "Traditional motif", "Durable"], image: "/images/crafts/guardstone.png", subImages: ["/images/crafts/guardstone.png"] },
            { id: 103, filterId: 'statues', title: "Samadhi Buddha Statue", subtitle: "Serene Buddha statue carved from solid black granite.", price: "Rs. 25,000.00", rating: "5.0", reviewsCount: 89, description: "A serene statue of Lord Buddha in the Samadhi posture, carved from black granite.", features: ["Black granite", "Samadhi posture", "Highly detailed"], image: "/images/crafts/samadhi.png", subImages: ["/images/crafts/samadhi.png"] },
            { id: 104, filterId: 'pillars', title: "Lotus Pillar Capital", subtitle: "Traditional Pekada design stone pillar top.", price: "Rs. 8,000.00", rating: "4.7", reviewsCount: 42, description: "A beautiful lotus motif pillar capital to add heritage charm to your architecture.", features: ["Stone carving", "Lotus motif", "Architectural"], image: "/images/crafts/pillar.png", subImages: ["/images/crafts/pillar.png"] },
            { id: 105, filterId: 'plaques', title: "Stone Carved Elephant", subtitle: "Decorative wall plaque featuring the royal elephant.", price: "Rs. 6,500.00", rating: "4.8", reviewsCount: 67, description: "A decorative wall plaque featuring the majestic royal elephant of ancient Sri Lanka.", features: ["Wall plaque", "Elephant motif", "Granite finish"], image: "/images/crafts/stone_elephant.png", subImages: ["/images/crafts/stone_elephant.png"] },
        ]
    },
    'rajarata-pottery': { 
        title: 'Rajarata Clay Pottery', 
        desc: 'Discover a world of unique, decorative items, cooking pots, lamps, and more. A heritage of artistry in every piece, crafted from the rich red laterite clay of the dry zone.',
        banner: '/images/clay_pottery.png',
        filters: [
            { id: 'clay-pots', label: 'Clay Pots & Jugs' },
            { id: 'oil-lamps', label: 'Ritual Oil Lamps' },
            { id: 'vases', label: 'Decorative Vases' },
            { id: 'bowls', label: 'Serving Bowls' },
            { id: 'figurines', label: 'Figurines & Decor' },
            { id: 'mugs', label: 'Mugs & Cups' },
            { id: 'planters', label: 'Planters' },
        ],
        products: [
            { id: 1, filterId: 'clay-pots', title: "Traditional Terracotta Water Jug", subtitle: "Hand-thrown Gurulethu with intricate etched patterns, naturally cools water.", price: "Rs. 4,500.00", rating: "4.9", reviewsCount: 204, description: "A beautifully hand-thrown water jug that naturally cools drinking water.", features: ["Terracotta", "Natural cooling", "Etched patterns"], image: "/images/crafts/jug.png", subImages: ["/images/crafts/jug.png"] },
            { id: 2, filterId: 'oil-lamps', title: "Multi-spout Ritual Oil Lamp", subtitle: "Traditional Pahana used for temple offerings and blessings.", price: "Rs. 3,200.00", rating: "4.8", reviewsCount: 145, description: "A traditional clay oil lamp used in Buddhist rituals and cultural ceremonies.", features: ["Clay", "Multi-spout", "Cultural artifact"], image: "/images/crafts/lamp.png", subImages: ["/images/crafts/lamp.png"] },
            { id: 3, filterId: 'clay-pots', title: "Rustic Clay Cooking Pot", subtitle: "Authentic Chatti for slow-cooking curries, retains heat perfectly.", price: "Rs. 2,800.00", rating: "4.7", reviewsCount: 382, description: "The perfect authentic clay pot for slow-cooking delicious Sri Lankan curries.", features: ["Heat retaining", "Authentic flavor", "Durable clay"], image: "/images/crafts/pot.png", subImages: ["/images/crafts/pot.png"] },
            { id: 4, filterId: 'vases', title: "Decorative Terracotta Vase", subtitle: "Elegant vase featuring ancient Sri Lankan floral motifs.", price: "Rs. 6,500.00", rating: "4.9", reviewsCount: 56, description: "An elegant decorative vase featuring traditional Sri Lankan Liyawela floral motifs.", features: ["Terracotta", "Hand painted", "Floral motifs"], image: "/images/crafts/vase.png", subImages: ["/images/crafts/vase.png"] },
            { id: 5, filterId: 'bowls', title: "Wide Serving Bowl", subtitle: "Perfect for serving rice and traditional dishes, unglazed inside.", price: "Rs. 3,000.00", rating: "4.8", reviewsCount: 94, description: "A wide clay serving bowl perfect for serving rice or large portions of curries.", features: ["Unglazed inside", "Wide base", "Food safe"], image: "/images/crafts/bowl.png", subImages: ["/images/crafts/bowl.png"] },
            { id: 6, filterId: 'figurines', title: "Handcrafted Clay Elephant", subtitle: "Intricately detailed figurine representing majestic Sri Lankan wildlife.", price: "Rs. 5,000.00", rating: "4.9", reviewsCount: 112, description: "A beautifully detailed clay figurine of a majestic Sri Lankan elephant.", features: ["Handcrafted", "Detailed texture", "Decorative"], image: "/images/crafts/elephant.png", subImages: ["/images/crafts/elephant.png"] },
            { id: 7, filterId: 'mugs', title: "Rustic Tea Mug", subtitle: "Enjoy Ceylon tea in a traditional, earthy clay mug.", price: "Rs. 1,200.00", rating: "4.6", reviewsCount: 420, description: "Enjoy your morning Ceylon tea in this rustic, earthy clay mug.", features: ["Clay", "Rustic finish", "Comfortable handle"], image: "/images/crafts/mug.png", subImages: ["/images/crafts/mug.png"] },
            { id: 8, filterId: 'planters', title: "Traditional Planter Pot", subtitle: "Wide base terracotta planter for indoor and outdoor plants.", price: "Rs. 4,000.00", rating: "4.8", reviewsCount: 73, description: "A wide-base terracotta planter perfect for your indoor or outdoor plants.", features: ["Terracotta", "Breathable for roots", "Wide base"], image: "/images/crafts/planter.png", subImages: ["/images/crafts/planter.png"] }
        ]
    },
    'rush-reed-weaving': {
        title: 'Rush & Reed Weaving (Pan)',
        desc: 'Women from communities surrounding the ancient reservoirs expertly weave dried reeds and rushes into beautiful, eco-friendly mats, baskets, and intricate household items.',
        banner: '/images/reed_weaving.png',
        filters: [
            { id: 'mats', label: 'Mats (Paduru)' },
            { id: 'baskets', label: 'Baskets' },
            { id: 'bags', label: 'Bags & Totes' },
            { id: 'coasters', label: 'Tableware & Coasters' }
        ],
        products: [
            { id: 201, filterId: 'mats', title: "Traditional Pan Padura", subtitle: "Handwoven reed mat featuring vibrant geometric patterns, perfect for lounging or decoration.", price: "Rs. 4,500.00", rating: "4.9", reviewsCount: 156, description: "A beautifully handwoven traditional Pan Padura (reed mat) with vibrant geometric patterns.", features: ["Eco-friendly", "Handwoven", "Vibrant colors"], image: "/images/crafts/reed_mat.png", subImages: ["/images/crafts/reed_mat.png"] },
            { id: 202, filterId: 'baskets', title: "Woven Storage Basket", subtitle: "Sturdy and eco-friendly circular reed basket with woven handles.", price: "Rs. 2,800.00", rating: "4.8", reviewsCount: 89, description: "A sturdy, circular storage basket handwoven from natural reeds.", features: ["Sturdy handles", "Eco-friendly", "Spacious"], image: "/images/crafts/woven_basket.png", subImages: ["/images/crafts/woven_basket.png"] },
            { id: 203, filterId: 'bags', title: "Stylish Pan Tote Bag", subtitle: "Fashionable and durable reed tote bag with sturdy leather handles.", price: "Rs. 3,500.00", rating: "4.7", reviewsCount: 210, description: "A stylish and durable tote bag woven from natural pan reeds with leather handles.", features: ["Leather handles", "Durable", "Fashionable"], image: "/images/crafts/reed_bag.png", subImages: ["/images/crafts/reed_bag.png"] },
            { id: 204, filterId: 'coasters', title: "Woven Coaster Set", subtitle: "Set of 6 intricately patterned circular coasters to protect your tables.", price: "Rs. 1,200.00", rating: "4.6", reviewsCount: 340, description: "A set of 6 intricately handwoven coasters to protect your tables in style.", features: ["Set of 6", "Heat resistant", "Intricate patterns"], image: "/images/crafts/reed_coasters.png", subImages: ["/images/crafts/reed_coasters.png"] }
        ]
    },
    'lotus-fibre-craft': {
        title: 'Lotus Stem Silk Extraction',
        desc: 'An innovative, highly sustainable MSME craft where artisans extract delicate micro-fibres from the lotus stems gathered from Anuradhapura’s ancient lakes to weave rare, luxurious textiles.',
        banner: '/images/lotus_silk.png',
        filters: [
            { id: 'scarves', label: 'Scarves & Shawls' },
            { id: 'fabric', label: 'Fabric Rolls' },
            { id: 'yarn', label: 'Lotus Yarn' },
            { id: 'accessories', label: 'Accessories' }
        ],
        products: [
            { id: 301, filterId: 'scarves', title: "Handwoven Lotus Silk Scarf", subtitle: "Delicate, breathable and luxurious scarf naturally dyed.", price: "Rs. 18,500.00", rating: "5.0", reviewsCount: 45, description: "A highly luxurious, breathable scarf woven entirely from lotus stem micro-fibres.", features: ["100% Lotus Silk", "Naturally dyed", "Ultra soft"], image: "/images/crafts/lotus_scarf.png", subImages: ["/images/crafts/lotus_scarf.png"] },
            { id: 302, filterId: 'fabric', title: "Raw Lotus Fabric Roll", subtitle: "1 meter of unbleached artisanal lotus stem silk fabric.", price: "Rs. 25,000.00", rating: "4.9", reviewsCount: 12, description: "One meter of premium unbleached artisanal lotus stem silk fabric for custom tailoring.", features: ["Unbleached", "Raw silk texture", "Sustainable"], image: "/images/crafts/lotus_fabric.png", subImages: ["/images/crafts/lotus_fabric.png"] },
            { id: 303, filterId: 'yarn', title: "Lotus Micro-Fibre Yarn", subtitle: "Spool of pure, naturally extracted lotus stem fibre for weaving.", price: "Rs. 8,500.00", rating: "4.8", reviewsCount: 34, description: "A spool of pure, naturally extracted lotus stem fibre, ready for your own weaving projects.", features: ["Pure micro-fibre", "Strong", "Natural color"], image: "/images/crafts/lotus_yarn.png", subImages: ["/images/crafts/lotus_yarn.png"] },
            { id: 304, filterId: 'accessories', title: "Lotus Silk Handkerchief", subtitle: "Soft and sustainable handkerchief with fringed edges.", price: "Rs. 3,500.00", rating: "4.7", reviewsCount: 78, description: "A soft, sustainable handkerchief woven from lotus silk with delicate fringed edges.", features: ["Fringed edges", "Hypoallergenic", "Ultra soft"], image: "/images/crafts/lotus_handkerchief.png", subImages: ["/images/crafts/lotus_handkerchief.png"] }
        ]
    },
    'wood-carving': {
        title: 'Anuradhapura Woodcraft',
        desc: 'Skilled carpenters shape locally sourced timber into stunning architectural elements.',
        banner: '/images/woodcraft.png',
        filters: [ { id: 'carvings', label: 'Wood Carvings' }, { id: 'furniture', label: 'Furniture' } ],
        products: [
            { id: 401, filterId: 'carvings', title: "Traditional Raksha Mask", subtitle: "Hand-carved and painted mask.", price: "Rs. 4,500.00", rating: "4.8", reviewsCount: 124, description: "This exquisite traditional wooden mask is hand-carved by master artisans.", features: ["Hand-carved from sustainable Kaduru wood", "Painted with traditional, vibrant colors"], image: "/images/crafts/raksha_mask.jpg", subImages: ["/images/crafts/raksha_mask.jpg"] },
            { id: 402, filterId: 'furniture', title: "Carved Wooden Table", subtitle: "Small intricately carved side table.", price: "Rs. 15,000.00", rating: "4.9", reviewsCount: 45, description: "A small intricately carved wooden side table perfect for any living room.", features: ["Teak wood", "Intricate carving", "Polished finish"], image: "/images/crafts/carved_table.jpg", subImages: ["/images/crafts/carved_table.jpg"] },
            { id: 403, filterId: 'carvings', title: "Floral Wall Panel", subtitle: "Traditional Liyawela carved panel.", price: "Rs. 8,500.00", rating: "4.7", reviewsCount: 78, description: "A traditional Sri Lankan carved wooden wall panel with floral motifs.", features: ["Dark wood", "Liyawela motif", "High quality"], image: "/images/crafts/floral_panel.jpg", subImages: ["/images/crafts/floral_panel.jpg"] },
            { id: 404, filterId: 'carvings', title: "Sanni Healing Mask", subtitle: "Antique finish healing ritual mask.", price: "Rs. 5,200.00", rating: "4.8", reviewsCount: 112, description: "A traditional Sri Lankan Sanni healing mask with an antique finish.", features: ["Antique finish", "Ritual mask", "Expressive design"], image: "/images/crafts/sanni_mask.jpg", subImages: ["/images/crafts/sanni_mask.jpg"] },
            { id: 405, filterId: 'carvings', title: "Wooden Buddha Statue", subtitle: "Serene seated meditation posture.", price: "Rs. 18,000.00", rating: "5.0", reviewsCount: 231, description: "A serene, hand-carved wooden statue of Lord Buddha in a seated meditation posture.", features: ["Teak finish", "Meditation posture", "Hand-carved"], image: "/images/crafts/buddha_statue.jpg", subImages: ["/images/crafts/buddha_statue.jpg"] }
        ]
    },
    'handloom-textiles': {
        title: 'Rajarata Handloom Centres',
        desc: 'Local handloom cooperatives supporting female artisans who weave vibrant cotton fabrics.',
        banner: '/images/handloom.png',
        filters: [ { id: 'clothing', label: 'Clothing' }, { id: 'homedecor', label: 'Home Decor' } ],
        products: [
            { id: 501, filterId: 'clothing', title: "Handloom Saree", subtitle: "Beautifully woven cotton saree.", price: "Rs. 6,000.00", rating: "4.7", reviewsCount: 312, description: "A beautifully woven cotton handloom saree with vibrant traditional colors.", features: ["100% Cotton", "Handwoven", "Vibrant colors"], image: "/images/handloom.png", subImages: ["/images/handloom.png"] },
            { id: 502, filterId: 'homedecor', title: "Woven Table Runner", subtitle: "Colorful handloom table runner.", price: "Rs. 2,500.00", rating: "4.6", reviewsCount: 89, description: "A colorful handloom table runner to brighten up your dining area.", features: ["Handloom", "Durable cotton", "Washable"], image: "/images/handloom.png", subImages: ["/images/handloom.png"] }
        ]
    },
    'craft-village-tour': {
        title: 'Kala Grama Artisan Tour',
        desc: 'A guided immersive tour through dedicated artisan villages (Kala Grama) where you can interact directly with master craftspeople and support local MSME families.',
        banner: '/images/heritage_crafts.png',
        filters: [ { id: 'tickets', label: 'Tour Tickets' }, { id: 'souvenirs', label: 'Local Souvenirs' } ],
        products: [
            { id: 601, filterId: 'tickets', title: 'Standard Village Tour Ticket', subtitle: 'A half-day immersive tour.', price: 'Rs. 2,000.00', rating: '4.8', reviewsCount: 142, description: 'Experience the artisan village first-hand.', features: ['Guided tour', 'Meet artisans'], image: '/images/crafts/village_tour_ticket.jpg', subImages: ['/images/crafts/village_tour_ticket.jpg'] },
            { id: 602, filterId: 'souvenirs', title: 'Artisan Support Package', subtitle: 'Support the village and get a souvenir.', price: 'Rs. 5,000.00', rating: '4.9', reviewsCount: 56, description: 'A package that directly supports the MSME families.', features: ['Direct support', 'Handmade souvenir'], image: '/images/crafts/artisan_support_package.jpg', subImages: ['/images/crafts/artisan_support_package.jpg'] }
        ]
    },
    'pottery-workshop': {
        title: 'Hands-on Clay Workshop',
        desc: 'Learn the ancient techniques of wheel-throwing and hand-building from hereditary potters. Shape your own terracotta souvenirs.',
        banner: '/images/clay_workshop.png',
        filters: [ { id: 'classes', label: 'Workshop Classes' } ],
        products: [
            { id: 701, filterId: 'classes', title: 'Beginner Pottery Class', subtitle: 'Learn wheel-throwing basics.', price: 'Rs. 3,500.00', rating: '4.9', reviewsCount: 188, description: 'Learn the ancient techniques of wheel-throwing.', features: ['2 hour class', 'Materials provided'], image: '/images/clay_workshop.png', subImages: ['/images/clay_workshop.png'] }
        ]
    },
    'stone-carving-demo': {
        title: 'Stone Sculpting Experience',
        desc: 'Watch mesmerising demonstrations of granite carving, learning about the ancient tools, sacred geometry, and sheer patience required.',
        banner: '/images/stone_demo.png',
        filters: [ 
            { id: 'demo', label: 'Demonstrations' },
            { id: 'workshop', label: 'Hands-on Workshops' },
            { id: 'souvenir', label: 'Souvenirs & Kits' },
            { id: 'class', label: 'Design Classes' }
        ],
        products: [
            { id: 801, filterId: 'demo', title: 'Stone Carving Masterclass Demo', subtitle: 'Watch and learn from master stonemasons.', price: 'Rs. 1,500.00', rating: '4.7', reviewsCount: 115, description: 'Watch mesmerising demonstrations of granite carving, learning about the ancient tools and sheer patience required.', features: ['1 hour demo', 'Q&A session'], image: '/images/crafts/demo_masterclass.jpg', subImages: ['/images/crafts/demo_masterclass.jpg'] },
            { id: 802, filterId: 'workshop', title: 'Hands-on Granite Sculpting', subtitle: 'A half-day immersive workshop where you carve your own stone.', price: 'Rs. 5,000.00', rating: '4.9', reviewsCount: 82, description: 'Join our master artisans for a hands-on session. You will be guided through the basics of using a chisel and mallet on soft granite.', features: ['3 hour session', 'Take home your carving', 'Tools provided'], image: '/images/crafts/granite_sculpting.jpg', subImages: ['/images/crafts/granite_sculpting.jpg'] },
            { id: 803, filterId: 'souvenir', title: 'Miniature Moonstone Replica', subtitle: 'Hand-carved miniature moonstone souvenir.', price: 'Rs. 3,500.00', rating: '4.8', reviewsCount: 240, description: 'A beautifully detailed, palm-sized replica of the Anuradhapura moonstone, carved by the artisans you meet on your tour.', features: ['Hand-carved', 'Authentic design', 'Perfect gift'], image: '/images/crafts/moonstone_replica.jpg', subImages: ['/images/crafts/moonstone_replica.jpg'] },
            { id: 804, filterId: 'class', title: 'Sacred Geometry Design Class', subtitle: 'Learn the ancient mathematical principles behind the carvings.', price: 'Rs. 2,000.00', rating: '4.6', reviewsCount: 54, description: 'Before the chisel meets the stone, the design must be drawn. Learn the sacred geometry used by ancient Sri Lankan architects.', features: ['1.5 hour class', 'Drawing materials included'], image: '/images/crafts/geometry_design.jpg', subImages: ['/images/crafts/geometry_design.jpg'] },
            { id: 805, filterId: 'souvenir', title: 'Personalised Granite Nameplate', subtitle: 'Custom engraved granite plaque made during your visit.', price: 'Rs. 4,500.00', rating: '5.0', reviewsCount: 19, description: 'Commission a beautiful, custom engraved granite nameplate. Watch as the artisan carves your name in traditional Sinhalese script.', features: ['Custom engraving', 'Traditional script', 'Ready in 2 hours'], image: '/images/crafts/granite_nameplate.jpg', subImages: ['/images/crafts/granite_nameplate.jpg'] }
        ]
    },
    'reed-weaving-class': {
        title: 'Pan Weaving Masterclass',
        desc: 'Sit alongside local weavers near the ancient reservoirs to learn the delicate art of processing and braiding natural reeds into colourful mats.',
        banner: '/images/weaving_class.png',
        filters: [ { id: 'masterclass', label: 'Masterclasses' } ],
        products: [
            { id: 901, filterId: 'masterclass', title: 'Half-Day Weaving Class', subtitle: 'Learn to weave your own pan mat.', price: 'Rs. 2,500.00', rating: '4.8', reviewsCount: 95, description: 'Sit alongside local weavers and learn the delicate art of processing reeds.', features: ['Take home your mat', 'Local guide'], image: '/images/weaving_class.png', subImages: ['/images/weaving_class.png'] }
        ]
    },
    'lotus-silk-experience': {
        title: 'Lotus Silk Farm Visit',
        desc: 'Experience the magical process of transforming raw lotus stems into exquisite fabric. Understand how this unique eco-friendly enterprise provides vital income.',
        banner: '/images/lotus_farm.png',
        filters: [ { id: 'visit', label: 'Farm Visits' } ],
        products: [
            { id: 1001, filterId: 'visit', title: 'Lotus Silk Extraction Tour', subtitle: 'See the magic of lotus silk.', price: 'Rs. 3,000.00', rating: '5.0', reviewsCount: 134, description: 'Experience the magical process of transforming raw lotus stems into exquisite fabric.', features: ['Guided walk', 'Demonstration'], image: '/images/lotus_farm.png', subImages: ['/images/lotus_farm.png'] },
            { id: 1002, filterId: 'souvenir', title: 'Lotus Silk Handkerchief', subtitle: 'Woven by you during your visit.', price: 'Rs. 2,000.00', rating: '4.8', reviewsCount: 45, description: 'Support the artisans directly by purchasing a handkerchief woven during your visit.', features: ['Direct support', 'Handwoven'], image: '/images/lotus_farm.png', subImages: ['/images/lotus_farm.png'] }
        ]
    },
    'handloom-experience': {
        title: 'Rajarata Handloom & Weaving Experience',
        desc: 'Experience the art of authentic handloom weaving and natural dyeing techniques. Interact with local weavers and create your own custom woven keepsake.',
        banner: '/images/handloom_experience.png',
        filters: [ { id: 'experience', label: 'Weaving Experience' } ],
        products: [
            { id: 1101, filterId: 'experience', title: 'Handloom Weaving Session', subtitle: 'Create your own custom woven keepsake.', price: 'Rs. 3,000.00', rating: '4.7', reviewsCount: 96, description: 'Experience the art of authentic handloom weaving and natural dyeing techniques.', features: ['Interact with weavers', 'Custom keepsake'], image: '/images/handloom_experience.png', subImages: ['/images/handloom_experience.png'] }
        ]
    },
    'culinary-walk': {
        title: 'Village Culinary & Heritage Walk',
        desc: 'Walk through heritage villages and participate in traditional clay-pot culinary experiences, discovering authentic local recipes and rural living traditions.',
        banner: '/images/village_culinary.png',
        filters: [ { id: 'walk', label: 'Heritage Walks' } ],
        products: [
            { id: 1201, filterId: 'walk', title: 'Clay-pot Culinary Experience', subtitle: 'Discover authentic local recipes.', price: 'Rs. 4,500.00', rating: '4.9', reviewsCount: 210, description: 'Walk through heritage villages and participate in traditional clay-pot culinary experiences.', features: ['Rural living traditions', 'Authentic recipes'], image: '/images/village_culinary.png', subImages: ['/images/village_culinary.png'] }
        ]
    }
};

export function getProductById(id) {
    for (const categoryKey in categoryDatabase) {
        const category = categoryDatabase[categoryKey];
        if (category.products) {
            const product = category.products.find(p => String(p.id) === String(id));
            if (product) {
                return { ...product, categoryKey };
            }
        }
    }
    return null;
}
