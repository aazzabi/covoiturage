import axios from "axios";
import {
    DELETE_USER,
    GET_USERS,
    GET_DRIVERS,
} from "./UserTypes";
import { GET_ERRORS } from "../../actions/types";
import Axios from "axios";


// get users
export const getAll = () => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/users/getAll`);
            console.log(result.data, 'result');
            dispatch({ type: GET_USERS, payload: result.data })
        }
        catch (error) {
            dispatch({ type: GET_ERRORS, error })
        }
    }
};
// get users
export const getUsers = () => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/users/getAllUsers`);
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
            const result = await Axios.get(`http://localhost:3000/users/getAllDrivers`);
            console.log(result.data, 'getDrivers');
            dispatch({ type: GET_DRIVERS, payload: result.data })
        }
        catch (error) {
            dispatch({ type: GET_ERRORS, error })
        }
    }
};


// Delete Site
export const deleteUser = id => dispatch => {
    axios
        .delete(`http://localhost:3000/users/delete/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_USER,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};



