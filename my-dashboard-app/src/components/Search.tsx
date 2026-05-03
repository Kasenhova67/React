import { Component, FormEvent, ChangeEvent } from 'react';
import { SearchProps } from '../types';

class Search extends Component<SearchProps> {
  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.props.onSearchChange(e.target.value);
  };

  handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    this.props.onSearchSubmit();
  };

  render() {
    const { searchTerm, isLoading } = this.props;

    return (
      <div className="search-section">
        <form onSubmit={this.handleSubmit} className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={this.handleInputChange}
            placeholder="Search for characters..."
            className="search-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
