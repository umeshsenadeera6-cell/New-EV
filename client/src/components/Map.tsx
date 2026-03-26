"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet + Next.js
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
};

const Map = ({ stations, center, onMarkerClick }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div className="h-full w-full bg-gray-100 animate-pulse rounded-3xl" />;

    return (
        <MapContainer 
            center={center} 
            zoom={13} 
            style={{ height: '100%', width: '100%', borderRadius: '24px' }}
            zoomControl={false}
        >
            <ChangeView center={center} zoom={13} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {stations.map((station) => (
                <Marker 
                    key={station._id} 
                    position={[station.location.coordinates[1], station.location.coordinates[0]]}
                    eventHandlers={{
                        click: () => onMarkerClick(station),
                    }}
                >
                    <Popup>
                        <div className="p-1">
                            <h3 className="font-bold text-gray-900">{station.name}</h3>
                            <p className="text-xs text-gray-600">{station.address}</p>
                            <p className="text-xs font-bold mt-1 text-emerald-600">${station.pricePerKwh}/kWh</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
