import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import QuickTranslatorModal from "@/Components/QuickTranslatorModal";
import { useAppState } from "@/Context/AppStateContext";

export default function Navbar({ auth = {} }) {
    const [isTranslatorOpen, setIsTranslatorOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { url } = usePage();
    const { language, currency, setLanguage, setCurrency } = useAppState();

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [url]);

    const handleSectionClick = (event, sectionId) => {
        setIsMobileMenuOpen(false);
        if (window.location.pathname === "/") {
            event.preventDefault();
            window.dispatchEvent(
                new CustomEvent("manual-loader", { detail: { duration: 600 } }),
            );
            setTimeout(
                () =>
                    document
                        .getElementById(sectionId)
                        ?.scrollIntoView({ behavior: "smooth" }),
                100,
            );
        }
    };

    const getRoute = (name, fallback) => {
        try {
            return typeof route === "function" ? String(route(name)) : fallback;
        } catch (e) {
            return fallback;
        }
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-royalMaroon-800 border-b border-royalGold-600/20 text-[#FAF9F6] sticky top-0 z-50 shadow-md"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-royalGold-600 via-royalGold-400 to-royalGold-300 flex items-center justify-center shadow-md border border-royalGold-300/30">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-7 h-7 text-royalMaroon-950"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v5.25H6a.75.75 0 0 0 0 1.5h5.25V18a.75.75 0 0 0 1.5 0v-5.25H18a.75.75 0 0 0 0-1.5h-5.25V6Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span className="font-display text-xl font-bold tracking-wider text-royalGold-300">
                            SecretPlaces
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-semibold tracking-wide text-royalGold-300/90">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/#hero"
                            onClick={(e) => {
                                if (window.location.pathname === "/") {
                                    e.preventDefault();
                                    window.dispatchEvent(
                                        new CustomEvent("manual-loader", {
                                            detail: { duration: 600 },
                                        }),
                                    );
                                    setTimeout(
                                        () =>
                                            document
                                                .getElementById("hero")
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                }),
                                        100,
                                    );
                                }
                            }}
                            className="hover:text-royalGold-300 transition-colors"
                        >
                            Home
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/#categories"
                            onClick={(e) => {
                                if (window.location.pathname === "/") {
                                    e.preventDefault();
                                    window.dispatchEvent(
                                        new CustomEvent("manual-loader", {
                                            detail: { duration: 600 },
                                        }),
                                    );
                                    setTimeout(
                                        () =>
                                            document
                                                .getElementById("categories")
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                }),
                                        100,
                                    );
                                }
                            }}
                            className="hover:text-royalGold-300 transition-colors"
                        >
                            Categories
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/#smart-routing"
                            onClick={(e) => {
                                if (window.location.pathname === "/") {
                                    e.preventDefault();
                                    window.dispatchEvent(
                                        new CustomEvent("manual-loader", {
                                            detail: { duration: 600 },
                                        }),
                                    );
                                    setTimeout(
                                        () =>
                                            document
                                                .getElementById("smart-routing")
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                }),
                                        100,
                                    );
                                }
                            }}
                            className="hover:text-royalGold-300 transition-colors"
                        >
                            Map
                        </motion.a>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                prefetch
                                href="/about-us"
                                className="hover:text-royalGold-300 transition-colors"
                            >
                                About Us
                            </Link>
                        </motion.div>
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-1 rounded-full border border-royalGold-500/30 bg-royalMaroon-900/30 p-1 text-[10px] font-bold text-royalGold-300">
                            {["LKR", "USD"].map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setCurrency(value)}
                                    className={`rounded-full px-2 py-1 transition-colors ${currency === value ? "bg-royalGold-500 text-royalMaroon-950" : "hover:bg-royalGold-500/20"}`}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                        <div className="hidden sm:flex items-center gap-1 rounded-full border border-royalGold-500/30 bg-royalMaroon-900/30 p-1 text-[10px] font-bold text-royalGold-300">
                            {["EN", "SI", "TA"].map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setLanguage(value)}
                                    className={`rounded-full px-2 py-1 uppercase transition-colors ${language === value ? "bg-royalGold-500 text-royalMaroon-950" : "hover:bg-royalGold-500/20"}`}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen((open) => !open)}
                            className="md:hidden p-2 rounded-lg text-royalGold-300 hover:bg-royalGold-500/10 transition-colors"
                            aria-label="Toggle navigation menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                )}
                            </svg>
                        </button>

                        {/* Quick Translator Overlay Button */}
                        <button
                            onClick={() => setIsTranslatorOpen(true)}
                            className="px-3.5 py-2 rounded-full bg-royalGold-500/10 hover:bg-royalGold-500/20 border border-royalGold-500/30 text-royalGold-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
                            title="Quick AI Translator"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-royalGold-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m0 2.25c0 3.107 1.002 6.012 2.766 8.384m-4.502-1.921A11.96 11.96 0 0 1 3 5.621m15-1.996a48.474 48.474 0 0 0-6-.371"
                                />
                            </svg>
                            <span className="hidden sm:inline">
                                Quick Translate
                            </span>
                        </button>

                        {auth && auth.user ? (
                            <Link
                                prefetch
                                href="/profile"
                                className="w-[42px] h-[42px] rounded-full overflow-hidden border-2 border-royalGold-500/50 hover:border-royalGold-400 hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] transition-all bg-[#D1D5DB] flex items-center justify-center shrink-0"
                                title="My Profile"
                            >
                                <svg
                                    className="w-full h-full"
                                    viewBox="0 0 100 100"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="50"
                                        cy="38"
                                        r="22"
                                        fill="#9CA3AF"
                                    />
                                    <path
                                        d="M15 100C15 75 30 65 50 65C70 65 85 75 85 100"
                                        fill="#9CA3AF"
                                    />
                                </svg>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={getRoute("login", "/login")}
                                    className="text-sm font-semibold text-royalGold-400 hover:text-royalGold-300"
                                >
                                    Log In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </motion.header>

            {isMobileMenuOpen && (
                <motion.nav
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="md:hidden bg-royalMaroon-800 border-b border-royalGold-600/20 px-4 py-3 space-y-1 text-sm font-semibold text-royalGold-300"
                >
                    <a
                        href="/#hero"
                        onClick={(event) => handleSectionClick(event, "hero")}
                        className="block px-3 py-2 rounded-lg hover:bg-royalGold-500/10"
                    >
                        Home
                    </a>
                    <a
                        href="/#categories"
                        onClick={(event) =>
                            handleSectionClick(event, "categories")
                        }
                        className="block px-3 py-2 rounded-lg hover:bg-royalGold-500/10"
                    >
                        Categories
                    </a>
                    <a
                        href="/#smart-routing"
                        onClick={(event) =>
                            handleSectionClick(event, "smart-routing")
                        }
                        className="block px-3 py-2 rounded-lg hover:bg-royalGold-500/10"
                    >
                        Map
                    </a>
                    <Link
                        href="/about-us"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-royalGold-500/10"
                    >
                        About Us
                    </Link>
                    {auth && auth.user ? (
                        <Link
                            href="/profile"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg hover:bg-royalGold-500/10"
                        >
                            Profile
                        </Link>
                    ) : (
                        <Link
                            href={getRoute("login", "/login")}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg hover:bg-royalGold-500/10"
                        >
                            Log In
                        </Link>
                    )}
                </motion.nav>
            )}

            <QuickTranslatorModal
                isOpen={isTranslatorOpen}
                onClose={() => setIsTranslatorOpen(false)}
            />
        </>
    );
}
