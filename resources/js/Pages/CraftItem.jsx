import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { useState } from 'react';
import { ShoppingCart, Star, ShieldCheck, Truck, ArrowLeft, Heart } from 'lucide-react';

export default function CraftItem({ auth, itemId, laravelVersion, phpVersion }) {
    // Mocking the specific product details based on the item ID 401 (Traditional Wooden Mask)
    // If it's a different item, we would ideally fetch this from a database, 
    // but for the UI design we'll use a rich mock dataset.
    const product = {
        id: itemId,
        title: "Traditional Wooden Mask",
        subtitle: "Hand-carved and painted mask, depicting ancient Sri Lankan folklore.",
        price: "Rs. 4,500.00",
        rating: 4.8,
        reviewsCount: 124,
        description: "This exquisite traditional wooden mask is hand-carved by master artisans in Anuradhapura using locally sourced Kaduru wood. These masks are historically used in healing rituals (Kolam and Thovil) and traditional dances. Each vibrant color is carefully applied by hand, representing different characters from Sri Lankan mythology. It serves as a beautiful wall hanging that brings cultural heritage and protection into your home.",
        features: [
            "Hand-carved from sustainable Kaduru wood",
            "Painted with traditional, vibrant colors",
            "Dimensions: 14\" x 8\" x 4\"",
            "Ready to hang with an attached loop on the back"
        ],
        mainImage: "/images/woodcraft.png",
        subImages: [
            "/images/woodcraft.png",
            "/images/crafts/stone_elephant.png",
            "/images/crafts/pillar.png",
            "/images/crafts/guardstone.png"
        ]
    };

    const relatedProducts = [
        { id: 402, title: "Carved Wooden Table", subtitle: "Small intricately carved side table.", price: "Rs. 15,000.00", rating: "4.9 stars", image: "/images/woodcraft.png" },
        { id: 105, title: "Stone Carved Elephant", subtitle: "Decorative wall plaque featuring the royal elephant.", price: "Rs. 6,500.00", rating: "4.8 stars", image: "/images/crafts/stone_elephant.png" },
        { id: 104, title: "Lotus Pillar Capital", subtitle: "Traditional Pekada design stone pillar top.", price: "Rs. 8,000.00", rating: "4.7 stars", image: "/images/crafts/pillar.png" },
        { id: 201, title: "Traditional Pan Padura", subtitle: "Handwoven reed mat featuring vibrant geometric patterns.", price: "Rs. 4,500.00", rating: "4.9 stars", image: "/images/crafts/reed_mat.png" }
    ];

    const [activeImage, setActiveImage] = useState(product.mainImage);
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (type) => {
        if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
        if (type === 'inc') setQuantity(quantity + 1);
    };

    return (
        <>
            <Head title={`${product.title} - Handcrafted Treasures`} />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />

                <main className="flex-grow max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link href="/crafts/wood-carving" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-royalMaroon-900 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Wood Carving
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            {/* Image Gallery Section */}
                            <div className="w-full md:w-1/2 p-6 md:p-8 bg-slate-50 flex flex-col items-center">
                                {/* Main Image */}
                                <div className="w-full aspect-square rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200 mb-6 flex items-center justify-center p-4">
                                    <img 
                                        src={activeImage} 
                                        alt={product.title} 
                                        className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-300"
                                    />
                                </div>
                                {/* Sub Images (Thumbnails) */}
                                <div className="flex gap-4 justify-center w-full">
                                    {product.subImages.map((img, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setActiveImage(img)}
                                            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeImage === img ? 'border-royalMaroon-900 shadow-md scale-105' : 'border-slate-200 hover:border-royalMaroon-500'}`}
                                        >
                                            <img src={img} alt={`Thumbnail ${idx+1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Product Details Section */}
                            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
                                <div className="mb-6 border-b border-slate-100 pb-6">
                                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-3">{product.title}</h1>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center text-amber-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300'}`} />
                                            ))}
                                        </div>
                                        <span className="text-sm text-slate-500 font-medium">{product.rating} Rating ({product.reviewsCount} Reviews)</span>
                                    </div>
                                    <p className="text-3xl font-bold text-royalMaroon-950 mb-2">{product.price}</p>
                                    <p className="text-slate-500 text-sm">{product.subtitle}</p>
                                </div>

                                <div className="mb-8">
                                    <h3 className="font-bold text-slate-900 mb-3 text-lg">Description</h3>
                                    <p className="text-slate-600 leading-relaxed text-[15px] mb-6">
                                        {product.description}
                                    </p>
                                    
                                    <h3 className="font-bold text-slate-900 mb-3 text-[15px]">Key Features</h3>
                                    <ul className="list-disc pl-5 text-slate-600 space-y-1.5 text-[15px]">
                                        {product.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Order Controls */}
                                <div className="mt-auto">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex items-center gap-3 mr-2">
                                            <span className="text-sm font-bold text-slate-800">Quantity :</span>
                                            <div className="flex items-center bg-[#FDF9F6] rounded-md overflow-hidden h-10 border border-[#EBE3DC]">
                                                <button onClick={() => handleQuantityChange('dec')} className="px-3.5 text-slate-700 hover:bg-[#F2E8E0] transition-colors h-full flex items-center justify-center font-bold text-lg">-</button>
                                                <span className="w-8 text-center font-bold text-slate-900">{quantity}</span>
                                                <button onClick={() => handleQuantityChange('inc')} className="px-3.5 text-slate-700 hover:bg-[#F2E8E0] transition-colors h-full flex items-center justify-center font-bold text-lg">+</button>
                                            </div>
                                        </div>
                                        
                                        <button className="flex-1 bg-[#6A4D42] hover:bg-[#5C4136] text-white font-medium py-3 px-8 rounded-full shadow-sm flex items-center justify-center gap-2 transition-all">
                                            Add to cart
                                        </button>
                                        <button className="w-12 h-12 rounded-full bg-[#6A4D42] hover:bg-[#5C4136] text-white flex items-center justify-center shrink-0 transition-all shadow-sm">
                                            <Heart className="w-5 h-5" />
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm text-slate-500 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                            <span>Authentic Craftsmanship</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Truck className="w-5 h-5 text-blue-600" />
                                            <span>Island-wide Delivery</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seller Information & Customer Reviews */}
                    <div className="mt-8 flex flex-col gap-6 w-full max-w-[800px]">
                        {/* Seller Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <h3 className="text-[15px] font-semibold text-slate-800 mb-4">Seller Information</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0">
                                    <img src="/images/woodcraft.png" alt="Anusha Perera" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Pottery Shop by Anusha Perera</h4>
                                    <p className="text-slate-500 text-[13px] mt-0.5">Passionate potter from Kandy, bringing generations of craft to your home.</p>
                                </div>
                            </div>
                        </div>

                        {/* Customer Reviews */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <h3 className="text-[15px] font-semibold text-slate-800 mb-1">Customer Reviews</h3>
                            <div className="flex items-center gap-2 mb-5">
                                <div className="flex text-[#FFC107]">
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 text-slate-200 fill-current" />
                                </div>
                                <span className="text-[11px] text-slate-500 font-medium ml-1">4.0 out of 5</span>
                            </div>

                            <div className="space-y-4">
                                {/* Review 1 */}
                                <div className="border-t border-slate-100 pt-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-bold text-slate-900 text-[13px]">Nimali Perera</h4>
                                        <div className="flex text-[#FFC107]">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <Star className="w-3.5 h-3.5 text-slate-200 fill-current" />
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-[12px] leading-relaxed">Absolutely stunning! The craftsmanship is incredible, and it looks even more beautiful in person. Arrived safely packaged.</p>
                                </div>

                                {/* Review 2 */}
                                <div className="border-t border-slate-100 pt-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-bold text-slate-900 text-[13px]">Rajiv de Silva</h4>
                                        <div className="flex text-[#FFC107]">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <Star className="w-3.5 h-3.5 text-slate-200 fill-current" />
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-[12px] leading-relaxed">A lovely piece of art. My only minor issue was that the color was slightly different from the photos, but I still love it.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Items Section */}
                    <div className="mt-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-display font-bold text-slate-900">Similar Masterpieces</h2>
                            <Link href="/crafts/wood-carving" className="text-sm font-bold text-royalMaroon-900 hover:text-royalMaroon-700 transition-colors">View All &rarr;</Link>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map(rel => (
                                <Link href={`/crafts/item/${rel.id}`} key={rel.id} className="block bg-white rounded-xl border border-slate-200 p-3 flex flex-col group cursor-pointer hover:shadow-md transition-shadow">
                                    <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-slate-50">
                                        <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="mt-4 flex flex-col flex-1">
                                        <h3 className="font-bold text-slate-800 text-[15px] mb-1 leading-tight group-hover:text-royalMaroon-900 transition-colors">{rel.title}</h3>
                                        <span className="text-[11.5px] text-slate-500 line-clamp-1 mb-2">{rel.subtitle}</span>
                                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                                            <span className="text-[13px] font-bold text-slate-900">{rel.price}</span>
                                            <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{rel.rating}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </main>
                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </>
    );
}
