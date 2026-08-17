import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { TrendingUp, DollarSign, Package, Activity, Info, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export default function SmartPricing({ auth, laravelVersion, phpVersion }) {
    const [price, setPrice] = useState(15000); // Default to a middle value in 2k-50k range
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    // Debounced API call for real-time updates
    useEffect(() => {
        const fetchPredictions = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const response = await axios.post('/api/smart-pricing/predict', {
                    price: parseFloat(price)
                });

                if (response.data.status === 'success') {
                    setResults({
                        demand: response.data.expected_demand,
                        revenue: response.data.expected_profit // Mapping profit from AI to 'revenue'
                    });
                } else {
                    setError(response.data.message || 'An error occurred while fetching predictions.');
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Connection error. Ensure AI Engine is running.');
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            if (price >= 2000 && price <= 50000) {
                fetchPredictions();
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(debounceTimer);
    }, [price]);

    return (
        <>
            <Head title="Smart Price Optimization - Secret Place Sri Lanka" />
            
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
                <Navbar auth={auth} />

                <main className="flex-grow max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
                    
                    {/* Header Section */}
                    <div className="mb-10 text-center max-w-2xl mx-auto">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4">
                            <TrendingUp className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                            Smart Price Optimization
                        </h1>
                        <p className="text-base text-slate-600">
                            Harness the power of AI to determine the optimal price point for your hotel rooms and packages based on historical price elasticity and booking demand curves.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Input Panel */}
                        <div className="lg:col-span-5 w-full bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-blue-600" />
                                Set Target Price
                            </h2>
                            
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-slate-700 mb-2 flex justify-between">
                                    <span>Room Rate per Night (Rs.)</span>
                                    <span className="text-blue-600 font-bold">Rs. {Number(price).toLocaleString()}</span>
                                </label>
                                
                                <input 
                                    type="range" 
                                    min="2000" 
                                    max="50000" 
                                    step="500"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                
                                <div className="flex justify-between text-xs text-slate-400 mt-2">
                                    <span>Rs. 2,000</span>
                                    <span>Rs. 50,000</span>
                                </div>
                            </div>
                            
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Exact Price Entry</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-slate-500 font-medium">Rs.</span>
                                    </div>
                                    <input
                                        type="number"
                                        min="2000"
                                        max="50000"
                                        step="100"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-800 leading-relaxed">
                                    Dragging the slider dynamically updates the AI projections in real-time.
                                </p>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="lg:col-span-7 w-full">
                            <div className="bg-[#0a1128] rounded-3xl shadow-xl border border-slate-800 p-8 text-white h-full relative overflow-hidden">
                                
                                {/* Background glow effect */}
                                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
                                
                                <h2 className="text-xl font-bold text-white mb-8 relative z-10 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-blue-400" />
                                    AI Predictions
                                </h2>
                                
                                {error ? (
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative z-10 min-h-[300px]">
                                        <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
                                        <h3 className="text-lg font-medium text-red-200 mb-2">Prediction Failed</h3>
                                        <p className="text-sm text-red-300/80">{error}</p>
                                    </div>
                                ) : !results && loading ? (
                                    <div className="border border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative z-10 min-h-[300px]">
                                        <div className="w-10 h-10 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                                        <p className="text-slate-300 font-medium animate-pulse">Running machine learning models...</p>
                                    </div>
                                ) : results ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                        
                                        {/* Expected Demand Card */}
                                        <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700 p-6 flex flex-col transition-all">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2.5 bg-blue-500/20 rounded-xl">
                                                    <Package className="w-5 h-5 text-blue-400" />
                                                </div>
                                                <span className="text-slate-300 font-medium">Expected Demand</span>
                                            </div>
                                            <div className="mt-auto">
                                                <div className="flex items-end gap-2">
                                                    <span className="text-4xl font-bold text-white font-display">
                                                        {results.demand.toLocaleString('en-US', {maximumFractionDigits: 1})}
                                                    </span>
                                                </div>
                                                <div className="text-slate-400 font-medium mt-1">Units/Bookings per month</div>
                                            </div>
                                        </div>

                                        {/* Projected Revenue Card */}
                                        <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700 p-6 flex flex-col transition-all">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2.5 bg-green-500/20 rounded-xl">
                                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                                </div>
                                                <span className="text-slate-300 font-medium">Projected Revenue</span>
                                            </div>
                                            <div className="mt-auto">
                                                <div className="flex items-end gap-2">
                                                    <span className="text-3xl font-bold text-white font-display">
                                                        Rs. {results.revenue.toLocaleString('en-US', {maximumFractionDigits: 2})}
                                                    </span>
                                                </div>
                                                <div className="text-slate-400 font-medium mt-1">Calculated Total</div>
                                            </div>
                                        </div>

                                        {/* AI Insight */}
                                        <div className="md:col-span-2 bg-gradient-to-r from-blue-500/10 to-transparent rounded-2xl border border-blue-500/20 p-5 mt-4">
                                            <h4 className="text-blue-400 font-bold text-sm mb-2 uppercase tracking-wider flex items-center gap-2">
                                                <Activity className="w-4 h-4" /> AI Insight
                                            </h4>
                                            <p className="text-slate-300 text-sm leading-relaxed">
                                                Based on the elasticity curve, setting the room price at <strong>Rs. {Number(price).toLocaleString()}</strong> yields an estimated revenue of <strong>Rs. {results.revenue.toLocaleString('en-US', {maximumFractionDigits: 2})}</strong>. If demand elasticity is high, small price reductions could significantly boost total booking volume.
                                            </p>
                                        </div>
                                    </div>
                                ) : null}
                                
                                {loading && results && (
                                    <div className="absolute top-6 right-6 z-20">
                                        <div className="w-5 h-5 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </main>
                
                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </>
    );
}
