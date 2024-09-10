import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';
import { fetchCountryDetails } from '../services/countryService.tsx'; 

interface MapProps {
  countries: { name: string; code: string; latlng: LatLngTuple }[];
}

const Map: React.FC<MapProps> = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);

  const customIcon = new L.Icon({
    iconUrl: '/images/marker.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const handleMarkerClick = async (code: string) => {
    try {
      const countryData = await fetchCountryDetails(code);
      setSelectedCountry(countryData);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  return (
    <MapContainer center={[20, 0]} zoom={2} className="h-[80vh] w-full rounded-lg mt-4">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy;'
      />
      {countries.map((country, index) => (
        <Marker
          key={index}
          position={country.latlng}
          icon={customIcon}
          eventHandlers={{
            click: () => handleMarkerClick(country.code)
          }}
        >
          <Popup>
              <div className="text-start">
                <h2 className="text-lg font-bold">{country.name}</h2>
                {selectedCountry && (
                  <div className="mt-2 text-sm">
                    <p>Continent: {selectedCountry.continent.name}</p>
                    <p>Currency: {selectedCountry.currency}</p>
                    <p>Languages: {selectedCountry.languages.map((lang: any) => lang.name).join(', ')}</p>
                    <p>test numero 2</p>
                  </div>
                )}
              </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
