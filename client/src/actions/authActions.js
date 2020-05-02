import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {REGISTER, CLEAR_CURRENT_PROFILE, GET_ERRORS, GET_PROFILE, PROFILE_LOADING, SET_CURRENT_USER, GET_LOGGED_USER} from "./types";

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

// export const getCurrentUser = () => {
//     return dispatch => {
//         const token = localStorage.getItem("jwtToken");
//         if (token) {
//             return fetch("http://localhost:3000/users/profile", {
//                 method: "GET",
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accept: 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 }
//             })
//                 .then(resp => resp.json())
//                 .then(data => {
//                     console.log(data);
//                     if (data.message) {
//                         // An error will occur if the token is invalid.
//                         // If this happens, you may want to remove the invalid token.
//                         // localStorage.removeItem("token")
//                     } else {
//                         dispatch(loginUser(data.user))
//                     }
//                 })
//         }
//     }
// }
// get users
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
