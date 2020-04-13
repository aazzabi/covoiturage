import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {REGISTER, CLEAR_CURRENT_PROFILE, GET_ERRORS, GET_PROFILE, PROFILE_LOADING, SET_CURRENT_USER} from "./types";

// Login - Get User Token
export const loginUser = userData => dispatch => {
    axios
        .post("http://localhost:3000/login", userData)
        .then(res => {
            // Save to localStorage
            const {token} = res.data;

            // Set token to ls
            localStorage.setItem("jwtToken", token);
            console.log(token ,'token');
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response
                });
            }
        );
};

export const register = userData => dispatch => {
    axios
        .post("http://localhost:3000/register", userData)
        .then(res => {
            console.log('done action');
            dispatch({
                type: REGISTER,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};


//get current profile
export const getProfile = () => dispatch => {
    console.log("GEETING PROFILE")
    dispatch(setProfileLoading());
    axios
        .get("/users/profile")
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: null
            })
        );
};

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};
