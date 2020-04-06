import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import AlertReducer from './AlertReducer';
import UsersReducers from '../services/Users/UsersReducers';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    alert: AlertReducer,
    users: UsersReducers,
});
