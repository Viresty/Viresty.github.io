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

export const initPlayer = (initialStatus, Lv = 1) => {
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
        name: 'GIÁP',
        value: newStatus.detail.stat['DEF'].value
    }
    newStatus.detail.stat['HP'] = {
        name: 'SINH LỰC',
        value: newStatus.detail.stat['MaxHP'].value
    }
    newStatus.detail.stat['MP'] = {
        name: 'NĂNG LƯỢNG',
        value: newStatus.detail.stat['MaxMP'].value
    };
    newStatus.detail.stat['Lv'] = Lv;
    newStatus.detail.stat['EXP'] = {value: 0};
    newStatus.detail.stat['MaxEXP'] = {value: data['LEVEL'][Lv]['max']};
    newStatus.detail.stat['POINT'] = {value: 10};
    newStatus.weapon = [data['1']['001']];
    newStatus.buff = [];
    // console.log(initialStatus);
    return newStatus;
}

export const optimizeCard = (payload, initialCard, option = {}) => {
    const moreOption = Object.assign({}, {
        eliminate: false,
        returnHand: false
    }, option);
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
                action.value = action.basic + payload.detail.stat[action.depend_on].value;
        })
        break;
            
        default:
            break;
        }

    newCard.detail['moreOption'] = moreOption;

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
    newMonster.detail.action.map((action) => {
        action.value = newMonster.detail.stat[action.depend_on].value;
    })
    newMonster.detail.stat['HP'] = Object.assign({}, newMonster.detail.stat['MaxHP']);
    newMonster.detail.stat['SHIELD'] = {value: newMonster.detail.stat['DEF'].value}
    newMonster.detail.stat['MP'] = Object.assign({}, newMonster.detail.stat['MaxMP']);
    newMonster.detail.stat['Lv'] = Lv;
    newMonster.detail.name += " Lv. " + Lv;
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
    console.log("OTIMIZED")
    return newStatus;
}