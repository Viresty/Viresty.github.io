import React, { useReducer, useState, useEffect } from "react";
import { playerReducer, deckReducer, objectListReducer, cardTargetReducer } from "../reducers/playReducer";
import { connect } from 'react-redux';
import { useParams, Link, NavLink } from 'react-router-dom';
import DonutChart from 'react-donut-chart';

import '../css/userProfile.scss';

import { optimizeCard,
    createMonster,
    powerUpByLv,
    powerUpByPoint,
    initPlayer,
    optimizePlayer
} from "../function/playFuction";
import { initCharacter } from "../actions/user";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
        } from '@fortawesome/free-regular-svg-icons';
import { faUsersBetweenLines,
         faUser,
         faWarehouse,
         faTrophy,
         faPlusCircle,
         faPlus
        } from '@fortawesome/free-solid-svg-icons';

import { reloadPage } from '../function/page';
import Card from "../components/card";
import StatusBox from "../components/statusBox";
import InitPlayerBox from "../components/initPlayerBox";

import data from '../data/test-data.json';
import maxhpIcon from '../img/icon/maxhp.png'
import maxmpIcon from '../img/icon/maxmp.png'
import atkIcon from '../img/icon/sword.png';
import defIcon from '../img/icon/shield.png';
import atkspdIcon from '../img/icon/atkspd.png';
import spdIcon from '../img/icon/spd.png';
import strIcon from '../img/icon/str.png';
import pdmgIcon from '../img/icon/pdmg.png';

import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
  
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const UserProFile = ({ user, login = false, action }) => {
    const [player, handlePlayer] = useReducer(playerReducer, initCharacter(user.characterInfo[0]));
    const [newChar, initNewChar] = useReducer(playerReducer, initPlayer(data['0']['0001']));
    const profileInfo = useParams();
    
    const infotag = [
        {
            name: "TỔNG QUAN",
            link: "/",
            icon: faUser
        }, {
            name: "NHÂN VẬT",
            link: "/characters",
            icon: faUsersBetweenLines
        }, {
            name: "KHO ĐỒ",
            link: "/inventory",
            icon: faWarehouse
        }, {
            name: "THÀNH TÍCH",
            link: "/achievements",
            icon: faTrophy
        }
    ]

    const hideStat = ['HP', 'MP', 'Lv', 'SHIELD', 'DEATH', 'EXP', 'MaxEXP', 'POINT'];
    const statKeys = ['MaxHP', 'MaxMP', 'ATK', 'DEF', 'PDMG', 'ATKSPD', 'SPD', 'STR'];

    const color = {
        "MaxHP": "rgb(240, 45, 45, 0.4)",
        "MaxMP": "#3caeff64",
        "ATK": "rgba(255, 166, 0, 0.4)",
        "DEF": "#55555564",
        "PDMG": "#D2691E64",
        "ATKSPD": "rgba(128, 0, 128, 0.4)",
        "SPD": "rgba(0, 128, 0, 0.4)",
        "STR": "rgb(200, 200, 0, 0.4)"
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

    const cdata = {
        labels: statKeys.map(key => data['STAT_NAME'][key]),
        datasets: [
            {
                label: player.detail.name,
                data: statKeys.map(key => player.detail.stat[key].point),
                backgroundColor: Object.values(color),
                borderWidth: 2
            },
        ],
    };

    useEffect(() => {
        reloadPage();
        console.log("Dữ liệu nhân vật của người dùng: ", user.characterInfo[0])
    }, []);

    useEffect(() => {
        console.log('Thay đổi dữ liệu nhân vật người dùng!');
        console.log(player);
    }, [player]);

    useEffect(() => {
        handlePlayer({
            type: "SET_PLAYER",
            payload: {
                item: user.characterInfo[user.chosingCharacter]
            }
        })
    }, [user])

    // Render

    const infoTagRender = infotag.map((item, idx) => {
        return (
            <li id={item.id} key={idx}>
                <NavLink to={'/profile/'+user.accountInfo.UID+item.link}>
                    <FontAwesomeIcon icon={item.icon} />
                    {item.name}
                </NavLink>
            </li>
        )
    })

    const openCharacterCreateBox = () => {
        document.getElementById("allCharactersList").classList.add('hidden');
        document.getElementById("createCharacterBox").classList.remove('hidden');
    }

    const newCharacter = (
        <div className="content hidden" id="createCharacterBox">
            <InitPlayerBox
                target={newChar}
                handle={initNewChar} />
            <button onClick={() => action.newCharacter(newChar)}>OK</button>
        </div>
    )

    const openCharacterInfoBox = () => {
        document.getElementById("allCharactersList").classList.add('hidden');
        document.getElementById("characterInfo").classList.remove('hidden');
    }

    const characterInfo = (
        <div className="content hidden" id="characterInfo">
            <div className="flexColGrow">
                <div className="flexRowGrow">
                    <div className="contentBoxItem">
                        <PolarArea data={cdata} id="statsRadarChart" />
                    </div>
                    <div className="contentBoxItem">
                        <StatusBox target={player} handle={handlePlayer}/>
                    </div>
                </div>
                <div>
                    TRANG BIJ
                </div>
                <button onClick={() => action.updateCharacter(player)}>OK</button>
            </div>
        </div>
    )

    const allCharacters = (
            <div id="allCharacters">
                <div id='allCharactersList'>
                    {
                        user.characterInfo.map((character, idx) => {
                            return (
                                <div className="character" id={"character"+idx} key={idx}>
                                    <div className="characterImg">
                                        <img src={character.url} alt={character.alt}></img>
                                    </div>
                                    <div className="shader">
                                        <h1>{character.nickname}</h1>
                                        <p>CHỨC NGHIỆP: {character.detail.name}</p>
                                        <p>CẤP ĐỘ: {character.detail.stat['Lv'].value}</p>
                                        <button className="moreCharacterInfo-btn"
                                            onClick={openCharacterInfoBox}
                                        >XEM THÊM</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                        {user.characterInfo.length < 10 &&
                        <>
                            <button id='newCharacter-btn'
                                onClick={openCharacterCreateBox}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                <h1>NHÂN VẬT MỚI</h1>
                                <p>SỐ LƯỢNG NHÂN VẬT: {user.characterInfo.length}/10</p>
                            </button>
                        </>}
                </div>
                {newCharacter}
                {characterInfo}
            </div>
    )

    const overview = (
        <div className="" id="userOverview">
            <div className="overviewItem">
                <h3>Tổng số quái đã tiêu diệt: {user.achievement['totalMonsterKill']}</h3>
                <DonutChart
                    className="monsterKillChart"
                    legend={false}
                    width={500}
                    data={[
                        {
                        label: 'Số quái nhỏ đã tiêu diệt',
                        value: user.achievement['monsterKill'] + (user.achievement['totalMonsterKill']===0),
                        isEmpty: (user.achievement['monsterKill']===0)
                        },
                        {
                        label: 'Số quái lớn đã tiêu diệt',
                        value: user.achievement['miniBossKill'] + (user.achievement['totalMonsterKill']===0),
                        isEmpty: (user.achievement['miniBossKill']===0)
                        },
                        {
                        label: 'Số quái khủng tiêu diệt',
                        value: user.achievement['bossKill'] + (user.achievement['totalMonsterKill']===0),
                        isEmpty: (user.achievement['bossKill']===0)
                        }
                    ]}
                    innerRadius={0.75}
                    outerRadius={0.85}
                />
            </div>
            <div className="overviewItem">
                <p>Số lần chơi: {user.achievement['playCount']}</p>
                <p>Số lần thất bại: {user.achievement['deathCount']}</p>
                <p>Số tầng đã vượt qua: {user.achievement['floorClear']}</p>
                <p>Tầng sâu nhất đã đạt được: {user.achievement['highestFloor']}</p>
            </div>
        </div>
    )

    return (
        <div className='container profile-layout'>
            <div className='container' id="body-container">
                <div className="flexColGrow">
                    <div className="userProfile flexRowGrow">
                        <img id="userAvatar" src={user.accountInfo.avatarUrl}></img>
                        <div className="flexColGrow userAccountInfo">
                            <p id="userUID"><u>UID</u>: #{user.accountInfo.UID}</p>
                            <div className="userTitle">
                                <p>TÂN BINH</p>
                            </div>
                            <h1 id="userNickName">{user.accountInfo.nickname}</h1>
                            <h3 id="userEmail">{user.accountInfo.email}</h3>
                            <div className="NavBar">
                                <ul className="NavBarUl">
                                    {infoTagRender}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="content profileContent">
                        {profileInfo.infotag===undefined&&overview}
                        {profileInfo.infotag==="characters"&&allCharacters}
                    </div>
                </div>
            </div>
        </div>
  );
}

const mapStateToProps = state => {
    return {
        user: state.user,
        login: state.login
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        action: {
            getUserInfo: (uid) => {
                dispatch({
                    type: "GET_USER_INFO",
                    payload: {
                        UID: uid
                    }
                })
            },
            updateCharacter: (item) => {
                dispatch({
                    type: "UPDATE_CHARACTER",
                    payload: {
                        item: item
                    }
                });
                dispatch({
                    type: "SAVE_USER"
                });
            },
            newCharacter: (item) => {
                dispatch({
                    type: "ADD_CHARACTER",
                    payload: {
                        item: item
                    }
                });
                dispatch({
                    type: "SAVE_USER"
                });
            }
        }
    }
}
  
export default connect( mapStateToProps, mapDispatchToProps )(UserProFile);