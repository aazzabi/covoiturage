import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import AlertReducer from './AlertReducer';
import UsersReducers from '../services/Users/UsersReducers';
import PackageReducer from "./PackageReducer";
import ParcelReducer from "./Parcel";
import commentsReducer from "./Blog/commentReducer";
import postsReducer from "./Blog/postReducer";
import ClaimsReducers from "../services/Claims/ClaimsReducers";
import CarsReducer from "../services/Cars/CarsReducer";
import DriversReducers from "../services/Drivers/DriversReducers";


export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    pack:PackageReducer,
    parcel:ParcelReducer,
    alert: AlertReducer,
    users: UsersReducers,
    claims: ClaimsReducers,
    cars: CarsReducer,
    drivers: DriversReducers,
    posts: postsReducer,
    comments: commentsReducer,
});
