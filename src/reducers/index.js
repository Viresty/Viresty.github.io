import { combineReducers } from 'redux';

import cart from './cart';
import banner from './banner';

const rootReducer = combineReducers({
    banner,
    cart
});

export default rootReducer;