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
import RideReducers from "../services/Rides/RideReducers";


export default combineReducers({
    rides: RideReducers,
    auth: authReducer,
    errors: errorReducer,
    pack:PackageReducer,
    parcel:ParcelReducer,
    alert: AlertReducer,
    users: UsersReducers,
    claims: ClaimsReducers,
    posts: postsReducer,
    comments: commentsReducer,
});
