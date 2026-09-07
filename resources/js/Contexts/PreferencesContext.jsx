import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "sps_preferences";
const defaultPreferences = { language: "en", currency: "LKR" };

const normalizeLanguage = (value) => {
    const normalized = String(value || "").toLowerCase();
    if (normalized === "sinhala" || normalized === "si") return "si";
    if (normalized === "tamil" || normalized === "ta") return "ta";
    return "en";
};

const normalizeCurrency = (value) => (value === "USD" ? "USD" : "LKR");

const readStoredPreferences = () => {
    if (typeof window === "undefined") return defaultPreferences;
    try {
        const stored = JSON.parse(
            window.localStorage.getItem(STORAGE_KEY) || "null",
        );
        if (stored)
            return {
                language: normalizeLanguage(stored.language),
                currency: normalizeCurrency(stored.currency),
            };
    } catch {
        window.localStorage.removeItem(STORAGE_KEY);
    }
    return {
        language: normalizeLanguage(
            window.localStorage.getItem("secret_places_language") ||
                window.localStorage.getItem("sps_admin_language"),
        ),
        currency: normalizeCurrency(
            window.localStorage.getItem("secret_places_currency") ||
                window.localStorage.getItem("sps_admin_currency"),
        ),
    };
};

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children, auth }) {
    const authenticatedPreferences = auth?.user
        ? {
              language: normalizeLanguage(auth.user.preferred_language),
              currency: normalizeCurrency(auth.user.preferred_currency),
          }
        : null;
    const [preferences, setPreferences] = useState(
        () => authenticatedPreferences || readStoredPreferences(),
    );

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }, [preferences]);

    const updatePreferences = async (updates) => {
        const next = {
            language: normalizeLanguage(
                updates.language ?? preferences.language,
            ),
            currency: normalizeCurrency(
                updates.currency ?? preferences.currency,
            ),
        };
        setPreferences(next);
        if (auth?.user) {
            try {
                await axios.patch("/preferences", {
                    preferred_language: next.language,
                    preferred_currency: next.currency,
                });
            } catch (error) {
                console.error("Unable to persist preferences:", error);
            }
        }
        return next;
    };

    const value = useMemo(
        () => ({
            ...preferences,
            setLanguage: (language) => updatePreferences({ language }),
            setCurrency: (currency) => updatePreferences({ currency }),
            updatePreferences,
        }),
        [preferences, auth?.user],
    );

    return (
        <PreferencesContext.Provider value={value}>
            {children}
        </PreferencesContext.Provider>
    );
}

export function usePreferences() {
    const context = useContext(PreferencesContext);
    if (!context)
        throw new Error(
            "usePreferences must be used inside PreferencesProvider",
        );
    return context;
}
