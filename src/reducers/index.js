import { combineReducers } from 'redux';

import cart from './cart';
import banner from './banner';
import { playerReducer as player } from './playReducer';

const rootReducer = combineReducers({
    banner,
    cart
});

export default rootReducer;