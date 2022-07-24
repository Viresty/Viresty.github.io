import React, { Component } from 'react';
import './../css/list-card.css';

import Card from './card';

class List extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    render() {
      const listCard = this.props.ListItems
      const ListItems = Object.keys(listCard).map((key, idx) => {
        return <li key={idx}>
                  <Card CardDetail={listCard[key]} cardPreview={this.props.cardPreview} />
                </li>
      });
      return (
        <div className="list-card">
          <h1 className="list-title">{this.props.title}</h1>
          <p className="list-detail">{this.props.detail}</p>
          <ul className={this.props.shortlist?'short-list':''}>
              {ListItems}
          </ul>
        </div>
      );
    }
  }
export default List;