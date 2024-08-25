"use client";

import { useState, useEffect } from 'react';
import { fetchCountries, Country } from '../services/countryService';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getCountries = async () => {
    try {
      const data = await fetchCountries();
      setCountries(data);
      console.log(data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleSearch = (query: string) => {
    setFilter(query);
  };

  const filteredCountries = countries.filter((country) =>
    country.Country.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
        <h1 className="font-mono text-2xl font-bold text-center">TOTS Map</h1>
      <SearchBar onSearch={handleSearch} />
      <Map
        countries={filteredCountries.map((country) => ({
          name: country.Country,
          latlng: [country.Latitude, country.Longitude] as [number, number],
        }))}
      />
    </div>
  );
};

export default Home;
