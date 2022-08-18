import data from '../data/test-data.json'

// init
export const powerUpByLv = (basicStat, Lv) => {
    const newStat = Object.assign({}, basicStat);
    if (basicStat.lvPowerUp === undefined)
        return {...newStat};
    return {...newStat, value: (Math.round((newStat.basic + (newStat.lvPowerUp * Lv)) * 10) / 10)};
}

export const powerUpByPoint = (status) => {
    const newStat = Object.assign({}, status);
    if (status.pointPowerUp === undefined)
        return {...newStat};
    return {...newStat, value: (Math.round((newStat.basic + (newStat.pointPowerUp * newStat.point)) * 10) / 10)};
}

export const initPlayer = (initialStatus, Lv = 1, EXP=0, POINT = 5, weapon = [data['1']['1001']], buff = []) => {
    // clone detail
    var newStatus = {...initialStatus, detail: Object.assign({}, initialStatus.detail)};
    // clone status
    newStatus.detail.stat = Object.assign({}, initialStatus.detail.stat);
    Object.keys(newStatus.detail.stat).map((key, idx) => {
        // Clone stat
        newStatus.detail.stat[key] = Object.assign({}, initialStatus.detail.stat[key]);
        newStatus.detail.stat[key] = powerUpByPoint(initialStatus.detail.stat[key]);
    })
    // More Info
    newStatus.id = 'player';
    newStatus.detail.stat['SHIELD'] = {
        value: newStatus.detail.stat['DEF'].value
    }
    newStatus.detail.stat['HP'] = {
        value: newStatus.detail.stat['MaxHP'].value
    }
    newStatus.detail.stat['MP'] = {
        value: newStatus.detail.stat['MaxMP'].value
    };
    newStatus.detail.stat['Lv'] = {value: Lv};
    newStatus.detail.stat['EXP'] = {value: EXP};
    newStatus.detail.stat['MaxEXP'] = {value: data['LEVEL'][Lv]['max']};
    newStatus.detail.stat['POINT'] = {value: POINT};
    newStatus.detail['DEATH'] = false;
    newStatus.weapon = weapon;
    newStatus.buff = buff;
    // console.log(initialStatus);
    return newStatus;
}


// Điều chỉnh lá bài theo chỉ số của người chơi vào đầu trận đấu.
export const optimizeCard = (payload, initialCard, option = {}) => {
    const moreOption = Object.assign({}, {
        eliminate: false,
        returnHand: false
    }, option, initialCard.detail['moreOption']);
    var newCard = {...initialCard, detail: Object.assign({}, initialCard.detail)};
    // clone status
    newCard.detail.stat = Object.assign({}, initialCard.detail.stat);
    Object.keys(newCard.detail.stat).map((key, idx) => {
        // Clone stat
        newCard.detail.stat[key] = Object.assign({}, initialCard.detail.stat[key]);
    });
    // clone action
    newCard.detail.skill = [...initialCard.detail.skill];
    newCard.detail.skill.map((skill, idx) => {
        newCard.detail.skill[idx] = {...skill, payload: [...initialCard.detail.skill[idx].payload]};
        newCard.detail.skill[idx].payload.map((action, idx2) => {
            newCard.detail.skill[idx].payload[idx2] = {...action, payload: Object.assign({}, initialCard.detail.skill[idx].payload[idx2].payload)};
        })
    });
    
    switch (newCard.typeCard) {
        case 'Action':
            newCard.detail.skill.map((skill) => {
                skill.payload.map((action) => {
                    action.payload.value = action.payload.basic + payload.detail.stat[action.payload.depend_on].value;
                })
        })
        break;
            
        default:
            break;
        }

    newCard.detail['moreOption'] = moreOption;

    // Re-render abilities describe
    newCard.detail.optimizeDescribe = [...initialCard.detail.optimizeDescribe];
    newCard.detail.optimizeDescribeIdx.map((index) => {
        newCard.detail.optimizeDescribe[index[0]] = newCard.detail.skill[index[1]].payload[index[2]].payload.value;
    })
    newCard.detail.abilities = "";
    newCard.detail.optimizeDescribe.map((word)=>{
        newCard.detail.abilities += word;
    })
    return newCard;
}

export const createMonster = (Lv, initialStatus) => {
    // clone detail
    var newMonster = {...initialStatus, detail: Object.assign({}, initialStatus.detail)};
    // clone status
    newMonster.detail.stat = Object.assign({}, initialStatus.detail.stat);
    Object.keys(newMonster.detail.stat).map((key, idx) => {
        // Clone stat
        newMonster.detail.stat[key] = Object.assign({}, initialStatus.detail.stat[key]);
        newMonster.detail.stat[key] = powerUpByLv(initialStatus.detail.stat[key], Lv);
    })
    // clone skill
    newMonster.detail.skill = [...initialStatus.detail.skill];
    newMonster.detail.skill.map((skill, idx) => {
        newMonster.detail.skill[idx] = {...skill, payload: [...initialStatus.detail.skill[idx].payload]};
        newMonster.detail.skill[idx].payload.map((action, idx2) => {
            newMonster.detail.skill[idx].payload[idx2] = {...action, payload: Object.assign({}, initialStatus.detail.skill[idx].payload[idx2].payload)};
        })
    });
    newMonster.detail.skill.map((skill) => {
        skill.payload.map(action => {
            action.payload.value = action.payload.basic + (newMonster.detail.stat[action.payload.depend_on].value * action.payload.ratio);
        })
    })
    newMonster.detail.stat['HP'] = Object.assign({}, newMonster.detail.stat['MaxHP']);
    newMonster.detail.stat['SHIELD'] = {value: newMonster.detail.stat['DEF'].value}
    newMonster.detail.stat['MP'] = Object.assign({}, newMonster.detail.stat['MaxMP']);
    newMonster.detail.stat['Lv'] = Lv;
    newMonster.detail.name += " LV. " + Lv;
    // Save origin status
    Object.keys(newMonster.detail.stat).map((key) => {
        if (['Lv', 'SHIELD', 'EXPGain', 'HP', 'MP', 'POINT', 'EXP'].includes(key)) return;
        newMonster.detail.stat[key]['origin'] = newMonster.detail.stat[key].value;
        newMonster.detail.stat[key]['statChange'] = 0;
    })
    newMonster.detail['DEATH'] = false;
    return newMonster;
}

export const optimizePlayer = (initialStatus) => {
    // clone detail
    var newStatus = {...initialStatus, detail: Object.assign({}, initialStatus.detail)};
    // clone status
    newStatus.detail.stat = Object.assign({}, initialStatus.detail.stat);
    Object.keys(newStatus.detail.stat).map((key, idx) => {
        // Clone stat
        newStatus.detail.stat[key] = Object.assign({}, initialStatus.detail.stat[key]);
        newStatus.detail.stat[key] = powerUpByPoint(initialStatus.detail.stat[key]);
    })
    // Handle both
    newStatus.detail.stat['Lv'] = initialStatus.detail.stat['Lv'];
    newStatus.detail.stat['HP'] = initialStatus.detail.stat['HP'];
    newStatus.detail.stat['SHIELD'].value = initialStatus.detail.stat['DEF'].value;
    newStatus.detail.stat['EXPGain'] = {value: 0};
    newStatus.buff = [...initialStatus.buff];
    newStatus.weapon = [...initialStatus.weapon];
    newStatus.hand = [];
    newStatus.deck = [];
    newStatus.graveyard = [];
    newStatus.weapon.map((weapon) => {
        Object.keys(weapon.detail.statChange).map((key)=>{
            newStatus.detail.stat[key].value += weapon.detail.statChange[key];
        })
    })
    // Save origin status
    Object.keys(newStatus.detail.stat).map((key, idx) => {
        if (['Lv', 'SHIELD', 'EXPGain', 'HP', 'MP', 'POINT', 'EXP'].includes(key)) return;
        newStatus.detail.stat[key]['origin'] = newStatus.detail.stat[key].value;
        newStatus.detail.stat[key]['statChange'] = 0;
    })
    return newStatus;
}