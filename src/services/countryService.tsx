import { fetchCountry } from './graphqlClient'; 

export interface Country {
  Country: string;
  ISOCode: string;
  Latitude: number;
  Longitude: number;
}

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch('/mock/countries.json');
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data: Country[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const fetchCountryDetails = async (code: string) => {
  try {
    const details = await fetchCountry(code);
    return details;
  } catch (error) {
    console.error('Error fetching country details:', error);
    throw error;
  }
};
