import { optimizeCard,
    createMonster,
    powerUpByLv,
    powerUpByPoint,
    initPlayer,
    optimizePlayer
} from "../function/playFuction";

export const initCharacter = (initialStatus) => {
    // clone detail
    const newStatus = {...initialStatus, detail: Object.assign({}, initialStatus.detail)};
    // clone status
    newStatus.detail.stat = Object.assign({}, initialStatus.detail.stat);
    Object.keys(newStatus.detail.stat).map((key, idx) => {
        // Clone stat
        newStatus.detail.stat[key] = Object.assign({}, initialStatus.detail.stat[key]);
        newStatus.detail.stat[key] = powerUpByPoint(initialStatus.detail.stat[key]);
    })
    newStatus.deck = [...initialStatus.deck]
    newStatus.buff = [...initialStatus.buff]
    newStatus.weapon = [...initialStatus.weapon]
    newStatus.bag = [...initialStatus.bag]
    return newStatus
}

export const Login = (info) => {
    console.log('login account:', info.username);
    return {
        type: 'add',
        payload: info
    };
}