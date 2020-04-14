import Axios from "axios";
import {DELETE_USER, GET_ALL, GET_DRIVERS, GET_USERS, GET_FINANCIALS , GET_RELATIONALS, GET_TECHNICALS } from "./UserTypes";
import {GET_ERRORS} from "../../actions/types";


// get users
export const getAll = () => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/users/getAll`);
            dispatch({type: GET_ALL, payload: result.data})
        } catch (error) {
            dispatch({type: GET_ERRORS, error})
        }
    }
};
// get users
export const getUsers = () => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/users/getAllUsers`);
            dispatch({type: GET_USERS, payload: result.data})
        } catch (error) {
            dispatch({type: GET_ERRORS, error})
        }
    }
};

// get getDrivers
export const getDrivers = () => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/users/getAllDrivers`);
            dispatch({type: GET_DRIVERS, payload: result.data})
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


// Delete Site
export const deleteUser = id => dispatch => {
    Axios
        .delete(`http://localhost:3000/users/delete/${id}`).then(res => {
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




