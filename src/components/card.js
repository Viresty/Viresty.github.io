import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../css/card-preview.scss";

import data from '../data/test-data.json';
import maxhpIcon from '../img/icon/maxhp.png'
import maxmpIcon from '../img/icon/maxmp.png'
import atkIcon from '../img/icon/sword.png';
import defIcon from '../img/icon/shield.png';
import atkspdIcon from '../img/icon/atkspd.png';
import spdIcon from '../img/icon/spd.png';
import strIcon from '../img/icon/str.png';
import pdmgIcon from '../img/icon/pdmg.png';

class Card extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    render() {
      const color = {
        "MaxHP": "rgb(240, 45, 45)",
        "MaxMP": "#3caeff",
        "ATK": "orange",
        "DEF": "#555",
        "PDMG": "#D2691E",
        "ATKSPD": "purple",
        "SPD": "green",
        "STR": "rgb(200, 200, 0)",
        "TOUCH": "black"
      }

      const statIcon = {
        "MaxHP": maxhpIcon,
        "MaxMP": maxmpIcon,
        "ATK": atkIcon,
        "DEF": defIcon,
        "PDMG": pdmgIcon,
        "ATKSPD": atkspdIcon,
        "SPD": spdIcon,
        "STR": strIcon
      };

      let initialStatKeys = [];
      if (this.props.CardDetail.detail.stat)
        initialStatKeys = Object.keys(this.props.CardDetail.detail.stat);
      const hideStat = ['HP', 'MP', 'Lv', 'SHIELD'];
      if (!this.props.cardPreview) hideStat.push('MaxHP', 'MaxMP');
      const statKeys = initialStatKeys.filter(key => !hideStat.includes(key));

      const cardMoreInfo = (<div></div>)
      const cardPreview = (<div></div>)
      
      return (
        <div
          className={this.props.fadeIn?"card fade-in":"card"}
          id={this.props.id!==undefined?this.props.id:""}
          data-aos={this.props.cAOS}
        >
          {this.props.cardPreview?<Link to={"/card-detail/"+this.props.CardDetail.itemID} className='cardLink'/>:''}
          {this.props.backgroundEffect}

            <div className={this.props.cardPreview?'cardPreview cardMoreInfo':'cardMoreInfo'}>
              <div className='cardInfo'>
                <img className='cardImg' src= {this.props.CardDetail.url} alt={this.props.CardDetail.alt}></img>
                {this.props.CardDetail.detail.cost != "" || this.props.CardDetail.detail.cost &&
                  <div className='cardCost'>
                  <h2>{this.props.CardDetail.detail.cost}</h2>
                </div>}
                <div className='cardName'>
                  <h1>{this.props.CardDetail.detail.name}</h1>
                </div>
                {this.props.CardDetail.detail.stat &&
                  <div className='cardStat-left'>
                {
                  [ ...Array(10).keys() ].map((idx) => {
                    const key = statKeys.shift();
                    if (key === undefined || hideStat.includes(key)) return;
                    if (statKeys.length < 3) {statKeys.unshift(key); return;};
                    var statWidth = 2;
                    if (this.props.cardPreview) statWidth+=this.props.CardDetail.detail.stat[key].point;
                    return (
                      <div className='cardStatContent'
                        style={{
                          backgroundColor: color[key], 
                          width: statWidth + "em"
                        }}
                      >
                        <div className='statIcon'>
                          <img src={statIcon[key]}></img>
                        </div>
                        <p>{this.props.CardDetail.detail.stat[key].value}</p>
                        <div className='cardStatMoreInfo'>
                          <h1>{data['STAT_NAME'][key]}:</h1>
                          <p>{data['INFO'][this.props.CardDetail.itemID[0] === '6'?key+'_M':key]}</p>
                        </div>
                      </div>
                    )
                  })
                }
                </div>}
                {this.props.CardDetail.detail.stat &&
                  <div className='cardStat-right'>
                {
                  statKeys.map((key) => {
                    if (key === undefined || hideStat.includes(key)) return;
                    var statWidth = 2;
                    if (this.props.cardPreview) statWidth+=this.props.CardDetail.detail.stat[key].point;
                    return (
                      <div className='cardStatContent'
                        style={{
                          backgroundColor: color[key],
                          width: statWidth + "em"
                        }}>
                        <div className='statIcon'>
                          <img src={statIcon[key]}></img>
                        </div>
                        <p>{this.props.CardDetail.detail.stat[key].value}</p>
                        <div className='cardStatMoreInfo'>
                          <h1>{data['STAT_NAME'][key]}:</h1>
                          <p>{data['INFO'][this.props.CardDetail.itemID[0] === '6'?key+'_M':key]}</p>
                        </div>
                      </div>
                    )
                  })
                }
                </div>}
                <div className='cardAbiliti'>
                  <p>{this.props.CardDetail.detail.abilities}</p>
                </div>
                <div className='cardType'>
                  <div>
                    <p>{this.props.CardDetail.detail.type}</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      );
    }
  }

export default Card;