import { useAppState } from "../Context/AppStateContext";
import { translations } from "../translations";
import { translateText } from "../Utils/domTranslator";

/**
 * Custom React hook for i18n translation
 * Provides current language, t() helper, setLanguage, and translation dictionaries.
 */
export function useTranslation() {
    const { language, setLanguage } = useAppState();

    const t = (keyOrEnglishText, fallback) => {
        if (!keyOrEnglishText) return "";
        if (language === "EN") return keyOrEnglishText;

        const dict = translations[language] || {};
        const trimmed = typeof keyOrEnglishText === "string" ? keyOrEnglishText.trim() : "";
        
        if (dict[trimmed]) {
            return dict[trimmed];
        }

        if (fallback) return fallback;

        // Perform smart phrase/sub-match translation
        return translateText(keyOrEnglishText, language);
    };

    return {
        t,
        language,
        setLanguage,
        isSinhala: language === "SI",
        isTamil: language === "TA",
        isEnglish: language === "EN",
    };
}

export default useTranslation;
