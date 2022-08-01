import React, { Component, useEffect } from 'react';
import rhomus from '../img/svg/diamond.svg';

const EventCard = (props) => {

  return (
    <div className="card eventCard"
      onClick={() => {
        props.handle(props.CardDetail.nextProccess);
        props.init(props.CardDetail);
      }}>
        <div className='backgroundEffect' style={{height: "130%", width: "130%"}}>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="-1 -1 68 102" xmlSpace="preserve">
            <path d="M 33 0 L 66 50 L 33 100 L 0 50 L 33 0 L 35 3 Z"/>
            <path d="M 4 8 L 62 8 L 62 91 L 4 91 L 4 8 L 5 8 Z"/>
        </svg>
        </div>
        <div className='cardMoreInfo'>
          <div className='cardInfo'>
            <img className='cardImg' src= {props.CardDetail.url} alt={props.CardDetail.alt}></img>
            <div className='cardName'>
              <h1>{props.CardDetail.name}</h1>
            </div>
            <div className='cardAbiliti'>
              <p>{props.CardDetail.abilities}</p>
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

export default EventCard;