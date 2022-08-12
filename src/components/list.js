import React, { Component } from 'react';
import { useParams, Link } from 'react-router-dom';

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
                  <Card CardDetail={listCard[key]} cardPreview={this.props.cardPreview} fadeIn={this.props.fadeIn} cAOS={this.props.cAOS} />
                </li>
      });
      return (
        <div className="list-card">
          <h1 className="list-title">{this.props.title}</h1>
          <p className="list-detail">{this.props.detail}</p>
          <ul className={this.props.shortlist?'short-list':''}>
              {ListItems}
          </ul>
          {this.props.shortlist &&
            (
              <div className='shader'>
                <Link to={this.props.link} className='content-link'>XEM THÊM <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
              </div>
            )
          }
        </div>
      );
    }
  }
export default List;