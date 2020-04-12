import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import AlertReducer from './AlertReducer';
import PackageReducer from "./PackageReducer";
import ParcelReducer from "./Parcel";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    pack:PackageReducer,
    parcel:ParcelReducer,
    alert: AlertReducer,
});
