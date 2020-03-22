import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import AlertReducer from './AlertReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    alert: AlertReducer,
});
