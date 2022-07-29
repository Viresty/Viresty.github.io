import React, { Component, useEffect } from 'react';

const MonsterCard = (props) => {

  useEffect(() => {
    // console.log(props);
  }, [props])
    
  return (
    <div className="card">
        <div className='cardMoreInfo'>
          <div className='cardInfo'>
            <img className='cardImg' src= {props.CardDetail.url} alt={props.CardDetail.alt}></img>
            <div className='cardName'>
              <h1>{props.CardDetail.detail.name}</h1>
            </div>
            <div className='cardAbiliti'>
              <p>{props.CardDetail.detail.abilities}</p>
            </div>
            <div className='cardStat'>
              <div className='cardStatContent' style={{backgroundColor: 'orange'}}>
                <p>{props.CardDetail.detail.stat.ATK.value}</p>
                <div className='cardStatMoreInfo'>
                  <h1>TẤN CÔNG:</h1>
                  <p>Sát thương có thể gây ra.</p>
                  <p>Mức độ tăng trưởng: +{props.CardDetail.detail.stat.ATK.lvPowerUp}</p>
                </div>
              </div>
              <div className='cardStatContent'>
                <p>{props.CardDetail.detail.stat.DEF.value}</p>
                <div className='cardStatMoreInfo'>
                  <h1>PHÒNG THỦ:</h1>
                  <p>Lượng sát thương có thể chặn cản</p>
                  <p>Mức độ tăng trưởng: +{props.CardDetail.detail.stat.ATK.lvPowerUp}</p>
                </div>
              </div>
              <div className='cardStatContent'>
                <p>{props.CardDetail.detail.stat.SPD.value}</p>
                <div className='cardStatMoreInfo'>
                  <h1>TỐC ĐỘ:</h1>
                  <p>Thời gian đợi đến lượt tiếp theo.</p>
                  <p>Mức độ tăng trưởng: {props.CardDetail.detail.stat.SPD.lvPowerUp>0?
                    "+"+props.CardDetail.detail.stat.SPD.lvPowerUp:
                    props.CardDetail.detail.stat.SPD.lvPowerUp}</p>
                </div>
              </div>
            </div>
            <div className='cardType'>
              <div>
                <p>{props.CardDetail.detail.type}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default MonsterCard;