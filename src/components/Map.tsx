import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
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
    <MapContainer center={[20, 0]} zoom={2} className="h-[80vh] w-full rounded-lg mt-4">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {countries.map((country, index) => (
        <Marker key={index} position={country.latlng} icon={customIcon}>
          <Popup>
            <div className="text-center">
              <h2 className="text-lg font-bold">{country.name}</h2>
              <p>Lat: {country.latlng[0]}</p>
              <p>Lng: {country.latlng[1]}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
