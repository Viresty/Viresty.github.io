import { optimizeCard,
        createMonster,
        powerUpByLv,
        powerUpByPoint,
        initPlayer,
        optimizePlayer,
    } from "../function/playFuction";
import { initCharacter } from "../actions/user";

import data from '../data/test-data.json'
import { startTransition } from "react";


export const playerReducer = (states, action) => {
    var state = {...states}
    const payload = action.payload;
    // console.log(action);
    switch (action.type) {
        case 'SET_PLAYER':
            state = initCharacter(payload.item);
            return state;

        case 'GAIN_EXP': // exp
            state.detail.stat['EXP'].value += payload.exp;
            return state;

        case 'LEVEL_UP':
            state.detail.stat['Lv'].value += 1;
            Object.keys(state.detail.stat).forEach((key) => {
                if (state.detail.stat[key].lvPowerUp !== undefined)
                state.detail.stat[key] = powerUpByLv(state.detail.stat[key], state.detail.stat['Lv'].value);
            })
            state.detail.stat['MaxHP'].value += state.detail.stat['HP'].lvPowerUp;
            state.detail.stat['MaxMP'].value += state.detail.stat['HP'].lvPowerUp;
            const newEXP = state.detail.stat['EXP'].value - state.detail.stat['MaxEXP'].value;
            state.detail.stat['EXP'].value = newEXP;
            state.detail.stat['MaxEXP'].value = data['LEVEL'][state.detail.stat['Lv'].value]['max'];
            state.detail.stat['POINT'].value += 5;
            return state;

        case 'INIT_JOB': // payload.jo
            state = initPlayer(payload.job);
            return state;

        case 'ADD_POINTS': // item
            Object.keys(payload.item).forEach((key) => {
                state.detail.stat[key].point += payload.item[key];
                state.detail.stat[key] = powerUpByPoint(state.detail.stat[key]);
                // console.log(state.detail.stat[key]);
            })
            state.detail.stat['POINT'].value = payload.pointLeft;
            return state;
    
        default:
            return state;
    }
}

export const objectListReducer = (states, action) => {
    const state = {...states}
    const payload = action.payload;
    switch (action.type) {
        // COMBAT
        // id là mục tiêu của hành động
        // user là đối tượng thực hiện hành động

        case 'CHANGE_STAT': // id, stat, value
            // console.log(payload.value);
            state[payload.id].detail.stat[payload.stat].value += payload.value;
            return state;

        case 'SET_STAT': // id, stat, value
            state[payload.id].detail.stat[payload.stat].value = payload.value;
            return state;

        case 'KILL_OBJECT':
            state[payload.id].detail.stat['DEATH'] = true;
            return state;

        case 'DEAL_DAMAGE': // id, user, value
            // console.log(action);
            payload.id.forEach((id) => {
                let def = state[id].detail.stat['SHIELD'].value + Math.round(state[id].detail.stat['DEF'].value / 10);
                // Xuyên giáp
                let pdamage = 0;
                if (payload.user)
                    pdamage = Math.round(state[payload.user].detail.stat['PDMG'].value);
                if (pdamage - def >= 0) {
                    state[id].detail.stat['HP'].value -= def;
                    pdamage = def;
                }
                else state[id].detail.stat['HP'].value -= pdamage;
                // Sát thương
                let damage = payload.value - def;
                if (damage > 0) {
                    state[id].detail.stat['SHIELD'].value = 0;
                    if (state[id].detail.stat['HP'].value - damage <= 0)
                        state[id].detail.stat['HP'].value = 0;
                    else state[id].detail.stat['HP'].value -= damage;
                } else {
                    state[id].detail.stat['SHIELD'].value -= payload.value;
                }
                // Sát thương chuẩn
                let tdamage = payload.tdamage;
                if (tdamage!==undefined) state[id].detail.stat['HP'].value -= tdamage;
            })
            return state;

        case 'SELF_DEAL_DAMAGE':
            let def = state[payload.user].detail.stat['SHIELD'].value + Math.round(state[payload.user].detail.stat['DEF'].value / 10);
            // Xuyên giáp
            let pdamage = 0;
            if (payload.user)
                pdamage = Math.round(state[payload.user].detail.stat['PDMG'].value);
            if (pdamage - def >= 0) {
                state[payload.user].detail.stat['HP'].value -= def;
                pdamage = def;
            }
            else state[payload.user].detail.stat['HP'].value -= pdamage;
            // Sát thương
            let damage = payload.value - def;
            if (damage > 0) {
                state[payload.user].detail.stat['SHIELD'].value = 0;
                if (state[payload.user].detail.stat['HP'].value - damage <= 0)
                    state[payload.user].detail.stat['HP'].value = 0;
                else state[payload.user].detail.stat['HP'].value -= damage;
                
            } else {
                state[payload.user].detail.stat['SHIELD'].value -= payload.value;
            }
            // Sát thương chuẩn
            let tdamage = payload.tdamage;
            if (tdamage!==undefined) state[payload.user].detail.stat['HP'].value -= tdamage;
            return state;

        case 'HEAL_HP': // id, user, value
            let target = payload.user
            if (payload.id !== undefined && payload.id.length > 0) target = payload.id
            target.forEach(id => {
                state[id].detail.stat['HP'].value += payload.value;
                if (state[id].detail.stat['HP'].value > state[payload.user].detail.stat['MaxHP'].value)
                    state[id].detail.stat['HP'].value = state[payload.user].detail.stat['MaxHP'].value;
            })
            return state;    

        // ------------------------------------------------------------------------------------------------------
        // CARD
        case 'ADD_ITEMS_TO': // id, target, item
            for (let i = 0; i < payload.amount; i++) {
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
            for (let i = 0; i < payload.amount; i++) {
                if (deck.length === 0) {
                    console.log('OUT_OF_CARDS');
                    break;
                }
                const itemID = Math.floor(Math.random()*deck.length);
                const card = deck[itemID];
                hand.push(card);
                deck = [...deck.slice(0, itemID),
                        ...deck.slice(itemID + 1)]
            }
            state[payload.id]['deck'] = deck;
            return state;
        
        case 'MOVE_TO': // id, from, target
            var resources = state['player'][payload.from];
            var newResources = state['player'][payload.target];
            var card = resources[payload.cardId];
            newResources.push(card);
            resources = [...resources.slice(0, payload.cardId),
                        ...resources.slice(payload.cardId + 1)]
            state['player'][payload.from] = resources;
            return state;

        case 'UPDATE_DECK':
            while (payload.item.length>0) state['player']['deck'].push(payload.item.pop());
            return state;

        case 'CLEAR':
            while (state['player'][payload.target].length > 0) {
                state['player'][payload.target].pop();
            }
            return state;

        // ROUND

        case 'OPTIMIZE_PLAYER': //item
            return {...state, 'player': optimizePlayer(payload.item)}

        case 'RESET_STATUS':
            Object.keys(state[payload.id].detail.stat).map((key) => {
                if (state[payload.id].detail.stat[key].origin === undefined) return;
                state[payload.id].detail.stat[key].value = state[payload.id].detail.stat[key].origin + state[payload.id].detail.stat[key].statChange;
            })
            return state;

        case 'ADD_MONSTER': // id, monster
            // console.log("Monster Added!");
            return {...state, [payload.actionId]: payload.item}

        case 'ADD_MONSTER_RANDOM': // actionId, lv
            // console.log("Monster Added!");
            const values = Object.values(data["6"]);
            const monster = values[Math.floor(Math.random() * values.length)];
            const lvl = payload.lv + (payload.addLv!==undefined?payload.addLv:0);
            const item = createMonster(lvl, monster);
            return {...state, ["monster"+payload.actionId]: item}

        case 'REMOVE_MONSTER': // id
            delete state[payload.id];
            return state;

        case 'CLEAR_MONSTER':
            return state;
        
        default:
            return state;
    }
}

export const deckReducer = (states, action) => {
    var state = {...states};
    const payload = action.payload;
    switch (action.type) {
        case 'ADD_CARDS':
            for (var i=0; i < payload.amount; i++) {
                // console.log(action.item)
                state = [...state, payload.item];
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

export const cardTargetReducer = (states = {targets: [], limit: 0}, action) => {
    var state = {...states};
    const payload = action.payload;
    // console.log(payload);
    switch (action.type) {
        case "SET_LIMIT":
            state.limit = payload.value;
            return state;

        case 'ADD_TARGET':
            if (state.targets.length < state.limit)
                state.targets.push(payload.value);
            return state
        
        case 'DELETE_TARGET':
            const idx = state.targets.indexOf(payload.value);
            state.targets = [
                ...state.targets.slice(0, idx),
                ...state.targets.slice(idx + 1)
            ]
            return state;

        case 'CLEAR_TARGET':
            state.limit = 0;
            while (state.targets.length > 0) {
                const key = state.targets.pop();
                document.getElementById(key).checked = false;
            }
            return state;

        default:
            return state;
    }
}