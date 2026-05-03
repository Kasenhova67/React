import { Component } from 'react';
import { AppState } from './types';
import Search from './components/Search';
import ResultsList from './components/ResultsList';
import { fetchCharacters } from './services/api';
import './styles/App.css';

class App extends Component<{}, AppState> {
  private previousSearchTerm: string = '';

  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      loading: false,
      error: null
    };
  }

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm }, () => {
        this.previousSearchTerm = savedSearchTerm;
        this.performSearch();
      });
    } else {
      this.performSearch();
    }
  }

  handleSearchChange = (term: string): void => {
    this.setState({ searchTerm: term });
  };

  handleSearchSubmit = (): void => {
    const trimmedTerm = this.state.searchTerm.trim();
    
    if (trimmedTerm === this.previousSearchTerm) {
      return;
    }
    
    this.setState({ searchTerm: trimmedTerm }, () => {
      this.performSearch();
    });
  };

  performSearch = async (): Promise<void> => {
    const searchTerm = this.state.searchTerm;
    
    if (searchTerm) {
      localStorage.setItem('searchTerm', searchTerm);
    } else {
      localStorage.removeItem('searchTerm');
    }
    
    this.previousSearchTerm = searchTerm;
    this.setState({ loading: true, error: null });
    
    try {
      const results = await fetchCharacters(searchTerm);
      this.setState({ results, loading: false });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      this.setState({ 
        error: errorMessage, 
        loading: false,
        results: []
      });
    }
  };

  testError = (): void => {
    throw new Error('Test error from error button!');
  };

  render() {
    const { searchTerm, results, loading, error } = this.state;
    
    return (
      <div className="app">
        <div className="header">
          <h1>Character Search</h1>
        </div>
        
        <div className="search-container">
          <Search
            searchTerm={searchTerm}
            onSearchChange={this.handleSearchChange}
            onSearchSubmit={this.handleSearchSubmit}
            isLoading={loading}
          />
        </div>
        
        <div className="results-container-wrapper">
          <ResultsList
            results={results}
            loading={loading}
            error={error}
          />
        </div>
        
        <div className="error-test-container">
          <button 
            onClick={this.testError}
            className="test-error-button"
          >
            🧪 Test Error Boundary
          </button>
        </div>
      </div>
    );
  }
}

export default App;
