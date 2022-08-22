import React, { useReducer, useState, useEffect } from "react";
import { playerReducer, deckReducer, objectListReducer } from "../reducers/playReducer";
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
        faCaretLeft, faCaretRight, faInfoCircle, 
        } from '@fortawesome/free-solid-svg-icons';

import Card from "../components/card";

import data from '../data/test-data.json'
import deckIcon from './../img/icon/card-game.png';
import cardIcon from '../img/icon/card.png';

const StatusBox = (props) => {
    const originStatus = props.origin;
    const player = props.target;
    const gameProccess = (props.proccess!==undefined?props.proccess:'OUT_COMBAT');

    const [statusPoint, setStatusPoint] = useState({
        "MaxHP": 0,
        "MaxMP": 0,
        "ATK": 0,
        "DEF": 0,
        "PDMG": 0,
        "ATKSPD": 0,
        "SPD": 0,
        "STR": 0
    })
    
    const [totalPoint, setTotalPoint] = useState(player.detail.stat['POINT'].value);
    const playerStatus = {...player};
    
    const color = {
        "MaxHP": "rgb(240, 45, 45)",
        "MaxMP": "#3caeff",
        "ATK": "orange",
        "DEF": "#555",
        "PDMG": "#D2691E",
        "ATKSPD": "purple",
        "SPD": "green",
        "STR": "rgb(200, 200, 0)"
    }

    const addStatusPoint = (key, value) => {
        if (totalPoint > 0) {
            setTotalPoint(totalPoint => totalPoint -= 1);
            setStatusPoint(statusPoint => statusPoint = {
                ...statusPoint,
                [key]: statusPoint[key] += value
            });
        }
    }

    const subtractStatusPoint = (key, value) => {
        if (statusPoint[key] > 0) {
            setTotalPoint(totalPoint => totalPoint += 1);
            setStatusPoint(statusPoint => statusPoint = {
                ...statusPoint,
                [key]: statusPoint[key] -= value
            });
        }
    }

    useEffect(() => {
        // console.log(props)
        setTotalPoint(player.detail.stat['POINT'].value);
    }, [props])

    return (
        <div className="statusBox" onClick={(e) => {e.stopPropagation(); }}>
            <div className='statusBoxItem'
                style={gameProccess === "OUT_COMBAT"?
                {}:{gridTemplateColumns: "3fr 3fr 3fr"}}>
                <p>Thuộc tính</p>
                <p>Chỉ số</p>
                <p>{gameProccess === "OUT_COMBAT"?"Điểm cộng":""}</p>
            </div>
            {
                Object.keys(playerStatus.detail.stat).map((key, idx) => {
                    if (idx >= 8) return;
                    return (
                        <div className="statusBoxItem" key={idx}
                            style={gameProccess === "OUT_COMBAT"?
                            {borderColor: color[key]}:
                            {borderColor: color[key], gridTemplateColumns: "3fr 3fr 3fr"}}>
                            <p>
                                {data['STAT_NAME'][key]}
                                <span className="infoIcon">
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    <span className="statInfo" style={{backgroundColor: color[key]}}>
                                        {data['INFO'][key]}
                                    </span>
                                </span>
                            </p>
                            <p>{Math.round((playerStatus.detail.stat[key].value + (playerStatus.detail.stat[key].pointPowerUp * statusPoint[key]))*10)/10}</p>
                            {gameProccess === "OUT_COMBAT"?(<p>{statusPoint[key]}</p>):
                            (
                                <div>
                                    {playerStatus.detail.stat[key].value > originStatus.detail.stat[key].value &&
                                    (<p style={{color: "green"}}>+{playerStatus.detail.stat[key].value - originStatus.detail.stat[key].value}</p>)}
                                    {playerStatus.detail.stat[key].value < originStatus.detail.stat[key].value &&
                                    (<p style={{color: "red"}}>{playerStatus.detail.stat[key].value - originStatus.detail.stat[key].value}</p>)}
                                </div>
                            )}
                            {gameProccess === "OUT_COMBAT" && (<button onClick={
                                    () => { addStatusPoint(key, 1)}
                                }>
                                <FontAwesomeIcon icon={faPlus} /></button>)}
                            {gameProccess === "OUT_COMBAT" && (<button onClick={
                                    () => {subtractStatusPoint(key, 1)}
                                }>
                                <FontAwesomeIcon icon={faMinus} /></button>)}
                        </div>
                        )
                    })
                }
            <div className="statusBoxItem">
                <p style={{gridColumn: "1 / span 2"}}>Điểm nâng cấp</p>
                <p style={{gridColumn: "4 / span 2"}}>{totalPoint}</p>
            </div>
            {gameProccess === "OUT_COMBAT" && (
            <div className="statusBoxItem" style={{gridTemplateColumns: "1fr 1fr"}}>
                <button className='big-button'
                    onClick={() => {
                        props.handle({
                            type: "ADD_POINTS",
                            payload: {
                                item: statusPoint,
                                pointLeft: totalPoint
                            }
                        })
                        setStatusPoint({
                            "MaxHP": 0,
                            "MaxMP": 0,
                            "ATK": 0,
                            "PDMG": 0,
                            "DEF": 0,
                            "ATKSPD": 0,
                            "SPD": 0,
                            "STR": 0
                        });
                    }}>LƯU</button>
                <button className='big-button'
                    onClick={() => {
                        setStatusPoint({
                            "MaxHP": 0,
                            "MaxMP": 0,
                            "ATK": 0,
                            "PDMG": 0,
                            "DEF": 0,
                            "ATKSPD": 0,
                            "SPD": 0,
                            "STR": 0
                        });
                        setTotalPoint(player.detail.stat['POINT'].value);
                    }}>LÀM LẠI</button>
            </div>)}
        </div>
    );
}

export default StatusBox;