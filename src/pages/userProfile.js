import React, { useReducer, useState, useEffect } from "react";
import { playerReducer, deckReducer, objectListReducer, cardTargetReducer } from "../reducers/playReducer";
import { connect } from 'react-redux';
import { useParams, Link, NavLink } from 'react-router-dom';

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
         faTrophy
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

const UserProFile = ({ user, action }) => {
    const [player, handlePlayer] = useReducer(playerReducer, initCharacter(user.characterInfo[0]));
    const profileInfo = useParams();
    
    const infotag = [
        {
            name: "TỔNG QUAN",
            link: "/",
            icon: faUser
        }, {
            name: "NHÂN VẬT",
            link: "/character",
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

    const hideStat = ['HP', 'MP', 'Lv', 'SHIELD', 'DEATH'];

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

    useEffect(() => {
        reloadPage();
        console.log("Dữ liệu nhân vật của người dùng: ", user.characterInfo[0])
    }, []);

    useEffect(() => {
        console.log('Thay đổi dữ liệu nhân vật người dùng!');
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

    const allCharacters = (
        <div id='allCharactersList'>
            {
                user.characterInfo.map((character, idx) => {
                    const statKeys = Object.keys(character.detail.stat).filter(key => !hideStat.includes(key));

                    return (
                        <div className="character cardPreview" id={"character"+idx}>
                            <img src={character.url} alt={character.alt}></img>
                            
                        </div>
                    )
                })
            }
        </div>
    )

    const newCharacter = (
        <div className="newCharBox content">
            <InitPlayerBox
                target={player}
                handle={handlePlayer} />
            <button onClick={() => action.updateCharacter(player)}>OK</button>
        </div>
    )

    return (
        <div className='container profile-layout'>
            <div className='container' id="body-container">
                <div className="flexColGrow">
                    <div className="userProfile flexRowGrow">
                        <img id="userAvatar" src={user.accountInfo.avatarUrl}></img>
                        <div className="flexColGrow userAccountInfo">
                            <p>{profileInfo.infotag===undefined}</p>
                            <p id="userUID"><u>UID</u>: #{user.accountInfo.UID}</p>
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
                        {allCharacters}
                    </div>
                </div>
            </div>
        </div>
  );
}

const mapStateToProps = state => {
    return {
      user: state.user
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