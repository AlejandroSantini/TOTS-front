import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Asegúrate de importar Leaflet
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';

interface MapProps {
  countries: { name: string; latlng: LatLngTuple }[];
}

const Map: React.FC<MapProps> = ({ countries }) => {
  const customIcon = new L.Icon({
    iconUrl: '/images/marker.png',
    iconSize: [32, 32], 
    iconAnchor: [16, 32],
    popupAnchor: [0, -32] 
  });

  return (
    <MapContainer center={[20, 0]} zoom={2} className="h-screen w-full rounded-lg mt-4">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {countries.map((country, index) => (
        <Marker key={index} position={country.latlng} icon={customIcon}>
          <Popup>{country.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
