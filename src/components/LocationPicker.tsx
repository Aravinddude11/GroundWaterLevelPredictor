import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationPickerProps {
  value: { lat: number; lng: number };
  onChange: (location: { lat: number; lng: number }) => void;
}

function LocationMarker({ position, onChange }: { 
  position: { lat: number; lng: number }; 
  onChange: (location: { lat: number; lng: number }) => void;
}) {
  useMapEvents({
    click(e) {
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return <Marker position={position as LatLng} />;
}

export default function LocationPicker({ value, onChange }: LocationPickerProps) {
  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={value}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker position={value} onChange={onChange} />
      </MapContainer>
    </div>
  );
}