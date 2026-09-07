import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations";

const AppStateContext = createContext();

// Mock exchange rates from LKR
const EXCHANGE_RATES = {
    LKR: 1,
    USD: 0.0033, // 1 LKR = 0.0033 USD (example rate)
};

const CURRENCY_SYMBOLS = {
    LKR: "Rs",
    USD: "$",
};

export const AppStateProvider = ({ children }) => {
    const [role, setRole] = useState("customer");
    const [language, setLanguageState] = useState(() => {
        if (typeof window === "undefined") return "EN";
        return String(
            localStorage.getItem("secret_places_language") || "EN",
        ).toUpperCase();
    });
    const [currency, setCurrency] = useState(() => {
        if (typeof window === "undefined") return "LKR";
        return localStorage.getItem("secret_places_currency") || "LKR";
    });
    const [theme, setTheme] = useState("dark");

    const setLanguage = (code) => {
        const next = ["EN", "SI", "TA"].includes(String(code).toUpperCase())
            ? String(code).toUpperCase()
            : "EN";
        setLanguageState(next);
        localStorage.setItem("secret_places_language", next);
    };

    useEffect(() => {
        localStorage.setItem("secret_places_currency", currency);
        document.documentElement.lang =
            { EN: "en", SI: "si", TA: "ta" }[language] || "en";
    }, [currency, language]);

    // Sync theme with document root
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const convertPrice = (priceLKR) => {
        const rate = EXCHANGE_RATES[currency] || 1;
        const converted = priceLKR * rate;

        // Formatting logic
        if (currency === "LKR") {
            return `${CURRENCY_SYMBOLS[currency]} ${converted.toLocaleString("en-LK")}`;
        } else {
            return `${CURRENCY_SYMBOLS[currency]}${converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    };

    const t = (keyOrEnglishText) =>
        language === "EN"
            ? keyOrEnglishText
            : translations[language]?.[keyOrEnglishText] || keyOrEnglishText;

    return (
        <AppStateContext.Provider
            value={{
                role,
                setRole,
                currency,
                setCurrency,
                language,
                setLanguage,
                t,
                theme,
                setTheme,
                convertPrice,
                formatPrice: convertPrice,
            }}
        >
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error("useAppState must be used within an AppStateProvider");
    }
    return context;
};
