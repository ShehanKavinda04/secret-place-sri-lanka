import { motion } from "framer-motion";
import { useTranslation } from "@/Hooks/useTranslation";

export default function Footer({ auth, laravelVersion, phpVersion }) {
    const { t } = useTranslation();

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#0f4a45] text-[#FAF9F6] py-10 flex flex-col items-center justify-center space-y-4"
        >
            <div className="flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm text-gray-200 font-medium tracking-wide">
                <a href="#hero" className="hover:text-white transition-colors">
                    {t("Home")}
                </a>
                <span className="text-gray-400 opacity-70">|</span>
                <a
                    href="/translator"
                    className="text-royalGold-400 hover:text-white transition-colors"
                >
                    {t("AI Cultural Translator")}
                </a>
                <span className="text-gray-400 opacity-70">|</span>
                <a
                    href="#features"
                    className="hover:text-white transition-colors"
                >
                    {t("Features")}
                </a>
                <span className="text-gray-400 opacity-70">|</span>
                <a
                    href="#discover"
                    className="hover:text-white transition-colors"
                >
                    {t("Explorer Desk")}
                </a>
                <span className="text-gray-400 opacity-70">|</span>
                <a
                    href="#newsletter"
                    className="hover:text-white transition-colors"
                >
                    {t("Adventure Club")}
                </a>
            </div>

            <div className="text-gray-300 text-xs font-light text-center px-4 max-w-2xl">
                {t(
                    "Discover responsibly. Respect local cultures, protect historical sights, and practice strict waste management to preserve the natural beauty of the island.",
                )}
            </div>

            <div className="text-gray-200 text-xs font-medium text-center">
                © {new Date().getFullYear()} SecretPlaces Sri Lanka.{" "}
                {t("Coordinated with love by Local Nomads.")}
            </div>

            {(laravelVersion || phpVersion) && (
                <div className="font-mono text-[9px] text-gray-400/60 mt-2">
                    Powered by Laravel{" "}
                    {laravelVersion ? `v${laravelVersion}` : ""}{" "}
                    {phpVersion ? `(PHP v${phpVersion})` : ""} • React + Inertia
                </div>
            )}
        </motion.footer>
    );
}
