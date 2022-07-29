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

// Notification
const createNotification = (mes) => {
    return;
}

// Player
const initPlayer = (initialStatus) => {
    // clone detail
    var newStatus = {...initialStatus, detail: Object.assign({}, initialStatus.detail)};
    // clone status
    newStatus.detail.stat = Object.assign({}, initialStatus.detail.stat);
    Object.keys(newStatus.detail.stat).map((key, idx) => {
        // Clone stat
        newStatus.detail.stat[key] = Object.assign({}, initialStatus.detail.stat[key]);
        // newStatus.detail.stat[key] = powerUpByLv(initialStatus.detail.stat[key], Lv);
    })
    // More Info
    newStatus.id = 'player';
    newStatus.detail.stat['MaxHP'] = {
        name: 'SINH LỰC TỐI ĐA',
        value: newStatus.detail.stat['HP'].value
    }
    newStatus.detail.stat['MaxMP'] = {
        name: 'NĂNG LƯỢNG TỐI ĐA',
        value: newStatus.detail.stat['MP'].value
    };
    newStatus.detail.stat['EXP'] = {value: 0};
    newStatus.detail.stat['MaxEXP'] = {value: 10};
    newStatus.detail['Lv'] = 1;
    newStatus.weapon = [data['1']['001']];
    newStatus.buff = [];
    newStatus.hand = [];
    newStatus.deck = [];
    newStatus.graveyrad = [];
    // console.log(initialStatus);
    return newStatus;
}

const initialObjects = {
    'player': initPlayer(data['0']['001'])
}
// reducer
// id: mục tiêu của hành động
const objectListReducer = (states, action) => {
    const state = {...states}
    const payload = action.payload;
    switch (action.type) {
        // COMBAT
        case 'CHANGE_STAT': // id, stat, value
            state[payload.id].detail.stat[payload.stat].value += payload.value;
            return state;

        case 'SET_STAT': // id, stat, value
            state[payload.id].detail.stat[payload.stat].value = payload.value;
            return state;

        case 'DEAL_DAMAGE': // id, value
            // console.log("MONSTER0:", state[payload.id].detail.stat['DEF'].value);
            let damage = payload.value - state[payload.id].detail.stat['DEF'].value;
            if (damage > 0) {
                state[payload.id].detail.stat['DEF'].value = 0;
                state[payload.id].detail.stat['HP'].value -= damage;
            } else {
                state[payload.id].detail.stat['DEF'].value -= payload.value;
            }
            return state;

        case 'HEAL_HP':
            state[payload.id].detail.stat['HP'].value += payload.value;
            if (state[payload.id].detail.stat['HP'].value > state[payload.id].detail.stat['MaxHP'].value)
                state[payload.id].detail.stat['HP'].value = state[payload.id].detail.stat['MaxHP'].value;

        // CARD
        case 'ADD_ITEMS_TO': // id, target, item
            for (var i=0; i < payload.amount; i++) {
                // console.log(action.item)
                state[payload.id][payload.target] = [...state[payload.id][payload.target], payload.item];
            }
            return state;

        case 'DELETE_ITEM_FROM': //id, target, itemIdx
            delete state[payload.id][payload.target][payload.itemIdx];
            return state;

        case 'DRAW_CARDS': // id, amount
            var deck = state[payload.id]['deck'];
            var hand = state[payload.id]['hand'];
            for (var i=0; i < payload.amount; i++) {
                if (deck.length === 0) {
                    console.log('OUT');
                    break;
                }
                const itemID = Math.floor(Math.random()*deck.length);
                const card = deck[itemID];
                hand.push(card);
                deck = [...deck.slice(0, itemID),
                        ...deck.slice(itemID + 1)]
                console.log(i);
                console.log(deck.length);
            }
            // console.log(state);
            return state;
        
        case 'MOVE_TO': // id, from, target
            var resources = state['player'][payload.from];
            var newResources = state['player'][payload.target];
            var card = deck[payload.id];
            newResources.push(card);
            resources = [...resources.slice(0, payload.id),
                        ...resources.slice(payload.id + 1)]

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
            return {...state, ["monster"+payload.actionId]: item}

        case 'REMOVE_MONSTER': // id
            delete state[payload.id];
            return state;
        
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
    newMonster.detail.stat['MaxHP'] = Object.assign({}, newMonster.detail.stat['HP']);
    newMonster.detail.stat['MaxMP'] = Object.assign({}, newMonster.detail.stat['MP']);
    newMonster.detail.name += " Lv. " + Lv;
    // console.log(initialStatus);
    // console.log(newMonster);
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

const optimizeCard = (payload, initialCard, moreOption = {}) => {
    var newCard = {...initialCard, detail: Object.assign({}, initialCard.detail)};
    // clone status
    newCard.detail.stat = Object.assign({}, initialCard.detail.stat);
    Object.keys(newCard.detail.stat).map((key, idx) => {
        // Clone stat
        newCard.detail.stat[key] = Object.assign({}, initialCard.detail.stat[key]);
    });
    
    switch (newCard.typeCard) {
        case 'Action':
            newCard.detail.action.map((action) => {
                action.value = payload.detail.stat[action.depend_on].value;
            })
            break;
        
        default:
            break;
    }
    newCard.detail['MoreOption'] = moreOption;
    // Re-render abilities describe
    newCard.detail.optimizeDescribeIdx.map((index, idx) => {
        newCard.detail.optimizeDescribe[index] = newCard.detail.action[idx].value;
    })
    newCard.detail.abilities = "";
    newCard.detail.optimizeDescribe.map((word)=>{
        newCard.detail.abilities += word;
    })
    return newCard;
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
    const initEvents = (Lvl, round) => {
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
            // Re-render abilities describe
            newEvent.optimizeDescribeIdx.map((index, idx) => {
                newEvent.optimizeDescribe[index] = newEvent.action[idx].payload.value;
            })
            if (newEvent.optimizeDescribe.length != 0) newEvent.abilities = "";
            newEvent.optimizeDescribe.map((word)=>{
                newEvent.abilities += word;
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
        // console.log(action);
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
                console.log(action);
                handleObjects({
                    type: action.payload.effect,
                    payload: action.payload
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
        handleObjects({
            type: 'DRAW_CARDS',
            payload: {
                id: 'player',
                amount: 1
            }
        })
    }

    const handleProccess = e => {
        switch (e) {
            case 'OUT_COMBAT':
                setEvents(initEvents(floor, round));
                return;
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
                handelTurnStart();
                setProccess('IN_TURN');
                return;

            case 'TURN_END':
                setProccess('TURN_START');
                return;

            default:
                return;
        }
    }

    const handleCombat = () => {
        if (objectList['player'].detail.stat['HP'].value <= 0)
            setProccess('GAME_OVER');
        Object.keys(objectList).map((key) => {
            if (objectList[key].detail.stat['HP'].value <= 0)
                handleObjects({
                    type: "REMOVE_MONSTER",
                    payload: {id: key}
                });
        })
        if (Object.keys(objectList).length <= 1 && gameProccess!='ROUND_END')
            setProccess('ROUND_END');
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
                        <button id='playerAvatar'>
                            <img src={objectList['player'].url} alt={objectList['player'].alt}></img>
                        </button>
                        <div id='playerLever'><p>{objectList['player'].detail.Lv}</p></div>
                        <div id='playerMaxHP' className="MaxHPBar">
                            <div id='playerHP' className="HPBar"
                                style={{width: (objectList['player'].detail.stat['HP'].value/objectList['player'].detail.stat['MaxHP'].value)*100+'%'}}></div>
                            <p>{objectList['player'].detail.stat.HP.value}/{objectList['player'].detail.stat.MaxHP.value}</p>
                        </div>
                        <div id='playerMaxMP'>
                            <div id='playerMP' style={{width: (objectList['player'].detail.stat.MP.value/objectList['player'].detail.stat.MaxMP.value)*100+'%'}}></div>
                            <p>{objectList['player'].detail.stat.MP.value}/{objectList['player'].detail.stat.MaxMP.value}</p>
                        </div>
                        <div id='playerMaxEXP'>
                            <div id='playerEXP' style={{width: (objectList['player'].detail.stat.EXP.value/objectList['player'].detail.stat.MaxEXP.value)*100+'%'}}></div>
                        </div>
                        <div id='playerLv' className="hidden">
                            <p>1</p>
                        </div>
                    </div>

                    {gameProccess!='OUT_COMBAT' && gameProccess!='ROUND_END' && handCards}

                    <div id='playerItems'>
                        <div id='playerDeck'>
                            <img src={deckIcon}></img>
                        </div>
                        <div id='playerBag'>
                            <img src="https://i.ibb.co/pxwVsx6/bag.png"></img>
                        </div>
                    </div>
                    {gameProccess!='OUT_COMBAT' && gameProccess!='ROUND_END' &&
                    <div id='end-turn-btn'>
                        <button className="big-button" onClick={() => setProccess('TURN_END')}>KẾT THÚC LƯỢT</button>
                    </div>}
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
                                <label htmlFor={"handCard"+idx}
                                onClick={() => {
                                    item.detail.action.map((action) => {
                                        handleAction({
                                            type: action.type,
                                            payload: {
                                                id: 'monster0',
                                                effect: action.effect,
                                                value: action.value
                                            }
                                        })
                                    })
                                }}
                                >
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
                        const monster = monsterList[key];
                        const stats = monster.detail.stat;
                        return (
                            <div className="Monster">
                                <input type="radio" name="monster" id={"monster"+idx}></input>
                                <label htmlFor={"monster"+idx}>
                                    <MonsterCard CardDetail={monster} />
                                </label>
                                <div className="Monster_Info">
                                    <div className="MaxHPBar">
                                        <div className="HPBar"
                                            style={{width: (stats['HP'].value/stats['MaxHP'].value)*100+"%"}}></div>
                                        <p>{stats['HP'].value}/{stats['MaxHP'].value}</p>
                                    </div>
                                </div>
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
    }, []);
    
    useEffect(() => {
        console.log(gameProccess);
        if (round > 10) {
            setFloor(floor + 1);
            setRound(1);
        }
        handleProccess(gameProccess);
        resetRenderHandCard(handCards => renderHandCard(objectList['player'].hand));
    }, [gameProccess]);

    useEffect(() => {
        resetRenderEvent(renderRoundEvent());
    }, [events]);
    
    // re-render khi objectList update
    useEffect(() => {
        handleCombat();
        resetRenderMonster(monsterContent => renderMonster(objectList));
        console.log(objectList);
    }, [objectList]);

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