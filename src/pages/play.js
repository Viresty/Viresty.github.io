import React, { useReducer, useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare as farFaSquare,
         faCircle as farFaCircle
        } from '@fortawesome/free-regular-svg-icons';
import { faSquare as fasFaSquare,
        faCircle as fasFaCircle,
        faCircleInfo 
        } from '@fortawesome/free-solid-svg-icons';

import { reloadAnimation } from '../function/page';
import Card from "../components/card";
import './../css/play-layout.css';

import data from '../data/test-data.json'
import deckIcon from './../img/icon/card-game.png';

// Sample Object
// [
//     {
//         id: 'player',
//         stat: [
//             {
//                 id: 'HP',
//                 value: '10'
//             }
//         ]
//     }, {
//          ...
//     }
// ]

const initialObjects = [
    {
        id: 'player',
        stat: {
            Avatar: 'https://cdna.artstation.com/p/assets/images/images/003/402/738/large/-886b20e1d6cd7ec21de43810bc21543eda3c0268159097-pyebmq.jpg?1473325789',
            Lv: 1,
            EXP: 0,
            NextLv: 2,
            MaxHP: 20,
            HP: 20,
            MaxMP: 3,
            MP: 3,
            ATK: 1,
            DEF: 1,
        },
        hand: [],
        deck: []
    }
]

// reducer
const objectListReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_STAT':
            console.log(action);
            return state.map(object => {
                if (object.id === action.id) {
                    object.stat[action.stat] += action.value;
                    console.log(object);
                    return object;
                } else {
                    return object;
                }
            });

        case 'DRAW_CARD':
            console.log('Draw');

        default:
            return state;
    }
}

// Monster
const createMonster = (Lv, initialStatus) => {

}

// Card


// Game
const Play = (props) => {

    const [objectList, handleObjects] = useReducer(objectListReducer, initialObjects);
    const [handCards, setHandCards] = useState([]);
    const [deck, setDeckCards] = useState([]);
    const [floor, setFloor] = useState(1);
    const [round, setRound] = useState(1);

    const handleGameEvent = e => {
        switch (e.event) {
            case 'BATTLE':
                console.log(e);
                handleObjects({
                    type: e.type,
                    id: e.id,
                    stat: e.stat,
                    value: e.value
                });
                return;

            case 'NEXT_ROUND':
                setRound(round + 1);
                if (round >= 10) handleGameEvent({event: 'NEXT_FLOOR'})
                return;

            case 'NEXT_FLOOR':
                setFloor(floor + 1);
                setRound(1);
                return;

            default:
                return;
        }
    }

    const renderGameBoard = (
        <div className="content">
            <div id='gameArea'>
                <ul id='floorProcess'>
                    <li key='currentFloor' style={{fontSize: '2em'}}>
                        Tầng {floor}
                    </li>
                    <li key='1'>
                        <FontAwesomeIcon icon={(round>=1)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='2'>
                        <FontAwesomeIcon icon={(round>=2)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='3'>
                        <FontAwesomeIcon icon={(round>=3)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='4'>
                        <FontAwesomeIcon icon={(round>=4)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='5' style={{fontSize: '1.5em', color: 'orange'}}>
                        <FontAwesomeIcon icon={(round>=5)?fasFaSquare:farFaSquare} />
                    </li>
                    <li key='6'>
                        <FontAwesomeIcon icon={(round>=6)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='7'>
                        <FontAwesomeIcon icon={(round>=7)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='8'>
                        <FontAwesomeIcon icon={(round>=8)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='9'>
                        <FontAwesomeIcon icon={(round>=9)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='BOSS' style={{fontSize: '2em', color: 'red'}}>
                        <FontAwesomeIcon icon={(round>=10)?fasFaSquare:farFaSquare}/>
                    </li>
                    <li key='nextFloor' style={{fontSize: '2em'}}>
                        Tầng {floor + 1}
                    </li>
                </ul>
                    
                <div id='playerInfo'>
                    <div id='playerMoreInfo'>
                        <button id='playerAvatar' onClick={() => handleGameEvent({
                            event: 'NEXT_ROUND'
                        })}>
                            <img src={objectList[0].stat.Avatar}></img>
                        </button>
                        <div id='playerMaxHP'>
                            <div id='playerHP' style={{width: (objectList[0].stat.HP/objectList[0].stat.MaxHP)*100+'%'}}></div>
                            <p>{objectList[0].stat.HP}/{objectList[0].stat.MaxHP}</p>
                        </div>
                        <div id='playerMaxMP'>
                            <div id='playerMP' style={{width: (objectList[0].stat.MP/objectList[0].stat.MaxMP)*100+'%'}}></div>
                            <p>{objectList[0].stat.MP}/{objectList[0].stat.MaxMP}</p>
                        </div>
                        <div id='playerLv' className="hidden">
                            <p>1</p>
                        </div>
                    </div>
                    <div id='cardArea'>
                        <input type="radio" name="handCard" id="01"></input>
                        <label htmlFor="01">
                            <Card CardDetail={data['1']['001']} />
                        </label>
                        <input type="radio" name="handCard" id="02"></input>
                        <label htmlFor="02">
                            <Card CardDetail={data['1']['001']} />
                        </label>
                        <input type="radio" name="handCard" id="03"></input>
                        <label htmlFor="03">
                            <Card CardDetail={data['0']['001']} />
                        </label>
                    </div>
                    <div id='playerItems'>
                        <div id='playerDeck'>
                            <img src={deckIcon}></img>
                        </div>
                        <div id='playerBag'>
                            <img src="https://i.ibb.co/pxwVsx6/bag.png"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        console.log('play game?'+props.isLogin);
        console.log(objectList[0].stat.HP);
        reloadAnimation();
    
    }, [])

    return (
        <div className="container play-layout">
            <div id='page-banner'>
                <div className='overlay-img'></div>
            </div>
            <div className='content Notification'>
                <FontAwesomeIcon icon={faCircleInfo} style={{color: '#72e1ff'}}/>
                <p>Chức năng này hiện chưa ra mắt, đây chỉ tổng quan thiết kế.</p>
            </div>
            <div className="container" id="body-container">
                {renderGameBoard}
            </div>
        </div>
    );
};
  
export default Play;

function gameProcess() {
    while (1) {
        console.log('Game running');
    }
}

// gameProcess();