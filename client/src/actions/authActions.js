import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {REGISTER, CLEAR_CURRENT_PROFILE, GET_ERRORS, GET_PROFILE, PROFILE_LOADING, SET_CURRENT_USER, GET_LOGGED_USER, GOOGLE_AUTH_SIGNUP} from "./types";

// Login - Get User Token
export const loginUser = (userData,  historyPush, historyReplace ) => dispatch => {
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
            historyReplace('/admin/profile');
        })
        .catch(({response}) => {  // If create post failed, alert failure message
            console.log(response, 'error');
            historyReplace('/front/login', {
                time: new Date().toLocaleString(),
                message: response.data.message,
            });
        });
};

export const register = (userData, file, historyPush ,historyReplace)=> dispatch => {
    axios
        .post("http://localhost:3000/register", userData)
        .then(res => {
            if (res.data.status !== 400 ) {
                if (file != null) {
                    const fd = new FormData();
                    fd.append('image', file);
                    axios.post("http://localhost:3000/uploadUserImage/" + res.data._id, fd).then((r) => {
                    });
                }
                dispatch({
                    type: REGISTER,
                    payload: res.data
                })
            } else {
                historyReplace('/front/register', {
                    time: new Date().toLocaleString(),
                    message: res.data.message,
                    u: userData,
                });
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};


export const confirmeDriverRequest = (userId, carData, fd , historyPush, historyReplace )=> dispatch => {
    axios
        .post("http://localhost:3000/users/becomeDriver/"+ userId, carData)
        .then(res => {
            if ((res.data.status !== 400) && (fd != null)) {
                axios.post("http://localhost:3000/users/uploadDocumentForDriver/" + userId, fd).then((r) => {
                    console.log('r', r);
                }).catch(err => {
                        console.log('catch files!', err);
                        dispatch({
                            type: GET_ERRORS,
                            payload: err
                        });
                    }
                );
            } else {
                dispatch({
                    type: GET_ERRORS,
                    payload: res.data.message
                })
            }
            historyReplace('/admin/', {
                time: new Date().toLocaleString(),
                message: res.data,
            });
            // console.log('res', res);
            // dispatch({
            //     type: DRIVER_REQUEST,
            //     payload: res.data
            // })
        }).catch(({response}) => {  // If create post failed, alert failure message
            console.log(response, 'error');
            historyReplace('/front/becomeDriver', {
                time: new Date().toLocaleString(),
                message: response.data.message,
            });
        });
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const getCurrentUser = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem("jwtToken");
            if (token) {
                const result = await axios.get(`http://localhost:3000/users/profile`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }});
                dispatch({type: GET_LOGGED_USER, payload: result.data})
            }
        } catch (error) {
            console.log(error);
            dispatch({type: GET_ERRORS, error})
        }
    }
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


export const oauthGoogle = data => {
    return async  dispatch => {
        console.log('we received : ', data);
        const resp = await axios.post('http://localhost:3000/oauth/google', {
            'access_token' : 'ya29.a0Ae4lvC3xzzLi0VOq3ZqxoflC6w_KF7abHgzrMSKDTycBUCo8DpFBPOJzNC5pAIty6RnUsKWoedo7ZZJ1va2D_H3_b9fgDThI47JqC_ZYSevIBt5FSSvCo-S_5T-jrpOw79D4XZ88rAkEMmyAlB29RNIe1DBMJy5NKU8',
            // 'access_token' : data,
        });
        dispatch({
            type: GOOGLE_AUTH_SIGNUP,
            payload: resp.data.token,
        });
        console.log('resp', resp);
        localStorage.setItem('jwtToken', resp.data.token);
        window.location.reload();
    }
};
