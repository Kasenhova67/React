export interface Item {
  id: number;
  name: string;
  description: string;
  url?: string;
}

export interface ApiResponse {
  results: Item[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface AppState {
  searchTerm: string;
  results: Item[];
  loading: boolean;
  error: string | null;
}

export interface SearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchSubmit: () => void;
  isLoading: boolean;
}

export interface ResultsListProps {
  results: Item[];
  loading: boolean;
  error: string | null;
}
