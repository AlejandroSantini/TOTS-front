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
  
  export interface Country {
    Country: string;
    ISOCode: string;
    Latitude: number;
    Longitude: number;
  }
  