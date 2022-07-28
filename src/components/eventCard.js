import React, { Component } from 'react';

class EventCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    render() {
      return (
        <div className="card">
            <div className='cardMoreInfo'>
              <div className='cardInfo'>
                <img className='cardImg' src= {this.props.CardDetail.url} alt={this.props.CardDetail.alt}></img>
                <div className='cardName'>
                  <h1>{this.props.CardDetail.name}</h1>
                </div>
                <div className='cardAbiliti'>
                  {/* <p>{this.props.CardDetail.abilities}</p> */}
                    <button onClick={() => {
                      this.props.handle(this.props.CardDetail.nextProccess);
                      this.props.init(this.props.CardDetail);
                    }}>CHON</button>
                </div>
                <div className='cardType'>
                  <div>
                    <p>Sự kiện</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      );
    }
  }

export default EventCard;