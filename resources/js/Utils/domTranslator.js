import { translations } from "../translations";

// Regex helper to check if a string contains non-trivial alphabetic English words
const HAS_LETTERS = /[a-zA-Z]{2,}/;

/**
 * Translates a single text string using dictionary lookups, exact matches,
 * or phrase-based substring replacements.
 */
export function translateText(text, lang = "EN") {
    if (!text || lang === "EN") return text;
    const dict = translations[lang] || {};

    const trimmed = text.trim();
    if (!trimmed) return text;

    // 1. Exact match lookup
    if (dict[trimmed]) {
        return text.replace(trimmed, dict[trimmed]);
    }

    // 2. Case-insensitive exact lookup
    const lowerTrimmed = trimmed.toLowerCase();
    for (const [key, val] of Object.entries(dict)) {
        if (key.toLowerCase() === lowerTrimmed) {
            return text.replace(trimmed, val);
        }
    }

    // 3. Multi-word phrase replacements for compound texts
    let processed = text;
    let modified = false;

    // Sort dictionary keys by descending length so longer phrases match first
    const sortedKeys = Object.keys(dict).sort((a, b) => b.length - a.length);

    for (const key of sortedKeys) {
        if (key.length > 3 && processed.includes(key)) {
            processed = processed.replaceAll(key, dict[key]);
            modified = true;
        }
    }

    return modified ? processed : text;
}

/**
 * Traverses a DOM tree or reacts to live mutations, translating visible text nodes
 * while caching original English text in a WeakMap.
 */
class DOMTranslator {
    constructor() {
        this.originalTextMap = new WeakMap();
        this.currentLang = "EN";
        this.observer = null;
        this.isApplying = false;
    }

    init() {
        // React and useTranslation handle all component and UI text reactivity
    }

    setLanguage(lang) {
        this.currentLang = lang;
    }

    applyTranslation(rootNode, lang) {
        // Handled by React components via useTranslation
    }

    restoreOriginals(rootNode) {
        // Handled by React components via useTranslation
    }
}

export const globalTranslator = new DOMTranslator();

