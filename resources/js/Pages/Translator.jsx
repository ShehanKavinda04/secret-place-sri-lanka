import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import axios from 'axios';

export default function Translator({ auth, initialTab = 'translator' }) {
    const [activeTab, setActiveTab] = useState(initialTab || 'translator');

    // --- Neural Translator State ---
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceEngine, setSourceEngine] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [serviceStatus, setServiceStatus] = useState({ checked: false, online: false, modelLoaded: false, cwgbmLoaded: false });
    const [history, setHistory] = useState([]);
    const [srcLang, setSrcLang] = useState('sin_Sinh');
    const [tgtLang, setTgtLang] = useState('eng_Latn');

    // --- CwGBM AI Forecast State ---
    const [temperature, setTemperature] = useState(28.5);
    const [dewPoint, setDewPoint] = useState(22.1);
    const [isPeakSeason, setIsPeakSeason] = useState(1);
    const [laggedDemand, setLaggedDemand] = useState(450);
    const [isPredicting, setIsPredicting] = useState(false);
    const [predictionResult, setPredictionResult] = useState(null);
    const [forecastError, setForecastError] = useState('');
    const [translatedAdvice, setTranslatedAdvice] = useState('');
    const [isTranslatingAdvice, setIsTranslatingAdvice] = useState(false);

    // Load history from localStorage & check backend health status on mount
    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem('secretplaces_translation_history');
            if (savedHistory) {
                setHistory(JSON.parse(savedHistory));
            }
        } catch (e) {
            console.error('Failed to load translation history:', e);
        }

        checkServiceStatus();
    }, []);

    const checkServiceStatus = async () => {
        try {
            const response = await axios.get('/translate/status');
            if (response.data) {
                setServiceStatus({
                    checked: true,
                    online: response.data.status === 'running',
                    modelLoaded: response.data.model_loaded ?? true,
                    cwgbmLoaded: response.data.cwgbm_loaded ?? true
                });
            }
        } catch (err) {
            setServiceStatus({ checked: true, online: false, modelLoaded: false, cwgbmLoaded: false });
        }
    };

    // Sample phrases for Translation
    const samplePhrases = [
        { label: "ආයුබෝවන්", text: "ආයුබෝවන්", desc: "Traditional Greeting" },
        { label: "ඔබට කෙසේද?", text: "ඔබට කෙසේද?", desc: "How are you?" },
        { label: "ශ්‍රී ලංකාවට සාදරයෙන් පිළිගනිමු", text: "ශ්‍රී ලංකාවට සාදරයෙන් පිළිගනිමු", desc: "Welcome to Sri Lanka" },
        { label: "කැවුම්", text: "කැවුම්", desc: "Cultural Sweetmeat" },
        { label: "දළදා පෙරහැර", text: "දළදා පෙරහැර", desc: "Sacred Tooth Procession" },
        { label: "මම ශ්‍රී ලංකාවට ආදරෙයි", text: "මම ශ්‍රී ලංකාවට ආදරෙයි", desc: "I love Sri Lanka" }
    ];

    // --- Translation Handler ---
    const handleTranslate = async (textToTranslate = inputText) => {
        const text = textToTranslate.trim();
        if (!text) return;

        setIsLoading(true);
        setError('');
        setTranslatedText('');

        try {
            const response = await axios.post('/translate', { text });
            if (response.data && response.data.translation) {
                const resText = response.data.translation;
                const engine = response.data.source || 'model';
                
                setTranslatedText(resText);
                setSourceEngine(engine);

                // Save to history
                const newEntry = {
                    id: Date.now(),
                    input: text,
                    output: resText,
                    engine: engine,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };

                const updatedHistory = [newEntry, ...history.filter(h => h.input !== text)].slice(0, 10);
                setHistory(updatedHistory);
                localStorage.setItem('secretplaces_translation_history', JSON.stringify(updatedHistory));
            } else {
                setError('Unexpected response format from translation service.');
            }
        } catch (err) {
            console.error('Translation error:', err);
            setError(err.response?.data?.error || 'Translation service is currently unavailable.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- CwGBM Forecast Handler ---
    const handlePredictDemand = async () => {
        setIsPredicting(true);
        setForecastError('');
        setPredictionResult(null);
        setTranslatedAdvice('');

        try {
            const response = await axios.post('/api/predict-demand', {
                temperature: parseFloat(temperature),
                dew_point: parseFloat(dewPoint),
                is_peak_season: parseInt(isPeakSeason),
                lagged_demand: parseFloat(laggedDemand)
            });

            if (response.data && response.data.predicted_demand !== undefined) {
                const count = response.data.predicted_demand;
                let densityLevel = 'Moderate';
                let densityColor = 'text-[#e6c875] border-[#e6c875]/40 bg-[#e6c875]/10';
                let advice = 'Expect typical visitor traffic. Recommended visiting time: 7:00 AM - 10:00 AM or 4:30 PM.';

                if (count > 600) {
                    densityLevel = 'Peak Heavy Crowd';
                    densityColor = 'text-amber-400 border-amber-500/40 bg-amber-500/15';
                    advice = 'High visitor influx predicted. Expect longer queues at sacred stupas. Early morning visits recommended.';
                } else if (count < 300) {
                    densityLevel = 'Light Crowd / Peaceful';
                    densityColor = 'text-emerald-300 border-emerald-500/40 bg-emerald-500/15';
                    advice = 'Serene and quiet environment. Ideal for quiet meditation and photography.';
                }

                setPredictionResult({
                    predicted_demand: count,
                    densityLevel,
                    densityColor,
                    advice,
                    model_used: response.data.model_used || 'cwgbm_model.pkl'
                });
            } else {
                setForecastError('Unexpected response from AI forecast engine.');
            }
        } catch (err) {
            console.error('Forecast error:', err);
            setForecastError(err.response?.data?.message || 'Failed to generate CwGBM crowd prediction.');
        } finally {
            setIsPredicting(false);
        }
    };

    // Translate English Forecast Advice to Sinhala using Neural Model
    const handleTranslateAdviceToSinhala = async () => {
        if (!predictionResult || !predictionResult.advice) return;
        setIsTranslatingAdvice(true);
        try {
            const response = await axios.post('/translate', { text: predictionResult.advice });
            if (response.data && response.data.translation) {
                setTranslatedAdvice(response.data.translation);
            }
        } catch (err) {
            console.error('Advice translation error:', err);
        } finally {
            setIsTranslatingAdvice(false);
        }
    };

    const handleCopy = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSpeak = (text) => {
        if (!text || !window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('secretplaces_translation_history');
    };

    const swapLanguages = () => {
        setSrcLang(prev => prev === 'sin_Sinh' ? 'eng_Latn' : 'sin_Sinh');
        setTgtLang(prev => prev === 'eng_Latn' ? 'sin_Sinh' : 'eng_Latn');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#081b18] via-[#0c2420] to-[#05110f] text-[#f2f7f5] font-sans antialiased selection:bg-amber-400 selection:text-slate-950 flex flex-col">
            <Head title="AI Intelligence & Cultural Translator | SecretPlaces Sri Lanka" />
            
            <Navbar auth={auth} />

            {/* Main Container */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
                
                {/* Hero Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative text-center space-y-4 pt-2"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Unified AI Engine (`model.safetensors` & `cwgbm_model.pkl`)
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 tracking-tight">
                        AI Travel & Cultural Intelligence Suite
                    </h1>

                    <p className="max-w-2xl mx-auto text-sm sm:text-base text-emerald-100/80 leading-relaxed font-sansDisplay">
                        Explore authentic Sri Lankan heritage with neural language translation (`model.safetensors`) and predictive tourist crowd forecasting (`cwgbm_model.pkl`).
                    </p>

                    {/* Navigation Tab Bar */}
                    <div className="flex items-center justify-center gap-3 pt-4">
                        <div className="bg-[#051613] p-1.5 rounded-2xl border border-emerald-500/30 flex items-center gap-2 shadow-xl">
                            <button
                                onClick={() => setActiveTab('translator')}
                                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 ${
                                    activeTab === 'translator'
                                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md'
                                        : 'text-emerald-200/80 hover:text-white hover:bg-emerald-500/10'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m0 2.25c0 3.107 1.002 6.012 2.766 8.384m-4.502-1.921A11.96 11.96 0 0 1 3 5.621m15-1.996a48.474 48.474 0 0 0-6-.371" />
                                </svg>
                                <span>Neural Cultural Translator</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('forecast')}
                                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 ${
                                    activeTab === 'forecast'
                                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md'
                                        : 'text-emerald-200/80 hover:text-white hover:bg-emerald-500/10'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                </svg>
                                <span>CwGBM Visitor Demand Forecast</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* --- TAB 1: NEURAL CULTURAL TRANSLATOR --- */}
                {activeTab === 'translator' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-10"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0c2a25]/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                            {/* Input Column */}
                            <div className="lg:col-span-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                                        <span className="font-display font-bold text-sm text-amber-300 uppercase tracking-wider">
                                            {srcLang === 'sin_Sinh' ? 'Sinhala (සිංහල)' : 'English'}
                                        </span>
                                    </div>

                                    <button 
                                        onClick={swapLanguages}
                                        className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-amber-300 transition-all flex items-center gap-1.5 text-xs font-semibold"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                        </svg>
                                        <span>Swap</span>
                                    </button>
                                </div>

                                <div className="relative">
                                    <textarea
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        maxLength={500}
                                        rows={6}
                                        placeholder={srcLang === 'sin_Sinh' ? "මෙහි සිංහල වාක්‍යයක් හෝ වචනයක් ටයිප් කරන්න (e.g. ඔබට කෙසේද? හෝ දළදා පෙරහැර)..." : "Type English phrase here..."}
                                        className="w-full bg-[#051613] border border-emerald-500/30 rounded-2xl p-4 text-base text-[#FAF9F6] placeholder-emerald-200/30 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-none shadow-inner"
                                    />
                                    
                                    <div className="absolute bottom-3 right-3 flex items-center gap-3">
                                        <span className="text-[11px] text-emerald-200/50">{inputText.length}/500</span>
                                        {inputText && (
                                            <button
                                                onClick={() => { setInputText(''); setTranslatedText(''); setError(''); }}
                                                className="text-xs text-emerald-200 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md transition-colors"
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2 pt-1">
                                    <div className="text-xs font-semibold text-emerald-200/80">Try cultural sample phrases:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {samplePhrases.map((chip, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => { setInputText(chip.text); handleTranslate(chip.text); }}
                                                className="group px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs text-amber-200 transition-all flex items-center gap-1.5"
                                            >
                                                <span>{chip.label}</span>
                                                <span className="text-[10px] text-emerald-200/50 group-hover:text-amber-200">({chip.desc})</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleTranslate()}
                                    disabled={isLoading || !inputText.trim()}
                                    className="w-full py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-xl hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                >
                                    {isLoading ? <span>Processing with model.safetensors...</span> : <span>Translate Now</span>}
                                </button>
                            </div>

                            {/* Output Column */}
                            <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between pb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                                            <span className="font-display font-bold text-sm text-amber-300 uppercase tracking-wider">
                                                {tgtLang === 'eng_Latn' ? 'English Output' : 'Sinhala Output'}
                                            </span>
                                        </div>

                                        {sourceEngine && (
                                            <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                                                sourceEngine === 'glossary' 
                                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                                                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                            }`}>
                                                {sourceEngine === 'glossary' ? 'Cultural Glossary Match' : 'Neural AI Model (`model.safetensors`)'}
                                            </span>
                                        )}
                                    </div>

                                    <div className="bg-[#051613] border border-emerald-500/30 rounded-2xl p-5 min-h-[170px] relative flex flex-col justify-between">
                                        {translatedText ? (
                                            <>
                                                <p className="text-xl font-medium text-white leading-relaxed">{translatedText}</p>
                                                <div className="flex items-center justify-between pt-4 mt-4 border-t border-emerald-500/20">
                                                    <div className="flex items-center gap-3">
                                                        <button onClick={() => handleSpeak(translatedText)} className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-amber-300 text-xs font-semibold flex items-center gap-1">Listen</button>
                                                        <button onClick={() => handleCopy(translatedText)} className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-amber-300 text-xs font-semibold flex items-center gap-1">{copied ? 'Copied!' : 'Copy Result'}</button>
                                                    </div>
                                                    <span className="text-[11px] text-emerald-200/60 font-mono">Confidence: High</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-36 text-center space-y-2 text-emerald-200/40">
                                                <p className="text-sm font-sansDisplay">Translation output will appear here.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs">
                                        <span className="font-bold text-red-300">Engine Error:</span> {error}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent History */}
                        <div className="bg-[#0c2a25]/80 border border-emerald-500/20 rounded-3xl p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-display font-bold text-lg text-amber-300">Recent Translations</h3>
                                {history.length > 0 && <button onClick={clearHistory} className="text-xs text-emerald-200/60 hover:text-amber-300">Clear History</button>}
                            </div>
                            {history.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {history.map(item => (
                                        <div key={item.id} onClick={() => { setInputText(item.input); setTranslatedText(item.output); }} className="p-3.5 rounded-xl bg-[#051613] hover:bg-[#08201b] border border-emerald-500/20 cursor-pointer space-y-1">
                                            <div className="text-xs text-amber-200/80">{item.input}</div>
                                            <div className="text-sm font-medium text-white">{item.output}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : <p className="text-xs text-emerald-200/50">No saved history yet.</p>}
                        </div>
                    </motion.div>
                )}

                {/* --- TAB 2: CwGBM AI VISITOR DEMAND FORECAST --- */}
                {activeTab === 'forecast' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                    >
                        {/* Forecast Control Panel */}
                        <div className="lg:col-span-6 bg-[#0c2a25]/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
                            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
                                <div>
                                    <h2 className="font-display font-bold text-xl text-amber-300">CwGBM Forecast Parameters</h2>
                                    <p className="text-xs text-emerald-200/70">CatBoost Gradient Boosting AI Model (`cwgbm_model.pkl`)</p>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-amber-300">
                                    {serviceStatus.cwgbmLoaded ? 'Model Loaded' : 'Algorithmic Fallback'}
                                </span>
                            </div>

                            {/* Preset Buttons */}
                            <div className="space-y-1.5">
                                <span className="text-xs font-semibold text-emerald-200/80">Quick Forecast Scenarios:</span>
                                <div className="flex flex-wrap gap-2">
                                    <button 
                                        onClick={() => { setTemperature(24.0); setDewPoint(18.0); setIsPeakSeason(0); setLaggedDemand(220); }}
                                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs text-amber-200"
                                    >
                                        Cool Off-Peak Day
                                    </button>
                                    <button 
                                        onClick={() => { setTemperature(33.5); setDewPoint(25.0); setIsPeakSeason(1); setLaggedDemand(780); }}
                                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs text-amber-200"
                                    >
                                        Hot Peak Festival
                                    </button>
                                    <button 
                                        onClick={() => { setTemperature(28.5); setDewPoint(22.1); setIsPeakSeason(1); setLaggedDemand(450); }}
                                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs text-amber-200"
                                    >
                                        Typical Anuradhapura
                                    </button>
                                </div>
                            </div>

                            {/* Sliders */}
                            <div className="space-y-4 pt-2">
                                <div>
                                    <div className="flex justify-between text-xs font-bold text-amber-300 mb-1">
                                        <span>Temperature (°C)</span>
                                        <span>{temperature}°C</span>
                                    </div>
                                    <input 
                                        type="range" min="15.0" max="42.0" step="0.5"
                                        value={temperature} onChange={(e) => setTemperature(e.target.value)}
                                        className="w-full accent-amber-400 bg-[#051613] rounded-lg h-2"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-bold text-amber-300 mb-1">
                                        <span>Dew Point (°C)</span>
                                        <span>{dewPoint}°C</span>
                                    </div>
                                    <input 
                                        type="range" min="10.0" max="32.0" step="0.5"
                                        value={dewPoint} onChange={(e) => setDewPoint(e.target.value)}
                                        className="w-full accent-amber-400 bg-[#051613] rounded-lg h-2"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-bold text-amber-300 mb-1">
                                        <span>Seasonality</span>
                                        <span>{isPeakSeason ? 'Peak Season' : 'Off-Peak Season'}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        <button
                                            onClick={() => setIsPeakSeason(0)}
                                            className={`py-2 rounded-xl text-xs font-bold border transition-all ${!isPeakSeason ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-[#051613] text-emerald-200 border-emerald-500/30'}`}
                                        >
                                            Off-Peak Season
                                        </button>
                                        <button
                                            onClick={() => setIsPeakSeason(1)}
                                            className={`py-2 rounded-xl text-xs font-bold border transition-all ${isPeakSeason ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-[#051613] text-emerald-200 border-emerald-500/30'}`}
                                        >
                                            Peak Season
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-bold text-amber-300 mb-1">
                                        <span>Historical Base Demand (Visitors)</span>
                                        <span>{laggedDemand} visitors</span>
                                    </div>
                                    <input 
                                        type="range" min="100" max="1000" step="10"
                                        value={laggedDemand} onChange={(e) => setLaggedDemand(e.target.value)}
                                        className="w-full accent-amber-400 bg-[#051613] rounded-lg h-2"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handlePredictDemand}
                                disabled={isPredicting}
                                className="w-full py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-xl hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                            >
                                {isPredicting ? <span>Computing Gradient Boosting AI Prediction...</span> : <span>Compute CwGBM AI Forecast</span>}
                            </button>

                            {forecastError && (
                                <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs">
                                    {forecastError}
                                </div>
                            )}
                        </div>

                        {/* Forecast Results Dashboard */}
                        <div className="lg:col-span-6 space-y-6">
                            <div className="bg-[#0c2a25]/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl min-h-[420px] flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                                        <h3 className="font-display font-bold text-lg text-amber-300">Predicted Visitor Demand</h3>
                                        <span className="text-xs text-emerald-200/60 font-mono">CwGBM Engine</span>
                                    </div>

                                    {predictionResult ? (
                                        <div className="space-y-6 pt-4">
                                            {/* Big Prediction Number */}
                                            <div className="flex items-baseline gap-3">
                                                <span className="text-5xl sm:text-6xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
                                                    {predictionResult.predicted_demand}
                                                </span>
                                                <span className="text-base text-emerald-200/80 font-medium">Estimated Visitors / Day</span>
                                            </div>

                                            {/* Crowd Level Badge */}
                                            <div className="flex items-center gap-2">
                                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${predictionResult.densityColor}`}>
                                                    {predictionResult.densityLevel}
                                                </span>
                                            </div>

                                            {/* Advisory Note */}
                                            <div className="p-4 rounded-2xl bg-[#051613] border border-emerald-500/30 space-y-2">
                                                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">AI Travel Guidance (English)</div>
                                                <p className="text-sm text-white/90 leading-relaxed">{predictionResult.advice}</p>
                                            </div>

                                            {/* Translate Advice Button powered by model.safetensors */}
                                            <div className="pt-2">
                                                <button
                                                    onClick={handleTranslateAdviceToSinhala}
                                                    disabled={isTranslatingAdvice}
                                                    className="w-full py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-amber-300 text-xs font-bold transition-all flex items-center justify-center gap-2"
                                                >
                                                    {isTranslatingAdvice ? (
                                                        <span>Translating to Sinhala with `model.safetensors`...</span>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m0 2.25c0 3.107 1.002 6.012 2.766 8.384m-4.502-1.921A11.96 11.96 0 0 1 3 5.621m15-1.996a48.474 48.474 0 0 0-6-.371" />
                                                            </svg>
                                                            <span>Translate Advice to Sinhala (`model.safetensors`)</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            {translatedAdvice && (
                                                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                                                    <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Sinhala Translation</div>
                                                    <p className="text-base text-amber-200 font-medium">{translatedAdvice}</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-64 text-center space-y-3 text-emerald-200/40">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                            </svg>
                                            <p className="text-sm font-sansDisplay">Adjust sliders and click 'Compute CwGBM AI Forecast' to see live predictions.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

            </main>

            <Footer />
        </div>
    );
}
