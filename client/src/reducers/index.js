import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import AlertReducer from './AlertReducer';
import PackageReducer from "./PackageReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    pack:PackageReducer,
    alert: AlertReducer,
});
