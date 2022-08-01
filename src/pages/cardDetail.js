import './../css/card-detail.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data/test-data.json';

const CardDetail = () => {
    
    const cardID = useParams();
    const cardTarget = data[cardID.itemID[0]][cardID.itemID.slice(1)];
    if (cardTarget === undefined) {
        window.location = "/not-found"
    }
    const cardStat = cardTarget.detail.stat
    const cardInfo = Object.keys(cardStat).map((key, idx) => {
        return (
            <li key={idx}>
                <h2>{cardStat[key].name}</h2>
                <p>{cardStat[key].value}</p>
            </li>)
    });

    const closeImg = () => {
        document.getElementById('card-full-img-content').classList.add('closeImgAnimation');
        document.getElementById('card-full-img-content').classList.remove('openImgAnimation');
        setTimeout(()=>{
            document.getElementById('card-full-img').classList.add('hidden');
            document.getElementById('card-full-img-content').classList.remove('closeImgAnimation');
        }, 500);
    };

    const openImg = () => {
        document.getElementById('card-full-img').classList.remove('hidden');
        document.getElementById('card-full-img-content').classList.remove('openImgAnimation');
        setTimeout(()=>{document.getElementById('card-full-img-content').classList.add('openImgAnimation');}, 5);
    };
    
    useEffect(() => {
        console.log(cardTarget);
    }, [])

    return (
        <div className='container'>
            <div className='container' id="body-container">
                <div className='content card-detail'>
                    <div className='card-detail-img'>
                        <img src={cardTarget.url} alt={cardTarget.alt}></img>
                        <button className='expand-btn' onClick={() => openImg()}>
                            <i className="fa fa-expand" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className='expand-img hidden' id="card-full-img">
                        <div className='blocker'></div>
                        <div className='content'>
                            <img src={cardTarget.url} alt={cardTarget.alt} id='card-full-img-content'></img>                        
                            <button className='close-btn'>
                                <i className="fa fa-times" aria-hidden="true" onClick={() => closeImg()}></i>
                            </button>
                        </div>
                    </div>
                    <div className='card-detail-content'>
                        <h1 id='card-detail-name'><u>Tên:</u></h1>
                        <p>{cardTarget.detail.name}</p>
                        <h1 id='card-detail-type'><u>Loại Thẻ:</u></h1>
                        <p>{cardTarget.detail.type}</p>
                        <h1 id='card-detail-stat'><u>Chỉ Số:</u></h1>
                        <ul id='card-detail-stat-table'>
                            {cardInfo}
                        </ul>
                        <h1 id='card-detail-abilities'><u>Khả Năng</u></h1>
                        <p>{cardTarget.detail.abilities}</p>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default CardDetail;