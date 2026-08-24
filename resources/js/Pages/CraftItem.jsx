import { Head, Link, useForm, router } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { useState, useEffect } from 'react';
import { categoryDatabase } from '../data/craftsDatabase';
import { ShoppingCart, Star, ShieldCheck, Truck, ArrowLeft, Heart, Send } from 'lucide-react';
import PriceDisplay from '@/Utils/PriceFormatter';

export default function CraftItem({ auth, item: initialItem, laravelVersion, phpVersion }) {
    const [product, setProduct] = useState(initialItem);
    const [activeImage, setActiveImage] = useState(product.image);
    const [quantity, setQuantity] = useState(1);

    // Sync product state when initialItem changes (e.g. after a form submission refresh)
    useEffect(() => {
        setProduct(initialItem);
    }, [initialItem]);

    // Setup Laravel Echo for real-time updates
    useEffect(() => {
        if (window.Echo) {
            const channel = window.Echo.channel(`craft-item.${product.id}`);
            channel.listen('CraftItemUpdated', (e) => {
                setProduct(e.craftItem);
            });
            
            return () => {
                channel.stopListening('CraftItemUpdated');
                window.Echo.leaveChannel(`craft-item.${product.id}`);
            };
        }
    }, [product.id]);

    useEffect(() => {
        setActiveImage(product.image);
        setQuantity(1);
    }, [product.image, product.id]);

    const handleQuantityChange = (type) => {
        if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
        if (type === 'inc') setQuantity(quantity + 1);
    };

    const categoryKey = product.category_key || 'rajarata-pottery';
    const allCategoryProducts = categoryDatabase[categoryKey]?.products || [];
    let relatedProducts = allCategoryProducts.filter(p => p.id !== product.id).slice(0, 4);
    
    if (relatedProducts.length === 0) {
        relatedProducts = [
            { id: 402, title: "Carved Wooden Table", subtitle: "Small intricately carved side table.", price: "Rs. 15,000.00", rating: "4.9", image: "/images/woodcraft.png" },
            { id: 105, title: "Stone Carved Elephant", subtitle: "Decorative wall plaque featuring the royal elephant.", price: "Rs. 6,500.00", rating: "4.8", image: "/images/crafts/stone_elephant.png" }
        ];
    }

    // Review Form setup
    const { data, setData, post, processing, reset, errors } = useForm({
        reviewer_name: '',
        rating: 5,
        comment: ''
    });

    const submitReview = (e) => {
        e.preventDefault();
        post(`/crafts/item/${product.id}/reviews`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                router.reload({ only: ['item'] });
            }
        });
    };

    return (
        <>
            <Head title={`${product.title} - Handcrafted Treasures`} />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />

                <main className="flex-grow max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link href={`/crafts/${product.category_key || 'wood-carving'}`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-royalMaroon-900 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to {product.category_key ? product.category_key.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Wood Carving'}
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
                                    {product.sub_images && product.sub_images.map((img, idx) => (
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
                                        <span className="text-sm text-slate-500 font-medium">{product.rating} Rating ({product.reviews_count} Reviews)</span>
                                    </div>
                                    <p className="text-3xl font-bold text-royalMaroon-950 mb-2"><PriceDisplay amount={product.price} /></p>
                                    <p className="text-slate-500 text-sm">{product.subtitle}</p>
                                </div>

                                <div className="mb-8">
                                    <h3 className="font-bold text-slate-900 mb-3 text-lg">Description</h3>
                                    <p className="text-slate-600 leading-relaxed text-[15px] mb-6">
                                        {product.description}
                                    </p>
                                    
                                    <h3 className="font-bold text-slate-900 mb-3 text-[15px]">Key Features</h3>
                                    <ul className="list-disc pl-5 text-slate-600 space-y-1.5 text-[15px]">
                                        {product.features && product.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Order Controls */}
                                <div className="mt-auto">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex items-center gap-3 mr-4">
                                            <span className="text-[15px] font-bold text-slate-900">Quantity :</span>
                                            <div className="flex items-center bg-white rounded-lg h-[42px] border border-slate-200/80 shadow-sm">
                                                <button onClick={() => handleQuantityChange('dec')} className="w-10 text-slate-800 hover:bg-slate-50 transition-colors h-full flex items-center justify-center font-bold text-lg">-</button>
                                                <span className="w-8 text-center font-bold text-slate-900 text-[15px]">{quantity}</span>
                                                <button onClick={() => handleQuantityChange('inc')} className="w-10 text-slate-800 hover:bg-slate-50 transition-colors h-full flex items-center justify-center font-bold text-lg">+</button>
                                            </div>
                                        </div>
                                        
                                        <Link href={`/checkout?item=${product.id}&qty=${quantity}`} className="flex-1 bg-craft-brown hover:bg-craft-brown-dark text-white text-[15px] font-medium h-[42px] px-8 rounded-full shadow-sm flex items-center justify-center transition-all">
                                            Add to cart
                                        </Link>
                                        <button className="w-[42px] h-[42px] rounded-full bg-craft-brown hover:bg-craft-brown-dark text-white flex items-center justify-center shrink-0 transition-all shadow-sm">
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
                                    <img src={product.seller_avatar || "/images/woodcraft.png"} alt="Seller Avatar" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">
                                        {product.seller_name}
                                    </h4>
                                    <p className="text-slate-500 text-[13px] mt-0.5">
                                        {product.seller_description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Customer Reviews */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <h3 className="text-[15px] font-semibold text-slate-800 mb-1">Customer Reviews</h3>
                            <div className="flex items-center gap-2 mb-5">
                                <div className="flex text-[#FFC107]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200 fill-current'}`} />
                                    ))}
                                </div>
                                <span className="text-[11px] text-slate-500 font-medium ml-1">{product.rating} out of 5</span>
                            </div>

                            <div className="space-y-4">
                                {product.reviews && product.reviews.length > 0 ? (
                                    product.reviews.map((review) => (
                                        <div key={review.id} className="border-t border-slate-100 pt-4">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-bold text-slate-900 text-[13px]">{review.reviewer_name}</h4>
                                                <div className="flex text-[#FFC107]">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-slate-200 fill-current'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-slate-400 text-[12px] leading-relaxed">{review.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500 italic py-2">No reviews yet. Be the first to review!</p>
                                )}
                            </div>
                            
                            {/* Write a Review */}
                            <div className="border-t border-slate-100 pt-6 mt-6">
                                <h4 className="font-bold text-slate-800 text-[14px] mb-4">Write a Review</h4>
                                <form onSubmit={submitReview} className="space-y-4">
                                    <div>
                                        <label className="block text-[12px] font-semibold text-slate-700 mb-1">Your Name</label>
                                        <input 
                                            type="text" 
                                            value={data.reviewer_name}
                                            onChange={e => setData('reviewer_name', e.target.value)}
                                            className="w-full text-sm border-slate-200 rounded-lg focus:ring-royalMaroon-500 focus:border-royalMaroon-500"
                                            placeholder="Enter your name"
                                            required
                                        />
                                        {errors.reviewer_name && <p className="text-red-500 text-xs mt-1">{errors.reviewer_name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-semibold text-slate-700 mb-1">Rating</label>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    type="button"
                                                    key={star}
                                                    onClick={() => setData('rating', star)}
                                                    className={`p-1 transition-colors ${data.rating >= star ? 'text-[#FFC107]' : 'text-slate-200 hover:text-[#FFC107]'}`}
                                                >
                                                    <Star className="w-6 h-6 fill-current" />
                                                </button>
                                            ))}
                                        </div>
                                        {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-semibold text-slate-700 mb-1">Your Review</label>
                                        <textarea 
                                            value={data.comment}
                                            onChange={e => setData('comment', e.target.value)}
                                            className="w-full text-sm border-slate-200 rounded-lg focus:ring-royalMaroon-500 focus:border-royalMaroon-500 min-h-[80px]"
                                            placeholder="Share your experience with this item..."
                                            required
                                        />
                                        {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment}</p>}
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-6 py-2.5 rounded-lg flex items-center transition-colors disabled:opacity-50"
                                    >
                                        {processing ? 'Submitting...' : 'Submit Review'}
                                        <Send className="w-4 h-4 ml-2" />
                                    </button>
                                </form>
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
                                            <span className="text-[13px] font-bold text-slate-900"><PriceDisplay amount={rel.price} /></span>
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
