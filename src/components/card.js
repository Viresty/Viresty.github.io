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
        <div className={this.props.cardPreview?"card fade-in":"card"}>
          {this.props.cardPreview?<Link to={"/card-detail/"+this.props.CardDetail.itemID} className='cardLink'/>:''}

            <div className={this.props.cardPreview?'cardPreview cardMoreInfo':'cardMoreInfo'}>
              <div className='cardInfo'>
                <img className='cardImg' src= {this.props.CardDetail.url} alt={this.props.CardDetail.alt}></img>
                <div className='manaCost'>
                  <h2>{this.props.CardDetail.detail.manaCost}</h2>
                </div>
                <div className='cardName'>
                  <h1>{this.props.CardDetail.detail.name}</h1>
                </div>
                <div className='cardAbiliti'>
                  <p>{this.props.CardDetail.detail.abilities}</p>
                </div>
                <div className='cardStat'>

                </div>
              </div>
            </div>
        </div>
      );
    }
  }

export default Card;