import { Component } from 'react';
import { Item } from '../types';

interface ResultItemProps {
  item: Item;
}

class ResultItem extends Component<ResultItemProps> {
  render() {
    const { item } = this.props;
    
    return (
      <div className="result-item">
        {item.url && (
          <img src={item.url} alt={item.name} className="item-image" />
        )}
        <div className="item-info">
          <h3 className="item-name">{item.name}</h3>
          <p className="item-description">{item.description}</p>
        </div>
      </div>
    );
  }
}

export default ResultItem;
