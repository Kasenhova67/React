import { Component } from 'react';
import { ResultsListProps } from '../types';
import ResultItem from './ResultItem';
import Loader from './Loader';

class ResultsList extends Component<ResultsListProps> {
  render() {
    const { results, loading, error } = this.props;

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return (
        <div className="error-message">
          <p>❌ {error}</p>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <div className="no-results">
          <p>No results found. Try a different search term.</p>
        </div>
      );
    }

    return (
      <div className="results-list">
        <h2>Results ({results.length})</h2>
        <div className="results-container">
          {results.map((item) => (
            <ResultItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default ResultsList;
