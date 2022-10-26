import{ combineReducers } from 'redux';
import utilsReducer from './utlisReducer';
import signupReducers from './signupReducer';
import signinReducer from './signinReducer';
import resetPasswordReducer from './resetPasswordReducer';
import hospitalReducer from './hospitalReducer';
import patientReducers from './patientReducers';

const rootReducer = combineReducers({
    utils: utilsReducer,
    signup: signupReducers,
    signIn: signinReducer,
    hospital: hospitalReducer,
    resetPassword: resetPasswordReducer,
    patient:patientReducers
}) 

export default rootReducer;