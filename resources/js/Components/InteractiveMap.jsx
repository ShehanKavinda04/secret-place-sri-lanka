import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for the user
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapController({ spotLocation, searchedLocation, nearbySites }) {
  const map = useMap();

  useEffect(() => {
    const locations = [];
    if (spotLocation) locations.push(spotLocation);
    if (searchedLocation) locations.push([searchedLocation.lat, searchedLocation.lng]);
    
    if (nearbySites && nearbySites.length > 0) {
        nearbySites.forEach(site => {
            if (site.lat && site.lng) {
                locations.push([site.lat, site.lng]);
            }
        });
    }
    
    if (locations.length > 1) {
      const bounds = L.latLngBounds(locations);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    } else if (locations.length === 1) {
      map.flyTo(locations[0], 16);
    }
  }, [spotLocation, searchedLocation, nearbySites, map]);

  return null;
}

export default function InteractiveMap({ spot, searchedLocation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  const spotLocation = spot && spot.lat && spot.lng ? [spot.lat, spot.lng] : null;
  const nearbySites = spot?.nearby_sites || [];

  useEffect(() => {
    // Only fetch user location if they explicitly ask for it, 
    // for now we disable the automatic tracking to prevent map zooming out
    // away from the actual destination.
  }, []);

  if (!spotLocation && !searchedLocation && !userLocation) {
    return (
      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500">
        Coordinates not available for {spot?.name || 'this location'}.
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {error && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[1000] bg-white text-xs text-red-600 px-4 py-2 rounded-md shadow-md border border-red-200">
          {error}
        </div>
      )}
      <MapContainer 
        center={spotLocation || searchedLocation || [7.8731, 80.7718]} 
        zoom={16} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController spotLocation={spotLocation} searchedLocation={searchedLocation} nearbySites={nearbySites} />

        {/* Spot Marker */}
        {spotLocation && (
          <Marker position={spotLocation}>
            <Popup>
              <div className="font-bold">{spot.name}</div>
              <div className="text-xs text-slate-500">Sacred Site</div>
            </Popup>
          </Marker>
        )}

        {/* Nearby Sites Markers */}
        {nearbySites.map((site, index) => (
            site.lat && site.lng ? (
                <Marker key={index} position={[site.lat, site.lng]}>
                    <Popup>
                        <div className="font-bold">{site.name}</div>
                        <div className="text-xs text-slate-500">Nearby Site ({site.distance} km)</div>
                    </Popup>
                </Marker>
            ) : null
        ))}

        {/* Searched Location Marker */}
        {searchedLocation && (
          <Marker position={[searchedLocation.lat, searchedLocation.lng]}>
            <Popup>
              <div className="font-bold">Searched Location</div>
              <div className="text-xs text-slate-500">{searchedLocation.name}</div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
