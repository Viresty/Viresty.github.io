import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    render() {
      return (
          <Link to={"/item/"+this.props.CardDetail.itemId} className="card fade-in">
            <img src= {this.props.CardDetail.url} alt={this.props.CardDetail.alt}></img>
          </Link>
      );
    }
  }

export default Card;