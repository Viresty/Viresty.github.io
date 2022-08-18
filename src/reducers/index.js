import { combineReducers } from 'redux';

import cart from './cart';
import banner from './banner';
import user from './userReducer';

const rootReducer = combineReducers({
    banner,
    user,
    cart
});

export default rootReducer;