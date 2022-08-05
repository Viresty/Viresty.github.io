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
        faCaretLeft, faCaretRight, 
        } from '@fortawesome/free-solid-svg-icons';

import Card from "../components/card";
import MonsterCard from "../components/monsterCard";
import EventCard from "../components/eventCard";
import StatusBox from "./statusBox";

import data from '../data/test-data.json'
import deckIcon from './../img/icon/card-game.png';
import cardIcon from '../img/icon/card.png';

const InitPlayerBox = (props) => {

    const originStatus = props.origin;
    const player = props.target;
    const gameProccess = props.proccess;

    const cardJob = Object.values(data['0']);
    const beginWeapon = Object.values(data['1']);
    const [jobIdx, setJobIdx] = useState(0);
    const [ttStep, setTTStep] = useState(0);

    const nextStep = () => {

    }

    useEffect(() => {
        props.handle({
            type: "INIT_JOB",
            payload: {
                job: cardJob[jobIdx]
            }
        });
    }, [jobIdx])

    return (
        <div className="notificationArea" id="initPlayerBox">
            <div className='blocker'></div>
            <div className="notificationBox">
                <h1 className="notificationTitle">INIT PLAYER</h1>
                <div className="contentBox" style={{height: "41em"}}>
                    <div className="contentBoxColumn" id="ttStep_1">
                        {/* step 1 */}
                        <div className="contentBoxRow">
                            <div className="contentBoxItem">
                                <h1 className="contentBoxTitle">Chọn nghề nghiệp</h1>
                                <div className="contentBoxRow" id="initJobBox">
                                    <div onClick={() => {
                                                if (jobIdx>0) setJobIdx(jobIdx - 1);
                                                else setJobIdx(cardJob.length - 1);
                                            }}>
                                        <Card CardDetail={jobIdx>0?cardJob[jobIdx-1]:cardJob[cardJob.length-1]}/>
                                    </div>
                                    <Card CardDetail={cardJob[jobIdx]}/>
                                    <div onClick={() => {
                                            if (jobIdx+1<cardJob.length) setJobIdx(jobIdx + 1);
                                            else setJobIdx(0);
                                        }}>
                                        <Card CardDetail={jobIdx+1<cardJob.length?cardJob[jobIdx+1]:cardJob[0]}/>
                                    </div>
                                </div>
                            </div>
                            <div className="contentBoxItem">
                                <h1 className="contentBoxTitle">Thiết lập chỉ số cơ bản</h1>
                                <StatusBox target={player} handle={props.handle} proccess={gameProccess} origin={originStatus} />
                            </div>
                        </div>
                        {/* step 2 */}
                        <div className="contentBoxColumn" id="ttStep_2">
                            {
                                
                            }
                        </div>
                        <div className="contentBoxRow" style={{flexGrow: "0"}}>
                            <button className="big-button" style={{marginRight: "5em"}}>QUAY LẠI</button>
                            <button className="big-button" style={{marginRight: "5em"}}>TIẾP TỤC</button>
                            <button className="big-button"
                                onClick={() => {
                                    document.getElementById("initPlayerBox").classList.add("hidden");
                                }}>ĐÓNG</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InitPlayerBox;