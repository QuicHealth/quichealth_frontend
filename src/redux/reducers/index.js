import{ combineReducers } from 'redux';
import utilsReducer from './utlisReducer';
import signupReducers from './signupReducer';
import signinReducer from './signinReducer';
import resetPasswordReducer from './resetPasswordReducer';
import hospitalReducer from './hospitalReducer';

const rootReducer = combineReducers({
    utils: utilsReducer,
    signup: signupReducers,
    signIn: signinReducer,
    hospital: hospitalReducer,
    resetPassword: resetPasswordReducer
}) 

export default rootReducer;