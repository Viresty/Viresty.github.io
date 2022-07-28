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
import MonsterCard from "../components/monsterCard";
import EventCard from "../components/eventCard";
import './../css/play-layout.css';

import data from '../data/test-data.json'
import deckIcon from './../img/icon/card-game.png';

// Player
const initialObjects = {
    'player': {
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
            ATK: 2,
            DEF: 1,
            SHEILD: 1,
            ATKSPD: 1,
            MaxHand: 5
        },
        buff: [],
        weapon: [data['1']['001']],
        hand: [],
        deck: [],
        graveyard: []
    }
}

const optimizeObject = () => {

}
// reducer
// id: mục tiêu của hành động
const objectListReducer = (state, action) => {
    const payload = action.payload;
    switch (action.type) {
        // COMBAT
        case 'CHANGE_STAT': // id, stat, value
            state[payload.id].stat[payload.stat] += payload.value;
            return state;

        case 'SET_STAT': // id, stat, value
            state[payload.id].stat[payload.stat] = payload.value;
            return state;

        case 'DEAL_DAMAGE': // id, value
            let damage = payload.value - state[payload.id].stat['DEF'];
            if (damage > 0) {
                state[payload.id].stat['DEF'] = 0;
                state[payload.id].stat['HP'] -= damage;
            } else {
                state[payload.id].stat['DEF'] -= payload.value;
            }
            return state;

        case 'HEAL_HP':
            state[payload.id].stat['HP'] += payload.value;
            if (state[payload.id].stat['HP'] > state[payload.id].stat['MaxHP'])
                state[payload.id].stat['HP'] = state[payload.id].stat['MaxHP'];

        // CARD
        case 'ADD_ITEMS_TO': // id, target, item
            for (var i=0; i < payload.amount; i++) {
                // console.log(action.item)
                state[payload.id][payload.target] = [...state[payload.id][payload.target], payload.item];
            }
            return state;

        case 'DELETE_ITEM_FROM': //id, target, itemIdx
            let newA = {...state};
            delete state[payload.id][payload.target][payload.itemIdx];
            return newA;

        case 'DRAW_CARDS': // id, amount
            const deck = state[payload.id]['deck'];
            const hand = state[payload.id]['hand'];
            for (var i=0; i < payload.amount; i++) {
                const itemID = Math.floor(Math.random()*deck.length);
                const card = deck[itemID];
                hand.push(card);
                deck.slice(itemID, 1);
                console.log("!");
            }
            console.log(state);
            return state;

        // ROUND
        case 'CLONE_DECK':
            state[payload.id].deck = payload.item;
            return state;

        case 'ADD_MONSTER': // id, monster
            console.log("Monster Added!");

            return {...state, [payload.actionId]: payload.item}

        case 'ADD_MONSTER_RANDOM': // id, lv
            console.log("Monsters Added!");
            const values = Object.values(data["6"]);
            const monster = values[Math.floor(Math.random() * values.length)];
            const item = createMonster(payload.lv, monster)
            return {...state, ["monster"+payload.id]: item}

        case 'REMOVE_MONSTER': // id
            const newB = {...state};
            delete state[payload.id];
            return newB;
        
        default:
            return state;
    }
}

const powerUpByLv = (basicStat, Lv) => {
    const newStat = Object.assign({}, basicStat);
    if (basicStat.lvPowerUp === undefined)
        return {...newStat};
    return {...newStat, value: newStat.basic + (newStat.lvPowerUp * Lv)};
}

// Monster
const createMonster = (Lv, initialStatus) => {
    // clone detail
    var newMonster = {...initialStatus, detail: Object.assign({}, initialStatus.detail)};
    // clone status
    newMonster.detail.stat = Object.assign({}, initialStatus.detail.stat);
    Object.keys(newMonster.detail.stat).map((key, idx) => {
        // Clone stat
        newMonster.detail.stat[key] = Object.assign({}, initialStatus.detail.stat[key]);
        newMonster.detail.stat[key] = powerUpByLv(initialStatus.detail.stat[key], Lv);
    })
    newMonster.detail.name += " Lv. " + Lv;
    console.log(initialStatus);
    console.log(newMonster);
    return newMonster;
}

// CardDeck
const initialDeck = [data['2']['001']]

const deckReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CARDS':
            for (var i=0; i < action.amount; i++) {
                // console.log(action.item)
                state = [...state, action.item];
            }
            return state
        
        case 'DELETE_CARD':
            return [
                ...state.slice(0, action.id),
                ...state.slice(action.id + 1)
            ]

        default:
            return state;
    }
}

const optimizeCard = (payload, initialCard) => {
    var newCard = {...initialCard, detail: Object.assign({}, initialCard.detail)};

    switch (initialCard.typeCard) {
        case 'Action':
            initialCard.detail.action.map((action) => {
                action.value = payload.stat[action.depend_on];
            })
            break;
        
        default:
            break;
    }

    // Re-render abilities describe
    initialCard.detail.optimizeDescribeIdx.map((index, idx) => {
        initialCard.detail.optimizeDescribe[index] = initialCard.detail.action[idx].value;
    })
    initialCard.detail.abilities = "";
    initialCard.detail.optimizeDescribe.map((word)=>{
        initialCard.detail.abilities += word;
    })
    return initialCard;
}

// Game
const Play = (props) => {

    const [objectList, handleObjects] = useReducer(objectListReducer, initialObjects);
    const [cardDeck, handleCardDeck] = useReducer(deckReducer, initialDeck);
    const [floor, setFloor] = useState(1);
    const [round, setRound] = useState(1);
    const [events, setEvents] = useState([]);
    const [gameProccess, setProccess] = useState('OUT_COMBAT');
    const [turn, setTurn] = useState(1);
    const [handCards, resetRenderHandCard] = useState(<div id='cardArea'></div>);
    const [eventContent, resetRenderEvent] = useState(<div id="eventArea"></div>);
    const [monsterContent, resetRenderMonster] = useState(<div id="monsterArea"></div>);
    const [cardPreview, setCardPreview] = useState({});

    // Init
    const initEvents = Lvl => {
        const values = Object.values(data['8']);
        const nextEv = [];
        for (var i=0; i<3; i++) {
            // Copy Event Card
            const event = values[Math.floor(Math.random() * values.length)];
            const newEvent = Object.assign({}, event);
            newEvent.action = [...event.action];
            newEvent.action.map((item, idx) => {
                newEvent.action[idx] = Object.assign({}, item);
                newEvent.action[idx].payload = Object.assign({}, item.payload);
                newEvent.action[idx].payload = powerUpByLv(newEvent.action[idx].payload, Lvl);
            })
            newEvent.Lv = Lvl;
            nextEv.push(newEvent);
        }
        return nextEv;
    }
    
    const initRound = event => {
        event.action.map((action, idx) => {
            handleObjects({
                type: action.type,
                payload: {...action.payload, lv: event.Lv, actionId:idx}
            });
        });
    }

    // Handle Function
    const handleAction = action => {
        console.log(action);
        switch (action.type) {
            case 'CREATE':
                let cardType = action.cardID[0];
                let cardID = action.cardID.slice(1);
                let card = data[cardType][cardID];
                handleObjects({
                    type: 'ADD_ITEMS_TO',
                    payload: {
                        id: action.id,
                        target: action.target,
                        item: optimizeCard(objectList[action.id], card),
                        amount: action.amount
                    }
                });
                break;
            
            case 'BATTLE':
                handleObjects({
                    type: action.type,
                    payload: {
                        id: action.id,
                        stat: action.stat,
                        value: action.value
                    }
                });
                break;
            
            default:
                break;
        }
    }

    const handleRoundStart = (e) => {
        objectList['player'].weapon.map((weapon) => {
            weapon.detail.action.map((action) => {
                if (action.when === 'ROUND_START')
                    handleAction({...action, id:'player'});
            })
        })
        handleObjects({
            type: 'DRAW_CARDS',
            payload: {
                id: 'player',
                amount: 5
            }
        })
    }

    const handelTurnStart = e => {
        for (var i=0; i < objectList[e.id].ATKSPD; i++) {

        }
    }

    const handleProcess = e => {
        switch (e) {
            case 'OUT_COMBAT':
                setEvents(initEvents(3));
                break;
            // ROUND
            case 'ROUND_START':
                handleRoundStart();
                setProccess('TURN_START');
                return;
    
            case 'ROUND_END':
                setRound(round + 1);
                setProccess('OUT_COMBAT');
                return;

            // TURN
            case 'TURN_START':
                setProccess('IN_TURN');
                return;

            case 'TURN_END':
                setProccess('TURN_START');
                return;

            default:
                return;
        }
    }

    // RENDER
    const renderGameBoard = (
        <div className="content">
            <div id='gameArea'>
                <ul id='floorProcess'>
                    <li key='currentFloor' style={{fontSize: '2em'}}>
                        Tầng {floor}
                    </li>
                    <li key='round1'>
                        <FontAwesomeIcon icon={(round>=1)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='round2'>
                        <FontAwesomeIcon icon={(round>=2)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='round3'>
                        <FontAwesomeIcon icon={(round>=3)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='round4'>
                        <FontAwesomeIcon icon={(round>=4)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='round5' style={{fontSize: '1.5em', color: 'orange'}}>
                        <FontAwesomeIcon icon={(round>=5)?fasFaSquare:farFaSquare} />
                    </li>
                    <li key='round6'>
                        <FontAwesomeIcon icon={(round>=6)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='round7'>
                        <FontAwesomeIcon icon={(round>=7)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='round8'>
                        <FontAwesomeIcon icon={(round>=8)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='round9'>
                        <FontAwesomeIcon icon={(round>=9)?fasFaCircle:farFaCircle} />
                    </li>
                    <li key='BOSS' style={{fontSize: '2em', color: 'red'}}>
                        <FontAwesomeIcon icon={(round>=10)?fasFaSquare:farFaSquare}/>
                    </li>
                    <li key='nextFloor' style={{fontSize: '2em'}}>
                        Tầng {floor + 1}
                    </li>
                </ul>
                
                <div className="contentArea">
                    {gameProccess==='OUT_COMBAT'?eventContent:monsterContent}
                </div>

                <div id='playerInfo'>
                    <div id='playerMoreInfo'>
                        <button id='playerAvatar' onClick={() => {
                            console.log(events);
                            handleObjects({
                                type: 'ADD_MONSTER',
                                payload: {
                                    id: 'monster2',
                                    item: createMonster(3, data['6']['001'])
                                }
                            })
                        }}>
                            <img src={objectList['player'].stat.Avatar}></img>
                        </button>
                        <div id='playerLever'><p>{objectList['player'].stat.Lv}</p></div>
                        <div id='playerMaxHP'>
                            <div id='playerHP' style={{width: (objectList['player'].stat.HP/objectList['player'].stat.MaxHP)*100+'%'}}></div>
                            <p>{objectList['player'].stat.HP}/{objectList['player'].stat.MaxHP}</p>
                        </div>
                        <div id='playerMaxMP'>
                            <div id='playerMP' style={{width: (objectList['player'].stat.MP/objectList['player'].stat.MaxMP)*100+'%'}}></div>
                            <p>{objectList['player'].stat.MP}/{objectList['player'].stat.MaxMP}</p>
                        </div>
                        <div id='playerMaxEXP'>
                            <div id='playerEXP' style={{width: (objectList['player'].stat.EXP/objectList['player'].stat.NextLv)*100+'%'}}></div>
                        </div>
                        <div id='playerLv' className="hidden">
                            <p>1</p>
                        </div>
                    </div>

                    {handCards}

                    <div id='playerItems'>
                        <div id='playerDeck'>
                            <img src={deckIcon}></img>
                        </div>
                        <div id='playerBag'>
                            <img src="https://i.ibb.co/pxwVsx6/bag.png"></img>
                        </div>
                    </div>
                    <div id='end-turn-btn'>
                        <button className="big-button">KẾT THÚC LƯỢT</button>
                    </div>
                </div>
            </div>
        </div>
    );

    // hand card
    const renderHandCard = list => {
        return (
            <div id='cardArea'>
                {
                    list.map((item, idx) => {
                        return (
                            <div className="handCard">
                                <input type="radio" name="handCard" id={"handCard"+idx}></input>
                                <label htmlFor={"handCard"+idx}>
                                    <Card CardDetail={item} />
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    // monster
    const renderMonster = list => {
        // console.log(list)
        const monsterList = {...list};
        delete monsterList['player'];
        return (
            <div id="monsterArea">
                {
                    Object.keys(monsterList).map((key, idx) => {
                        return (
                            <div className="Monster">
                                <input type="radio" name="monster" id={"monster"+idx}></input>
                                <label htmlFor={"monster"+idx}>
                                    <MonsterCard CardDetail={monsterList[key]} />
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    // round event
    const renderRoundEvent = () => {
        const event = {...events};
        return (
            <div className="contentArea">
                <div id="eventArea">
                    {
                        Object.keys(event).map((key, idx) => {
                            return <EventCard CardDetail={event[key]} handle={setProccess} init={initRound} monsterID={idx} />
                        })
                    }
                </div>
                <h2>Hãy chọn lối đi tiếp theo</h2>
            </div>
        )
    }

    // UPDATE
    useEffect(() => {
        // console.log(objectList);
        reloadAnimation();
        // handleRoundStart();
    }, [])
    
    useEffect(() => {
        console.log(gameProccess)
        handleProcess(gameProccess);
    }, [gameProccess])

    useEffect(() => {
        resetRenderEvent(renderRoundEvent());
    }, [events])

    // re-render khi objectList update
    useEffect(() => {
        // console.log(objectList);
        resetRenderMonster(renderMonster(objectList));
        resetRenderHandCard(renderHandCard(objectList['player'].hand));
    }, [objectList])

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