import { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
}

export default Loader;
