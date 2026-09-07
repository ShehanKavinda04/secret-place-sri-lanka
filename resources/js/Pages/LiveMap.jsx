import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import InteractiveMap from "@/Components/InteractiveMap";
import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";

const FALLBACK_LOCATION = { lat: 8.3453, lng: 80.3883 };

export default function LiveMap({ auth, laravelVersion, phpVersion }) {
    const [position, setPosition] = useState(null);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [status, setStatus] = useState("requesting");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isUsingFallback, setIsUsingFallback] = useState(false);

    const loadNearbyLocations = async (coordinates, fallback = false) => {
        const response = await axios.get("/api/nearby-locations", {
            params: {
                lat: coordinates.lat,
                lng: coordinates.lng,
                radius_km: 25,
            },
        });
        const nextLocations = response.data.locations || [];
        setLocations(nextLocations);
        setSelectedLocation((current) => current || nextLocations[0] || null);
        setIsUsingFallback(fallback);
        return nextLocations;
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setStatus("unavailable");
            setError(
                "Live location is not supported by this browser. You can still explore the Anuradhapura map below.",
            );
            return undefined;
        }

        const handlePosition = (nextPosition) => {
            setPosition({
                lat: nextPosition.coords.latitude,
                lng: nextPosition.coords.longitude,
            });
            setStatus("ready");
            setError("");
        };

        const handleError = (geolocationError) => {
            const permissionDenied = geolocationError.code === 1;
            setStatus(permissionDenied ? "denied" : "unavailable");
            setError(
                permissionDenied
                    ? "Location permission was denied. Enable location access in your browser to see nearby places, or explore the Anuradhapura map below."
                    : "Your current location could not be determined. You can still explore the Anuradhapura map below.",
            );
        };

        const watchId = navigator.geolocation.watchPosition(
            handlePosition,
            handleError,
            {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 15000,
            },
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        if (!position && status === "requesting") return;

        let cancelled = false;
        setIsLoading(true);

        loadNearbyLocations(position || FALLBACK_LOCATION, !position)
            .then((nextLocations) => {
                if (!cancelled && position && nextLocations.length === 0) {
                    return loadNearbyLocations(FALLBACK_LOCATION, true);
                }
                return nextLocations;
            })
            .catch(() => {
                if (!cancelled)
                    setError(
                        "Nearby places could not be loaded right now. Please try again shortly.",
                    );
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [position, status]);

    const mapPosition = position || [
        FALLBACK_LOCATION.lat,
        FALLBACK_LOCATION.lng,
    ];
    const routeCoordinates = useMemo(
        () =>
            selectedLocation
                ? [
                      [
                          mapPosition.lat ?? mapPosition[0],
                          mapPosition.lng ?? mapPosition[1],
                      ],
                      [selectedLocation.latitude, selectedLocation.longitude],
                  ]
                : [],
        [mapPosition, selectedLocation],
    );

    return (
        <div className="min-h-screen bg-[#0d131a] text-white flex flex-col">
            <Head title="Live Map & Smart Routing - SecretPlaces Sri Lanka" />
            <Navbar auth={auth} />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="mb-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#d0b471] font-semibold">
                        Map Your Journey
                    </p>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2">
                        Live Location & Smart Routing
                    </h1>
                    <p className="text-white/70 max-w-2xl mt-3 leading-relaxed">
                        Discover sacred sites and local businesses near you.
                        Select a destination to see a direct route from your
                        live position.
                    </p>
                </div>

                {error && (
                    <div
                        className="mb-6 rounded-xl border border-[#d0b471]/40 bg-[#39505c]/60 px-4 py-3 text-sm text-[#f1d891]"
                        role="status"
                    >
                        {error}
                    </div>
                )}

                <div className="grid lg:grid-cols-[minmax(0,1fr)_22rem] gap-6">
                    <div className="h-[480px] sm:h-[600px] rounded-2xl overflow-hidden border border-[#d0b471]/30 shadow-2xl">
                        <InteractiveMap
                            userLocation={
                                position ? [position.lat, position.lng] : null
                            }
                            searchedLocation={{
                                ...FALLBACK_LOCATION,
                                name: "Anuradhapura",
                            }}
                            locations={locations}
                            routeCoordinates={routeCoordinates}
                            selectedLocation={selectedLocation}
                        />
                    </div>

                    <aside className="rounded-2xl border border-[#d0b471]/30 bg-[#121d25] p-5 h-fit">
                        <div className="flex items-center justify-between gap-3 mb-5">
                            <h2 className="font-display text-xl text-[#f1d891]">
                                Nearby Places
                            </h2>
                            <span className="text-xs text-white/60">25 km</span>
                        </div>
                        {status === "requesting" && (
                            <p className="text-sm text-white/60">
                                Requesting your location...
                            </p>
                        )}
                        {isLoading && (
                            <p className="text-sm text-white/60 mb-3">
                                Updating nearby places...
                            </p>
                        )}
                        {isUsingFallback && !isLoading && (
                            <p className="text-xs text-[#f1d891] mb-3">
                                Showing Anuradhapura sites to help you plan your
                                journey.
                            </p>
                        )}
                        <div className="space-y-3 max-h-[480px] overflow-y-auto">
                            {locations.map((location) => (
                                <button
                                    key={`${location.type}-${location.id}`}
                                    type="button"
                                    onClick={() =>
                                        setSelectedLocation(location)
                                    }
                                    className={`w-full text-left rounded-xl border p-3 transition-colors ${selectedLocation?.id === location.id && selectedLocation?.type === location.type ? "border-[#d0b471] bg-[#39505c]" : "border-white/10 bg-white/5 hover:border-[#d0b471]/60"}`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <span className="font-semibold text-sm">
                                            {location.name}
                                        </span>
                                        <span className="text-xs text-[#d0b471] whitespace-nowrap">
                                            {location.distance_km} km
                                        </span>
                                    </div>
                                    <span className="block text-xs text-white/50 mt-1 capitalize">
                                        {location.type === "sacred_site"
                                            ? "Sacred site"
                                            : location.category}
                                    </span>
                                    {location.description && (
                                        <span className="block text-xs text-white/65 mt-2 line-clamp-2">
                                            {location.description}
                                        </span>
                                    )}
                                </button>
                            ))}
                            {status !== "requesting" &&
                                !isLoading &&
                                locations.length === 0 && (
                                    <p className="text-sm text-white/60">
                                        No nearby locations were found within 25
                                        km.
                                    </p>
                                )}
                        </div>
                        {status === "denied" && (
                            <Link
                                href="/places"
                                className="inline-block mt-5 text-sm text-[#d0b471] hover:text-white"
                            >
                                Browse sacred sites
                            </Link>
                        )}
                    </aside>
                </div>
            </main>

            <Footer
                auth={auth}
                laravelVersion={laravelVersion}
                phpVersion={phpVersion}
            />
        </div>
    );
}
