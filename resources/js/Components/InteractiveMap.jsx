import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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

// Component to handle dynamic map bounds and tracking
function MapController({ spotLocation, userLocation, searchedLocation }) {
  const map = useMap();

  useEffect(() => {
    if (!spotLocation) return;
    
    const locations = [spotLocation];
    if (userLocation) locations.push(userLocation);
    if (searchedLocation) locations.push([searchedLocation.lat, searchedLocation.lng]);
    
    if (locations.length > 1) {
      // Create bounds containing all available locations
      const bounds = L.latLngBounds(locations);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    } else {
      // Just fly to the spot
      map.flyTo(spotLocation, 16);
    }
  }, [spotLocation, userLocation, searchedLocation, map]);

  return null;
}

export default function InteractiveMap({ spot, searchedLocation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  const spotLocation = spot && spot.lat && spot.lng ? [spot.lat, spot.lng] : null;

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error watching position", error);
        setError('Unable to retrieve your location. Please check browser permissions.');
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  if (!spotLocation) {
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
        center={spotLocation} 
        zoom={16} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController spotLocation={spotLocation} userLocation={userLocation} searchedLocation={searchedLocation} />

        {/* Spot Marker */}
        <Marker position={spotLocation}>
          <Popup>
            <div className="font-bold">{spot.name}</div>
            <div className="text-xs text-slate-500">Sacred Site</div>
          </Popup>
        </Marker>

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="font-bold">You are here</div>
            </Popup>
          </Marker>
        )}

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
