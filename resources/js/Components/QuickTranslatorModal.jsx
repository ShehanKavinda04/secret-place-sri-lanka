import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function QuickTranslatorModal({ isOpen, onClose }) {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceEngine, setSourceEngine] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const samplePhrases = [
        "ආයුබෝවන්",
        "ඔබට කෙසේද?",
        "ශ්‍රී ලංකාවට සාදරයෙන් පිළිගනිමු",
        "කැවුම්",
        "දළදා පෙරහැර"
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
                setTranslatedText(response.data.translation);
                setSourceEngine(response.data.source || 'model');
            } else {
                setError('Unexpected response format from translation service.');
            }
        } catch (err) {
            console.error('Translation error:', err);
            setError(err.response?.data?.error || 'Translation service unavailable. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        if (!translatedText) return;
        navigator.clipboard.writeText(translatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSpeak = () => {
        if (!translatedText || !window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(translatedText);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="w-full max-w-xl bg-gradient-to-b from-[#0c2a25] via-[#091f1c] to-[#051412] border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden text-[#f2f7f5]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/20 bg-[#071a17]/80">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m0 2.25c0 3.107 1.002 6.012 2.766 8.384m-4.502-1.921A11.96 11.96 0 0 1 3 5.621m15-1.996a48.474 48.474 0 0 0-6-.371" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-lg text-amber-300">Quick AI Translator</h3>
                                <p className="text-xs text-emerald-200/70">Sinhala (sin_Sinh) → English (eng_Latn)</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-amber-300 transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-4">
                        {/* Sample Chips */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold text-emerald-200/70">Quick phrases:</span>
                            {samplePhrases.map((phrase, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setInputText(phrase);
                                        handleTranslate(phrase);
                                    }}
                                    className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 text-amber-200 transition-all"
                                >
                                    {phrase}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div>
                            <label className="block text-xs font-bold text-amber-300 mb-1.5 uppercase tracking-wider">
                                Sinhala Input
                            </label>
                            <div className="relative">
                                <textarea
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="මෙහි සිංහලෙන් ටයිප් කරන්න (e.g. ඔබට කෙසේද?)..."
                                    rows={3}
                                    className="w-full bg-[#051613] border border-emerald-500/30 rounded-xl px-4 py-3 text-sm text-[#FAF9F6] placeholder-emerald-200/30 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-none"
                                />
                                {inputText && (
                                    <button
                                        onClick={() => { setInputText(''); setTranslatedText(''); setError(''); }}
                                        className="absolute top-2.5 right-2.5 text-xs text-emerald-200 hover:text-white px-2 py-0.5 rounded bg-white/10 hover:bg-white/20"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={() => handleTranslate()}
                            disabled={isLoading || !inputText.trim()}
                            className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Translating with AI Model...</span>
                                </>
                            ) : (
                                <span>Translate Text</span>
                            )}
                        </button>

                        {/* Error Alert */}
                        {error && (
                            <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Output Result Card */}
                        {translatedText && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-[#051613] border border-emerald-500/30 space-y-2 relative"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                                        English Translation
                                    </span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                                        sourceEngine === 'glossary' 
                                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    }`}>
                                        {sourceEngine === 'glossary' ? 'Cultural Glossary' : 'Neural AI Model'}
                                    </span>
                                </div>

                                <p className="text-base font-medium text-white leading-relaxed pt-1">
                                    {translatedText}
                                </p>

                                <div className="flex items-center justify-end gap-3 pt-2 border-t border-emerald-500/20">
                                    <button
                                        onClick={handleSpeak}
                                        className="flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 transition-colors"
                                        title="Listen to pronunciation"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.287a6 6 0 0 1 0 8.426M7.5 14.25 5.106 11.856A1.5 1.5 0 0 0 4.045 11.414H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1.045a1.5 1.5 0 0 0 1.06-.442L7.5 12.75v1.5Z" />
                                        </svg>
                                        <span>Listen</span>
                                    </button>
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.741c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                        </svg>
                                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
