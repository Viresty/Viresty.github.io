import React, { useReducer, useState, useEffect } from "react";
import { connect } from "react-redux";
import { playerReducer, deckReducer, objectListReducer, cardTargetReducer } from "../reducers/playReducer";
import { optimizeCard,
    createMonster,
    powerUpByLv,
    powerUpByPoint,
    initPlayer,
    optimizePlayer
} from "../function/playFuction";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare as farFaSquare,
         faCircle as farFaCircle,
         
        } from '@fortawesome/free-regular-svg-icons';
import { faSquare as fasFaSquare,
        faCircle as fasFaCircle,
        faCircleInfo,
        faPlus, faMinus,
        faCaretLeft, faCaretRight, 
        } from '@fortawesome/free-solid-svg-icons';

import { reloadPage } from '../function/page';
import Card from "../components/card";
import MonsterArea from "../components/monsterArea";
import EventArea from "../components/eventArea";
import StatusBox from "../components/statusBox";
import InitPlayerBox from "../components/initPlayerBox";

import './../css/play-layout.css';
import '../css/sfx.scss';

import data from '../data/test-data.json'
import deckIcon from './../img/icon/card-game.png';
import cardIcon from '../img/icon/card.png';

const initialObjects = {
    'player': initPlayer(data['0']['0001'])
}

// CardDeck
const initialDeck = []

// Game
const Play = (props) => {
    const [player, handlePlayer] = useReducer(playerReducer, initPlayer(props.user.characterInfo[0]));
    const [objectList, handleObjectList] = useReducer(objectListReducer, initialObjects);
    const [cardDeck, handleCardDeck] = useReducer(deckReducer, initialDeck);
    const [floor, setFloor] = useState(1);
    const [round, setRound] = useState(1);
    const [events, setEvents] = useState([]);
    const [gameProccess, setGameProccess] = useState('OUT_COMBAT');
    const [turnEvent, setTurnEvent] = useState('NONE');
    const [turn, setTurn] = useState(0);
    const [cardTarget, handleCardTarget] = useReducer(cardTargetReducer, {targets: [], limit: 0})
    const [cardChosing, setCardChosing] = useState("");
    const [timeline, setTimeline] = useState([{id: 'roundStart', value: 0}]);
    const [turnObject, setTurnObject] = useState("");

    // Init
    const initGame = () => {
        
    }

    const initEvents = (Lvl, round) => {
        const values = Object.values(data['8']);
        const nextEv = [];
        if (round === 5) {

        }
        for (var i=0; i<3; i++) {
            // Copy Event Card
            const event = values[Math.floor(Math.random() * values.length)];
            const newEvent = Object.assign({}, event);
            newEvent.detail = {...event.detail};
            newEvent.detail.action = [...event.detail.action];
            newEvent.detail.action.map((item, idx) => {
                newEvent.detail.action[idx] = Object.assign({}, item);
                newEvent.detail.action[idx].payload = Object.assign({}, item.payload);
                newEvent.detail.action[idx].payload = powerUpByLv(newEvent.detail.action[idx].payload, Lvl);
            })
            // Re-render abilities describe
            newEvent.detail.optimizeDescribeIdx.map((index, idx) => {
                newEvent.detail.optimizeDescribe[index] = newEvent.detail.action[idx].payload.value;
            })
            if (newEvent.detail.optimizeDescribe.length !== 0) newEvent.detail.abilities = "";
            newEvent.detail.optimizeDescribe.map((word)=>{
                newEvent.detail.abilities += word;
            })
            newEvent.detail.Lv = Lvl;
            nextEv.push(newEvent);
        }
        return nextEv;
    }
    
    const initRound = event => {
        // console.log(player);
        event.detail.action.map((action, idx) => {
            handleObjectList({
                type: action.type,
                payload: {...action.payload, lv: event.detail.Lv, actionId:idx}
            });
        });
        handleObjectList({
            type: 'OPTIMIZE_PLAYER',
            payload: {
                item: player
            }
        })
    }

    // Handle Function
    const handleTimeline = objects => {
        const TL = [...timeline]
        // end-turn
        // console.log(objects);
        Object.keys(objects).map((key) => {
            let added = false;
            for (var i = 0; i < TL.length; i++) {
                if (added && TL[i].value - TL[i-1].value < 1) {
                    TL[i].value += 1;
                    continue;
                } else if (added) continue;
                if (objects[key].detail.stat['SPD'].value < TL[i].value) {
                    TL.splice(i, 0, {
                        id: key,
                        value: objects[key].detail.stat['SPD'].value
                    });
                    added = true;
                    continue;
                }
                else if (objects[key].detail.stat['SPD'].value === TL[i].value) {
                    TL.splice(i + 1, 0, {
                        id: key,
                        value: objects[key].detail.stat['SPD'].value
                    });
                    added = true;
                }
            }
            if (!added) TL.push({
                id: key,
                value: objects[key].detail.stat['SPD'].value
            });
        })
        // next-turn
        TL.shift()
        const next = {...TL[0]};
        TL.map((item) => {
            item.value -= next.value;
        })
        setTimeline(timeline => TL);
        setTurnObject(turnObject => next.id);
    }
    
    const handleAction = action => {
        // console.log(action);
        switch (action.type) {
            case 'CREATE':
                let cardType = action.cardID[0];
                let cardID = action.cardID;
                let card = data[cardType][cardID];
                handleObjectList({
                    type: 'ADD_ITEMS_TO',
                    payload: {
                        id: action.id,
                        target: action.target,
                        item: optimizeCard(objectList[action.id], card),
                        amount: action.amount
                    }
                });
                break;
            
            // COMBAT
            // id là mục tiêu của hành động
            // user là đối tượng thực hiện hành động
            
            case 'COMBAT':
                action.payload.steps.map(step => {
                    // console.log(step);
                    handleSFX(step.type);
                    handleObjectList({
                        type: step.type,
                        payload: {
                            ...step.payload,
                            id: action.payload.id,
                            user: action.payload.user
                        }
                    });
                })
                break;
            
            default:
                break;
        }
    }

    const handleRoundStart = (e) => {
        cardDeck.forEach((card) => {
            handleObjectList({
                type: 'ADD_ITEMS_TO',
                payload: {
                    id: 'player',
                    target: 'deck',
                    item: optimizeCard(objectList['player'], card),
                    amount: 1
                }
            });
        })
        objectList['player'].weapon.map((weapon) => {
            weapon.detail.action.map((action) => {
                if (action.when === 'ROUND_START')
                    handleAction({...action, id:'player'});
            })
        })
        handleObjectList({
            type: 'DRAW_CARDS',
            payload: {
                id: 'player',
                amount: 5
            }
        })
    }

    const handleRoundEnd = (e) => {
        console.log("COMPLETE");
        handlePlayer({
            type: 'GAIN_EXP',
            payload: {exp: objectList['player'].detail.stat['EXPGain'].value}
        })
    }

    const handlePlayerTurn = e => {
        setTurn(turn + 1);
        handleObjectList({
            type: "RESET_STATUS",
            payload: {
                id: 'player'
            }
        })
        handleObjectList({
            type: 'DRAW_CARDS',
            payload: {
                id: 'player',
                amount: Math.floor(objectList['player'].detail.stat['ATKSPD'].value)
            }
        });
    }

    const handleTurnEnd = e => {
        handleObjectList({
            type: 'UPDATE_DECK',
            payload: {
                item: objectList['player']['graveyard']
            }
        });
        handleObjectList({
            type: 'CLEAR',
            payload: {
                target: 'graveyard'
            }
        });
    }

    const handleMonsterTurn = e => {
        handleObjectList({
            type: "RESET_STATUS",
            payload: {
                id: turnObject
            }
        })
        const monster = objectList[turnObject];
        for (let i = 1; i <= monster.detail.stat['ATKSPD'].value; i++) {
            const skillID = Math.floor(Math.random()*monster.detail.skill.length);
            const skill = monster.detail.skill[skillID];
            handleAction({
                type: skill.type,
                payload: {
                    steps: [...skill.payload],
                    id: ['player'],
                    user: turnObject,
                }
            });
        }
    }

    const handleProccess = e => {
        switch (e) {
            case 'OUT_COMBAT':
                setEvents(initEvents(floor, round));
                return;
            // ROUND
            case 'ROUND_START':
                handleRoundStart();
                // setProccess('TURN_START');
                handleTimeline(objectList);
                return;
    
            case 'ROUND_END':
                handleRoundEnd();
                const monsterList = {...objectList};
                delete monsterList['player'];
                Object.keys(monsterList).map((key) => {
                    handleObjectList({
                        type: "REMOVE_MONSTER",
                        payload: {id: key}
                    });
                });
                handleCardTarget({
                    type: "CLEAR_TARGET"
                })
                setRound(round + 1);
                setGameProccess('OUT_COMBAT');
                return;

            // TURN
            case 'TURN_START':
                return;

            case 'TURN_END':
                handleTurnEnd();
                if (cardTarget.targets.length !== 0)
                    cardTarget.targets.forEach((target) => {
                        document.getElementById(target).checked = false;
                    })
                handleCardTarget({
                    type: "CLEAR_TARGET"
                })
                handleTimeline({[turnObject]: objectList[turnObject]});
                return;

            case 'PLAYER_TURN':
                handlePlayerTurn();
                setGameProccess('IN_TURN');
                return;

            case 'MONSTER_TURN':
                handleMonsterTurn();
                setTimeout(setGameProccess('TURN_END'), 5000);
                return;

            case 'GAME_OVER':
                return;

            default:
                return;
        }
    }

    const handleCombat = ()=> {

    }

    const handleSFX = (event, target = '') => {
        let delaySFX = 0;
        switch (event) {
            case 'DEAL_DAMAGE':
                delaySFX = 500;
                if (turnObject === 'player')
                    cardTarget.targets.forEach((target) => {
                        console.log(target);
                        document.getElementById(target+"_card").classList.add('takeDamage');
                        setTimeout(() => {
                            document.getElementById(target+"_card").classList.remove('takeDamage');
                        }, 510);
                    })
                setTurnEvent('NONE');
                setCardChosing("");
                handleCardTarget({
                    type: "CLEAR_TARGET"
                });
                break;
            
            case 'SLAY_MONSTER':
                setTimeout(() => {
                    handleCardTarget({
                        type: "CLEAR_TARGET"
                    });
                    handleObjectList({
                        type: "REMOVE_MONSTER",
                        payload: {id: target}
                    });
                }, 1000);
                break;
        
            default:
                break;
        }
    }

    const handleMonsters = () => {
        if (objectList['player'].detail.stat['HP'].value <= 0)
            setGameProccess('GAME_OVER');
        const monsterList = {...objectList};
        delete monsterList['player'];
        Object.keys(monsterList).map((key) => {
            if (objectList[key].detail.stat['HP'].value === 0 && !objectList[key].detail.stat['DEATH']) {
                handleObjectList({
                    type: "CHANGE_STAT",
                    payload: {
                        id: 'player',
                        stat: 'EXPGain',
                        value: data['LEVEL'][objectList[key].detail.stat['Lv']]['gain']
                    }
                });
                handleObjectList({
                    type: "KILL_OBJECT",
                    payload: {
                        id: key
                    }
                });
                setTimeline(timeline.filter(item => item.id != key));
                cardTarget.targets.forEach((target) => {
                    document.getElementById(target).checked = false;
                })
                console.log('EXP GAIN!');
                handleSFX('SLAY_MONSTER', key);
            }
        })
        if (Object.keys(objectList).length <= 1 && gameProccess!=='ROUND_END' && gameProccess!=='OUT_COMBAT')
            setGameProccess('ROUND_END');
    }

    // RENDER
    // initPlayer

    // notification
    const renderNotificationBox = (mes) => {
        return (
            <div id="notificationArea">
                <div className='blocker'></div>
                <div id="notificationBox">
                    <h1 id="notificationTitle">{mes}</h1>
                    <h1 id="notificationDetail"></h1>
                </div>
            </div>
        )
    }

    //timeline
    const renderTimeline = () => {
        return (
            <div id='timelineArea'>
                {
                    timeline.map((item, idx) => {
                        if (item.id === 'roundStart') return;
                        return (
                            <div className="timelineItem" key={idx} style={{top: (item.value*4.12)+9+"em"}}>
                                <img src={objectList[item.id].url} alt={item.id}></img>
                            </div>
                        )
                    })
                }
                <div id='turnShow'>
                    <p>LƯỢT {turn}</p>
                </div>
                <div></div>
            </div>
        );
    }

    // hand card
    const renderHandCard = list => {
        return (
            <div id='cardArea'>
                {
                    list.map((item, idx) => {
                        return (
                            <div className="handCard" key={idx}
                            onClick={(e) => {
                                console.log(cardChosing)
                                if (cardChosing === "handCard"+idx && cardTarget.targets.length < cardTarget.limit) {
                                    document.getElementById("handCard"+idx).checked = false;
                                    setCardChosing("");
                                    handleCardTarget({
                                        type: "SET_LIMIT",
                                        payload: {
                                            value: 0
                                        }
                                    })
                                    return;
                                }
                                if (cardTarget.targets.length === 0) {
                                    setCardChosing("handCard"+idx);
                                    handleCardTarget({
                                        type: "SET_LIMIT",
                                        payload: {
                                            value: item.detail.limit
                                        }
                                    })
                                    return;
                                }
                                item.detail.skill.map((skill) => {
                                    handleAction({
                                        type: skill.type,
                                        payload: {
                                            steps: [...skill.payload],
                                            id: cardTarget.targets,
                                            user: 'player'
                                        }
                                    })
                                    document.getElementById("handCard"+idx).checked = false;
                                })
                                if (item.detail.moreOption['eliminate'] != true)
                                    handleObjectList({
                                        type: 'MOVE_TO',
                                        payload: {
                                            cardId: idx,
                                            from: 'hand',
                                            target: 'graveyard'
                                        }
                                    })
                            }}>
                                <input type="radio" name="handCard" id={"handCard"+idx}></input>
                                <label htmlFor={"handCard"+idx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                    <Card CardDetail={item} />
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    //game
    const renderGameBoard = (
        <div className="content">
            <div className="SFX_Area hidden">
                <div className="blocker"></div>
            </div>
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
                    <li key='round5'
                        style={{fontSize: '1.5em', maxWidth: "30px", display: 'flex'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        style={{width: "100%"}}
                        viewBox="0 0 274.989 274.989" xmlSpace="preserve">
                        <path style={round>=5?{fill: "orange"}:{fill: "transparent", stroke: "orange", strokeWidth: '10'}}
                            d="M179.567,216.044c-5.609,11.237-8.425,16.844-14.02,19.641c-5.609,5.603-16.837,5.603-28.068,5.603
                    c-14.02,0-22.432,0-28.038-5.603c-5.624-2.797-8.432-8.404-14.03-19.641c0,0-2.816-2.781-2.816-5.611l-11.228,2.83l8.429,28.025
                    l16.827,14.049c5.598,14.022,16.835,19.652,30.855,19.652c5.609,0,14.039-2.836,16.835-5.63c5.623-2.816,11.232-8.415,14.04-14.022
                    l16.826-14.049l8.425-28.025l-11.222-2.83C179.567,213.263,179.567,216.044,179.567,216.044L179.567,216.044z M210.458,25.266
                    C190.794,8.448,168.355,0,137.48,0c-30.855,0-53.295,8.448-72.948,25.266C47.701,39.287,36.493,61.729,36.493,87.009
                    c0,22.422,2.787,39.249,8.4,47.7c8.426,14.008,14.04,22.428,14.04,28.032l2.797,22.43l39.28,19.663l8.432,16.84
                    c2.782,0,5.607,0,11.222,2.797c5.613,0,11.222,0,16.817,0c14.039,0,22.459-2.797,30.875-2.797l5.603-16.84l39.291-19.663
                    l2.796-22.43c2.818-5.604,2.818-8.426,2.818-11.216c14.018-19.648,19.633-42.094,19.633-64.517
                    C238.496,61.729,230.086,39.287,210.458,25.266L210.458,25.266z M95.412,162.742c-16.845,0-22.44-11.216-22.44-28.032
                    c0-8.451,0-16.867,5.595-19.652c2.802-5.626,8.434-8.415,16.845-8.415c16.812,0,25.252,8.415,25.252,25.237
                    C120.664,151.526,112.224,162.742,95.412,162.742L95.412,162.742z M145.921,193.597c-2.831,0-5.633,0-8.44-2.806
                    c-2.817,2.806-2.817,2.806-5.595,2.806c-2.836,0-5.609,0-8.425-2.806c-2.797,0-2.797-2.791-2.797-5.618
                    c0-2.776,2.797-8.387,5.613-11.198c5.609-5.621,8.387-11.232,11.204-16.837c2.807,5.604,8.44,11.216,11.231,16.837
                    c5.604,2.811,5.604,8.422,5.604,11.198C154.316,190.791,151.519,193.597,145.921,193.597L145.921,193.597z M182.385,162.742
                    c-16.837,0-25.263-11.216-25.263-28.032c0-16.867,8.426-28.068,25.263-28.068c8.409,0,14.018,2.79,16.826,8.415
                    c5.613,2.785,5.613,8.411,5.613,16.821C204.823,151.526,196.403,162.742,182.385,162.742L182.385,162.742z"/>
                    </svg>
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
                    <li key='BOSS'
                        style={{fontSize: '1.5em', maxWidth: "40px", display: 'flex'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        style={{width: "100%"}}
                        viewBox="0 0 512 512" xmlSpace="preserve">
                        <path style={round>=10?{fill: "red"}:{fill: "transparent", stroke: "red", strokeWidth: '10'}}
                            d="M92.406 13.02l-.164 156.353c3.064.507 6.208 1.38 9.39 2.627 36.496 14.306 74.214 22.435 111.864 25.473l43.402-60.416 42.317 58.906c36.808-4.127 72.566-12.502 105.967-24.09 3.754-1.302 7.368-2.18 10.818-2.6l1.523-156.252-75.82 95.552-34.084-95.55-53.724 103.74-53.722-103.74-35.442 95.55-72.32-95.55h-.006zm164.492 156.07l-28.636 39.86 28.634 39.86 28.637-39.86-28.635-39.86zM86.762 187.55c-2.173-.08-3.84.274-5.012.762-2.345.977-3.173 2.19-3.496 4.196-.645 4.01 2.825 14.35 23.03 21.36 41.7 14.468 84.262 23.748 126.778 26.833l-17.75-24.704c-38.773-3.285-77.69-11.775-115.5-26.596-3.197-1.253-5.877-1.77-8.05-1.85zm333.275.19c-2.156.052-5.048.512-8.728 1.79-33.582 11.65-69.487 20.215-106.523 24.646l-19.264 26.818c40.427-2.602 80.433-11.287 119.22-26.96 15.913-6.43 21.46-17.81 21.36-22.362-.052-2.276-.278-2.566-1.753-3.274-.738-.353-2.157-.71-4.313-.658zm-18.117 47.438c-42.5 15.87-86.26 23.856-130.262 25.117l-14.76 20.547-14.878-20.71c-44.985-1.745-89.98-10.23-133.905-24.306-12.78 28.51-18.94 61.14-19.603 93.44 37.52 17.497 62.135 39.817 75.556 64.63C177 417.8 179.282 443.62 174.184 467.98c7.72 5.007 16.126 9.144 24.98 12.432l5.557-47.89 18.563 2.154-5.935 51.156c9.57 2.21 19.443 3.53 29.377 3.982v-54.67h18.69v54.49c9.903-.638 19.705-2.128 29.155-4.484l-5.857-50.474 18.564-2.155 5.436 46.852c8.747-3.422 17.004-7.643 24.506-12.69-5.758-24.413-3.77-49.666 9.01-72.988 13.28-24.234 37.718-46 74.803-64.29-.62-33.526-6.687-66.122-19.113-94.23zm-266.733 47.006c34.602.23 68.407 12.236 101.358 36.867-46.604 33.147-129.794 34.372-108.29-36.755 2.315-.09 4.626-.127 6.933-.11zm242.825 0c2.307-.016 4.617.022 6.93.11 21.506 71.128-61.684 69.903-108.288 36.757 32.95-24.63 66.756-36.637 101.358-36.866zM255.164 332.14c11.77 21.725 19.193 43.452 25.367 65.178h-50.737c4.57-21.726 13.77-43.45 25.37-65.18z"/>
                    </svg>
                    </li>
                    <li key='nextFloor' style={{fontSize: '2em'}}>
                        Tầng {floor + 1}
                    </li>
                </ul>
                
                {gameProccess!=='OUT_COMBAT' && gameProccess!=='ROUND_END' && renderTimeline()}
                                
                <div className="contentArea">
                    {gameProccess==='OUT_COMBAT'?
                    <EventArea events={events} setGameProccess={setGameProccess} initRound={initRound} />:
                    <MonsterArea list={objectList} monsterChosing={cardTarget} handle={handleCardTarget} />}
                </div>

                <div id='playerInfo'>
                    <div id='playerMoreInfo'>
                        <div id='playerAvatar'
                            onClick={() => document.getElementById('playerStatus').classList.toggle('openWideUp')}>
                            <img src={objectList['player'].url} alt={objectList['player'].alt}></img>
                            <div id='playerStatus'>
                                <div className="statusBox">
                                    <StatusBox target={objectList['player']} origin={player} proccess={gameProccess} handle={handlePlayer} />
                                </div>
                            </div>
                        </div>
                        <div id='playerLevel'><p>{objectList['player'].detail.stat['Lv'].value}</p></div>
                        <div id='playerMaxHP' className="MaxHPBar">
                            <div id='playerHP' className="HPBar"
                                style={{width: (objectList['player'].detail.stat['HP'].value/objectList['player'].detail.stat['MaxHP'].value)*100+'%'}}></div>
                            <p>{objectList['player'].detail.stat.HP.value}/{objectList['player'].detail.stat.MaxHP.value}</p>
                        </div>
                        {objectList['player'].detail.stat.SHIELD.value>0 && <div id="playerShield">
                            <div className="shieldBar" />
                            <div className="shieldValue">
                                <p>{objectList['player'].detail.stat.SHIELD.value}</p>
                            </div>
                        </div>}
                        <div id='playerMaxMP' className="MaxMPBar">
                            <div id='playerMP' className="MPBar"
                                style={{width: (objectList['player'].detail.stat.MP.value/objectList['player'].detail.stat.MaxMP.value)*100+'%'}}></div>
                            <p>{objectList['player'].detail.stat.MP.value}/{objectList['player'].detail.stat.MaxMP.value}</p>
                        </div>
                        <div id='playerMaxEXP'>
                            <div id='playerEXP' style={{width: (objectList['player'].detail.stat.EXP.value/objectList['player'].detail.stat.MaxEXP.value)*100+'%'}}></div>
                        </div>
                    </div>

                    {gameProccess!=='OUT_COMBAT' && gameProccess!=='ROUND_END' && renderHandCard(objectList['player'].hand)}

                    <div id='playerItems'>
                        <button id='playerDeck'>
                            <img src={deckIcon}></img>
                        </button>

                        <div id='playerBag'>
                            <img src="https://i.ibb.co/pxwVsx6/bag.png"></img>
                        </div>
                    </div>
                    {gameProccess!=='OUT_COMBAT' && gameProccess!=='ROUND_END' &&
                    <div id='end-turn-btn'>
                        <p id="next-turn-cards">+{Math.floor(objectList['player'].detail.stat['ATKSPD'].value)}</p>
                        <img src={cardIcon}></img>
                        <button className={gameProccess==='IN_TURN'?"big-button":"big-button disable-btn"}
                            onClick={() => {if (gameProccess==='IN_TURN') setGameProccess('TURN_END')}}>KẾT THÚC LƯỢT</button>
                    </div>}
                </div>
            </div>
        </div>
    );

    // UPDATE
    useEffect(() => {
        reloadPage();
    }, []);

    useEffect(() => {
        if (player.detail.stat['EXP'].value >= player.detail.stat['MaxEXP'].value) {
            handlePlayer({
                type: 'LEVEL_UP'
            })
        }
        handleObjectList({
            type: "OPTIMIZE_PLAYER",
            payload: {
                item: player
            }
        })
        console.log(props.user.characterInfo[props.user.chosingCharacter]);
        console.log(player);
    }, [player])

    useEffect(() => {
        // console.log(objectList);
        // console.log(turnObject);
        // console.log(timeline);
        if (turnObject === '' || gameProccess === 'IN_TURN')
            return;
        else if (turnObject !== 'player')
            setGameProccess('MONSTER_TURN');
        else setGameProccess('PLAYER_TURN');
    }, [timeline]);
    
    useEffect(() => {
        if (round > 10) {
            setFloor(floor => floor + 1);
            setRound(1);
        }
        handleProccess(gameProccess);
        handleMonsters();
    }, [gameProccess]);

    useEffect(() => {
        if (cardTarget.targets.length === cardTarget.limit && cardChosing!=="")
            document.getElementById(cardChosing).click();
    }, [cardTarget])
    
    useEffect(() => {
        handleMonsters();
        // console.log(objectList);
        // console.log(player);
    }, [objectList]);

    return (
        <div className="container play-layout">
            <div id='page-banner'>
                <div className='overlay-img'></div>
            </div>
            <div className='content Notification'>
                <FontAwesomeIcon icon={faCircleInfo} style={{color: '#72e1ff'}}/>
                <p>Chức năng này hiện chưa ra mắt, đây chỉ tổng quan thiết kế.</p>
                <p>Kích thước màn hình: 1320 x 800.</p>
            </div>
            <div className="container" id="body-container">
                {
                    props.isLogin?renderGameBoard:(
                    <div className="content">

                    </div>
                    )
                }
            </div>
        </div>
    );
};
  
const mapStateToProps = state => {
    return {
      user: state.user
    }
}
  
  const mapDispatchToProps = dispatch => {
    return {
    //   loginAction: (info) => dispatch({
    //     type: "SET_LOGIN_INFO",
    //     payload: info
    //   })
    }
}
  
export default connect( mapStateToProps, mapDispatchToProps )(Play);