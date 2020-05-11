import Axios from "axios";
import {DELETE_USER, GET_ALL, GET_DRIVERS, GET_USERS, GET_FINANCIALS , GET_RELATIONALS, GET_TECHNICALS, UPDATE_USER, GET_USER_BY_ID, GET_USER, GET_CAR } from "./UserTypes";
import {GET_ERRORS} from "../../actions/types";


// get users
export const getAll = () => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3002/users/getAll`);
            console.log(result.data, 'result');
            dispatch({ type: GET_USERS, payload: result.data })
        }catch (error) {
            dispatch({type: GET_ERRORS, error})
        }
    }
};
// get users by id
export const getUserById = (userId) => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3002/users/getUserById/`+userId);
            dispatch({type: GET_USER_BY_ID, payload: result.data})
        } catch (error) {
            dispatch({type: GET_ERRORS, error})
        }
    }
};
// get users
export const getUsers = () => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3002/users/getAllUsers`);
            console.log(result.data , 'result');
            dispatch({ type: GET_USERS, payload: result.data })
        }
        catch (error) {
            dispatch({ type: GET_ERRORS, error })
        }
    }
};

// get getDrivers
export const getDrivers = () => {
    return async (dispatch) => {
        try {

            const result = await Axios.get(`http://localhost:3002/users/getAllDrivers`);
            console.log(result.data, 'getDrivers');
            dispatch({ type: GET_DRIVERS, payload: result.data })

        } catch (error) {
            dispatch({type: GET_ERRORS, error})

        }
    }
};

// get getAllTechnicals
export const getAllTechnicals = () => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/users/getAllTechnicals`);
            dispatch({type: GET_TECHNICALS, payload: result.data})
        } catch (error) {
            dispatch({type: GET_ERRORS, error})
        }
    }
};
// get getAllFinancials
export const getAllFinancials = () => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/users/getAllFinancials`);
            dispatch({type: GET_FINANCIALS, payload: result.data})
        } catch (error) {
            dispatch({type: GET_ERRORS, error})
        }
    }
};
// get getAllRelationals
export const getAllRelationals = () => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/users/getAllRelationals`);
            dispatch({type: GET_RELATIONALS, payload: result.data})
        } catch (error) {
            dispatch({type: GET_ERRORS, error})
        }
    }
};

export const getUser = (idUser) => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/users/getUserById/`+ idUser);
            dispatch({type: GET_USER, payload: result.data})
        } catch (error) {
            dispatch({type: GET_ERRORS, error})
        }
    }
};

export const getCar = (idCar) => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/cars/getById/`+ idCar);
            dispatch({type: GET_CAR, payload: result.data})
        } catch (error) {
            dispatch({type: GET_ERRORS, error})
        }
    }
};
// Delete Site
export const deleteUser = id => dispatch => {

    Axios
        .delete(`http://localhost:3002/users/delete/${id}`).then(res => {
            console.log("action ", id)

            dispatch({
                type: DELETE_USER,
                payload: id
            })
        }
        ).catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
};



// editClaim
export function updateUser({phone, firstName, lastName,userId}, historyPush, historyReplace) {
    return function (dispatch) {
        console.log({phone, firstName, lastName, userId});
        console.log(`http://localhost:3002/users/updateUser/` + userId);
        Axios.post(`http://localhost:3002/users/updateUser/` + userId, {
            phone: phone,
            lastName: lastName,
            firstName: firstName,
        }, {})
            .then((response) => {  // If create post succeed, navigate to the post detail page
                dispatch({
                    type: UPDATE_USER,
                    payload: response.data,
                });
                historyPush(`/admin/profile/`);
            })
            .catch(({response}) => {  // If create post failed, alert failure message
                console.log(response, 'error');
                historyReplace('/admin/profile/', {
                    time: new Date().toLocaleString(),
                    message: response,
                });
            });
    }
}




