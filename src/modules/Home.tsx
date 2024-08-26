"use client";

import { useState, useEffect } from 'react';
import { fetchCountries, Country } from '../services/countryService';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getCountries = async () => {
    try {
      const data = await fetchCountries();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleSearch = (query: string) => {
    setQuery(query);
    filterCountries(query);
  };

  const filterCountries = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = countries.filter((country) => {
      const nameMatches = country.Country.toLowerCase().includes(lowercasedQuery);
      const codeMatches = country.ISOCode.toLowerCase().includes(lowercasedQuery); 
      return nameMatches || codeMatches;
    });
    setFilteredCountries(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
        <h1 className="mb-3 sm:mb-0 font-mono text-2xl font-bold text-center">
          <span className='text-blue-500'>TOTS</span> Map
        </h1>
        <SearchBar onSearch={handleSearch} />
      </div>
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
