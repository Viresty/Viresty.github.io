import { optimizeCard,
    createMonster,
    powerUpByLv,
    powerUpByPoint,
    initPlayer,
    optimizePlayer
} from "../function/playFuction";

import userdata from '../data/user-data.json'
import logindata from '../data/login-data.json'

const initialUser = {
    loginInfo: {
        username: '',
        password: '',
    },
    accountInfo: {
        UID: '',
        email: '',
        avatarUrl: '',
        nickname: '',
    },
    chosingCharacter: 0,
    characterInfo: [
        {
            url: "",
            alt: "",
            "fullview-url": "",
            "avt-url": "",
            name: "",
            detail: {
                name: "SÁT THỦ",
                type: "Chức Nghiệp",
                stat: {
                    "MaxHP": {
                        "basic": 10,
                        "point": 3,
                        "pointPowerUp": 2,
                        "value": 16
                    }, 
                    "MaxMP": {
                        "basic": 0,
                        "point": 2,
                        "pointPowerUp": 1,
                        "value": 2
                    }, 
                    "ATK": {
                        "basic": 1,
                        "point": 3,
                        "pointPowerUp": 1,
                        "value": 4
                    },
                    "DEF": {
                        "basic": 0,
                        "point": 0,
                        "pointPowerUp": 1,
                        "value": 0
                    },
                    "PDMG": {
                        "basic": 0,
                        "point": 3,
                        "pointPowerUp": 0.2,
                        "value": 0.6
                    },
                    "ATKSPD": {
                        "basic": 0.6,
                        "point": 2,
                        "pointPowerUp": 0.2,
                        "value": 1
                    },
                    "SPD": {
                        "basic": 10.2,
                        "point": 2,
                        "pointPowerUp": -0.2,
                        "value": 9.8
                    },
                    "STR": {
                        "basic": 5,
                        "point": 0,
                        "pointPowerUp": 0.5,
                        "value": 5
                    },
                    "Lv": {
                        "value": 1
                    },
                    "EXP": {
                        "value": 0
                    },
                    "MaxEXP": {
                        "value": 10
                    },
                    "POINT": {
                        "value": 5
                    }
                },
            },
            deck: [],
            buff: [],
            weapon: [],
            bag: []
        }
    ]
}

export default(states = initialUser, action) => {
    var state = {...states}
    const payload = action.payload;

    switch (action.type) {

        case "USER_LOGIN":
            state.loginInfo.username = payload.username;
            state.loginInfo.password = payload.password;
            state.accountInfo.UID = payload.UID;
            return state;

        case "GET_USER_INFO":
            let userInfo = localStorage.getItem('userInfo'+payload.UID);
            userInfo = JSON.parse(userInfo);
            if (userInfo != "undefined" && userInfo != null) {
                console.log("Lấy dữ liệu người dùng " + payload.UID + " thành công từ localStorage.");
                state = Object.assign(state, userInfo);
            }
            else {
                console.log("Lấy dữ liệu người dùng " + payload.UID + " thành công từ database.");
                state = Object.assign(state, userdata[payload.UID]);
            }
            console.log("Dữ liệu người dùng " + payload.UID + " lấy được: ", state);
            return state;

        case "UPDATE_CHARACTER":
            console.log('Cập nhập nhân vật!');
            // clone detail
            state.characterInfo[state.chosingCharacter] = {...payload.item, detail: Object.assign({}, payload.item.detail)};
            // clone status
            state.characterInfo[state.chosingCharacter].detail.stat = Object.assign({}, payload.item.detail.stat);
            Object.keys(state.characterInfo[state.chosingCharacter].detail.stat).map((key, idx) => {
                // Clone stat
                state.characterInfo[state.chosingCharacter].detail.stat[key] = Object.assign({}, payload.item.detail.stat[key]);
                state.characterInfo[state.chosingCharacter].detail.stat[key] = powerUpByPoint(payload.item.detail.stat[key]);
            })
            state.characterInfo[state.chosingCharacter].deck = [...payload.item.deck]
            state.characterInfo[state.chosingCharacter].buff = [...payload.item.buff]
            state.characterInfo[state.chosingCharacter].weapon = [...payload.item.weapon]
            state.characterInfo[state.chosingCharacter].bag = [...payload.item.bag]
            return state;

        case "SAVE_USER":
            localStorage.setItem('userInfo'+state.accountInfo.UID, JSON.stringify(state));
            console.log('Đã lưu trữ dữ liệu người dùng '+state.accountInfo.UID);
            console.log(JSON.parse(localStorage.getItem('userInfo'+state.accountInfo.UID)));
            return state;
        
        default:
            return state;
    }
};