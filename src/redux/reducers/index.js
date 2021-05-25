import{ combineReducers } from 'redux';
import utilsReducer from './utlisReducer';

const rootReducer = combineReducers({
    utils: utilsReducer
}) 

export default rootReducer;