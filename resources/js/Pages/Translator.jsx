import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import axios from 'axios';

export default function Translator({ auth }) {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceEngine, setSourceEngine] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [serviceStatus, setServiceStatus] = useState({ checked: false, online: false, modelLoaded: false });
    const [history, setHistory] = useState([]);
    const [srcLang, setSrcLang] = useState('sin_Sinh');
    const [tgtLang, setTgtLang] = useState('eng_Latn');

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
                    modelLoaded: response.data.model_loaded ?? true
                });
            }
        } catch (err) {
            setServiceStatus({ checked: true, online: false, modelLoaded: false });
        }
    };

    const samplePhrases = [
        { label: "ආයුබෝවන්", text: "ආයුබෝවන්", desc: "Traditional Greeting" },
        { label: "ඔබට කෙසේද?", text: "ඔබට කෙසේද?", desc: "How are you?" },
        { label: "ශ්‍රී ලංකාවට සාදරයෙන් පිළිගනිමු", text: "ශ්‍රී ලංකාවට සාදරයෙන් පිළිගනිමු", desc: "Welcome to Sri Lanka" },
        { label: "කැවුම්", text: "කැවුම්", desc: "Cultural Sweetmeat" },
        { label: "දළදා පෙරහැර", text: "දළදා පෙරහැර", desc: "Sacred Tooth Procession" },
        { label: "මම ශ්‍රී ලංකාවට ආදරෙයි", text: "මම ශ්‍රී ලංකාවට ආදරෙයි", desc: "I love Sri Lanka" }
    ];

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
            setError(err.response?.data?.error || 'Translation service is currently unavailable. Please ensure the Python API is running.');
        } finally {
            setIsLoading(false);
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
            <Head title="Cultural AI Translator | SecretPlaces Sri Lanka" />
            
            <Navbar auth={auth} />

            {/* Main Container */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
                
                {/* Hero Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative text-center space-y-4 pt-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Neural AI Model (`model.safetensors`) & Cultural Engine
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 tracking-tight">
                        Sinhala - English Cultural Translator
                    </h1>

                    <p className="max-w-2xl mx-auto text-sm sm:text-base text-emerald-100/80 leading-relaxed font-sansDisplay">
                        Bridge language barriers and explore authentic Sri Lankan heritage. Powered by custom fine-tuned transformer models and an enriched cultural glossary.
                    </p>

                    {/* Status Badge */}
                    <div className="flex items-center justify-center gap-3 pt-2">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
                            serviceStatus.online 
                                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' 
                                : 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                        }`}>
                            <span className={`w-2 h-2 rounded-full ${serviceStatus.online ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`}></span>
                            <span>AI Engine: {serviceStatus.online ? 'Online & Ready' : 'Standby / Local API'}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Translation Workbench */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0c2a25]/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden"
                >
                    {/* Decorative Background Glows */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Input Column */}
                    <div className="lg:col-span-6 space-y-4">
                        {/* Control Header */}
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
                                title="Swap source and target languages"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                </svg>
                                <span>Swap</span>
                            </button>
                        </div>

                        {/* Text Area */}
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
                                <span className="text-[11px] text-emerald-200/50">
                                    {inputText.length}/500
                                </span>
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

                        {/* Quick Sample Chips */}
                        <div className="space-y-2 pt-1">
                            <div className="text-xs font-semibold text-emerald-200/80">Try cultural sample phrases:</div>
                            <div className="flex flex-wrap gap-2">
                                {samplePhrases.map((chip, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setInputText(chip.text);
                                            handleTranslate(chip.text);
                                        }}
                                        className="group px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs text-amber-200 transition-all flex items-center gap-1.5"
                                    >
                                        <span>{chip.label}</span>
                                        <span className="text-[10px] text-emerald-200/50 group-hover:text-amber-200">({chip.desc})</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={() => handleTranslate()}
                            disabled={isLoading || !inputText.trim()}
                            className="w-full py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-xl hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-amber-500/10"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Processing with model.safetensors...</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m0 2.25c0 3.107 1.002 6.012 2.766 8.384m-4.502-1.921A11.96 11.96 0 0 1 3 5.621m15-1.996a48.474 48.474 0 0 0-6-.371" />
                                    </svg>
                                    <span>Translate Now</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Output Column */}
                    <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
                        <div>
                            {/* Header */}
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

                            {/* Output Box */}
                            <div className="bg-[#051613] border border-emerald-500/30 rounded-2xl p-5 min-h-[170px] relative flex flex-col justify-between">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center h-36 space-y-3">
                                        <div className="w-10 h-10 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
                                        <p className="text-xs text-amber-200/70 font-mono">Running Seq2Seq Neural Model...</p>
                                    </div>
                                ) : translatedText ? (
                                    <>
                                        <p className="text-xl font-medium text-white leading-relaxed">
                                            {translatedText}
                                        </p>

                                        {/* Action Bar */}
                                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-emerald-500/20">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleSpeak(translatedText)}
                                                    className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-amber-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                                                    title="Listen to pronunciation"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.287a6 6 0 0 1 0 8.426M7.5 14.25 5.106 11.856A1.5 1.5 0 0 0 4.045 11.414H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1.045a1.5 1.5 0 0 0 1.06-.442L7.5 12.75v1.5Z" />
                                                    </svg>
                                                    <span>Listen</span>
                                                </button>

                                                <button
                                                    onClick={() => handleCopy(translatedText)}
                                                    className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-amber-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.741c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                                    </svg>
                                                    <span>{copied ? 'Copied!' : 'Copy Result'}</span>
                                                </button>
                                            </div>

                                            <span className="text-[11px] text-emerald-200/60 font-mono">
                                                Confidence: High
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-36 text-center space-y-2 text-emerald-200/40">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m0 2.25c0 3.107 1.002 6.012 2.766 8.384m-4.502-1.921A11.96 11.96 0 0 1 3 5.621m15-1.996a48.474 48.474 0 0 0-6-.371" />
                                        </svg>
                                        <p className="text-sm font-sansDisplay">Translation output will appear here.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Error Notice */}
                        {error && (
                            <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs space-y-1">
                                <div className="font-bold text-red-300 flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <span>Translation Engine Warning</span>
                                </div>
                                <p>{error}</p>
                            </div>
                        )}

                        {/* Cultural Context Note */}
                        {sourceEngine === 'glossary' && (
                            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs space-y-1">
                                <span className="font-bold text-amber-300">Cultural Insight:</span>
                                <p className="text-amber-200/80">
                                    This term is preserved from the Sinhala Cultural Glossary (v3) to ensure authentic cultural nuance and heritage context.
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* History & Feature Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                    
                    {/* Recent Translations History */}
                    <div className="lg:col-span-7 bg-[#0c2a25]/80 border border-emerald-500/20 rounded-3xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-display font-bold text-lg text-amber-300 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span>Recent Translations</span>
                            </h3>

                            {history.length > 0 && (
                                <button
                                    onClick={clearHistory}
                                    className="text-xs text-emerald-200/60 hover:text-amber-300 hover:underline"
                                >
                                    Clear History
                                </button>
                            )}
                        </div>

                        {history.length > 0 ? (
                            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                                {history.map((item) => (
                                    <div 
                                        key={item.id}
                                        onClick={() => {
                                            setInputText(item.input);
                                            setTranslatedText(item.output);
                                            setSourceEngine(item.engine);
                                        }}
                                        className="p-3.5 rounded-xl bg-[#051613] hover:bg-[#08201b] border border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer transition-all space-y-1"
                                    >
                                        <div className="flex items-center justify-between text-xs text-emerald-200/60">
                                            <span>{item.timestamp}</span>
                                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-amber-300">
                                                {item.engine === 'glossary' ? 'Glossary' : 'AI Model'}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium text-amber-200">{item.input}</div>
                                        <div className="text-sm text-white/90">{item.output}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-center text-xs text-emerald-200/50">
                                No recent translations saved yet. Your query history will appear here.
                            </div>
                        )}
                    </div>

                    {/* Architecture Feature Cards */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="p-6 rounded-3xl bg-[#0c2a25]/80 border border-emerald-500/20 space-y-3">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-amber-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                </svg>
                            </div>
                            <h4 className="font-display font-bold text-base text-amber-300">Fine-Tuned `model.safetensors`</h4>
                            <p className="text-xs text-emerald-200/70 leading-relaxed">
                                Built with PyTorch and HuggingFace Transformers (`AutoModelForSeq2SeqLM`), tailored specifically for Sinhala to English translation.
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-[#0c2a25]/80 border border-emerald-500/20 space-y-3">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-amber-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                                </svg>
                            </div>
                            <h4 className="font-display font-bold text-base text-amber-300">Cultural Glossary Integration</h4>
                            <p className="text-xs text-emerald-200/70 leading-relaxed">
                                Instant lookup of 50+ traditional Sinhala heritage terms (foods, rituals, architecture) to prevent loss of cultural context during travel.
                            </p>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
