import { Link } from "@inertiajs/react";

export default function PortalBrandHeader({ roleLabel, className = "" }) {
    return (
        <Link
            href="/"
            title="Back to SecretPlaces home"
            className={`flex items-center gap-3 min-w-0 ${className}`}
        >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-royalGold-600 via-royalGold-400 to-royalGold-300 flex items-center justify-center shadow-md border border-royalGold-300/30 shrink-0">
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
            <div className="min-w-0">
                <span className="block font-display text-xl font-bold tracking-wider text-royalGold-300 truncate">
                    SecretPlaces
                </span>
                <span className="block text-xs text-royalGold-300/70 truncate">
                    {roleLabel}
                </span>
            </div>
        </Link>
    );
}
