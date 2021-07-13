import{ combineReducers } from 'redux';
import utilsReducer from './utlisReducer';
import signupReducers from './signupReducer';
import signinReducer from './signinReducer';
import resetPasswordReducer from './resetPasswordReducer';

const rootReducer = combineReducers({
    utils: utilsReducer,
    signup: signupReducers,
    signIn: signinReducer,
    resetPassword: resetPasswordReducer
}) 

export default rootReducer;