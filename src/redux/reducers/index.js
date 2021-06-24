import{ combineReducers } from 'redux';
import utilsReducer from './utlisReducer';
import signupReducers from './signupReducer';

const rootReducer = combineReducers({
    utils: utilsReducer,
    signup: signupReducers
}) 

export default rootReducer;