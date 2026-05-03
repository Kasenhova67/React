import axios from 'axios';
import type { ApiResponse, Item } from '../types';

const API_BASE_URL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacters = async (searchTerm: string = ''): Promise<Item[]> => {
  try {
    const url = searchTerm 
      ? `${API_BASE_URL}/?name=${encodeURIComponent(searchTerm)}`
      : `${API_BASE_URL}`;
    
    const response = await axios.get(url);
    
    return response.data.results.map((char: any) => ({
      id: char.id,
      name: char.name,
      description: `Species: ${char.species}, Status: ${char.status}`,
      url: char.image
    }));
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch data. Please try again later.');
  }
};
