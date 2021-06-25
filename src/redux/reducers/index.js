import{ combineReducers } from 'redux';
import utilsReducer from './utlisReducer';
import signupReducers from './signupReducer';
import signinReducer from './signinReducer';

const rootReducer = combineReducers({
    utils: utilsReducer,
    signup: signupReducers,
    signIn: signinReducer
}) 

export default rootReducer;