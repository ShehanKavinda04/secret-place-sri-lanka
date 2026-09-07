import React, { useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icon for the user
const userIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

function MapController({
    spotLocation,
    searchedLocation,
    nearbySites,
    userLocation,
    mapLocations,
}) {
    const map = useMap();

    useEffect(() => {
        const boundsLocations = [];
        if (spotLocation) boundsLocations.push(spotLocation);
        if (searchedLocation)
            boundsLocations.push([searchedLocation.lat, searchedLocation.lng]);

        nearbySites?.forEach((site) => {
            if (site.lat && site.lng)
                boundsLocations.push([site.lat, site.lng]);
        });

        if (userLocation) boundsLocations.push(userLocation);

        mapLocations?.forEach((location) => {
            if (location.latitude && location.longitude) {
                boundsLocations.push([location.latitude, location.longitude]);
            }
        });

        if (boundsLocations.length > 1) {
            const bounds = L.latLngBounds(boundsLocations);
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
        } else if (boundsLocations.length === 1) {
            map.flyTo(boundsLocations[0], 16);
        }
    }, [
        spotLocation,
        searchedLocation,
        nearbySites,
        userLocation,
        mapLocations,
        map,
    ]);

    return null;
}

export default function InteractiveMap({
    spot,
    searchedLocation,
    userLocation,
    locations = [],
    routeCoordinates = [],
    selectedLocation,
}) {
    const spotLocation =
        spot && spot.lat && spot.lng ? [spot.lat, spot.lng] : null;
    const nearbySites = spot?.nearby_sites || [];

    if (
        !spotLocation &&
        !searchedLocation &&
        !userLocation &&
        locations.length === 0
    ) {
        return (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500">
                Coordinates not available for {spot?.name || "this location"}.
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={spotLocation || searchedLocation || [7.8731, 80.7718]}
                zoom={16}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%", zIndex: 1 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController
                    spotLocation={spotLocation}
                    searchedLocation={searchedLocation}
                    nearbySites={nearbySites}
                    userLocation={userLocation}
                    mapLocations={locations}
                />

                {userLocation && (
                    <Marker position={userLocation} icon={userIcon}>
                        <Popup>Your live location</Popup>
                    </Marker>
                )}

                {/* Spot Marker */}
                {spotLocation && (
                    <Marker position={spotLocation}>
                        <Popup>
                            <div className="font-bold">{spot.name}</div>
                            <div className="text-xs text-slate-500">
                                Sacred Site
                            </div>
                        </Popup>
                    </Marker>
                )}

                {/* Nearby Sites Markers */}
                {nearbySites.map((site, index) =>
                    site.lat && site.lng ? (
                        <Marker key={index} position={[site.lat, site.lng]}>
                            <Popup>
                                <div className="font-bold">{site.name}</div>
                                <div className="text-xs text-slate-500">
                                    Nearby Site ({site.distance} km)
                                </div>
                            </Popup>
                        </Marker>
                    ) : null,
                )}

                {locations.map((location) => (
                    <Marker
                        key={`${location.type}-${location.id}`}
                        position={[location.latitude, location.longitude]}
                    >
                        <Popup>
                            <div className="font-bold">{location.name}</div>
                            <div className="text-xs text-slate-500">
                                {location.category} · {location.distance_km} km
                                away
                            </div>
                            {location.description && (
                                <div className="text-xs mt-1">
                                    {location.description}
                                </div>
                            )}
                        </Popup>
                    </Marker>
                ))}

                {routeCoordinates.length > 1 && (
                    <Polyline
                        positions={routeCoordinates}
                        pathOptions={{
                            color: "#d0b471",
                            weight: 5,
                            opacity: 0.85,
                        }}
                    />
                )}

                {/* Searched Location Marker */}
                {searchedLocation && (
                    <Marker
                        position={[searchedLocation.lat, searchedLocation.lng]}
                    >
                        <Popup>
                            <div className="font-bold">Searched Location</div>
                            <div className="text-xs text-slate-500">
                                {searchedLocation.name}
                            </div>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
}
