import axios from "axios";

import {GET_ALL_DRIVER_REQUESTS, GET_ERRORS, GET_MARQUES, GET_MODEL_BY_MARQUE,DECLINE_REQUEST, ACCEPT_REQUEST} from "../../actions/types";
import {DELETE_USER} from "../Users/UserTypes";

export const getAllDriverRequest = () => dispatch => {
    axios
        .get("http://localhost:3000/users/getAllDriverRequest")
        .then(res => {
                dispatch({
                    type: GET_ALL_DRIVER_REQUESTS,
                    payload: res.data
                })
            }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};



// Delete Site
export const refuserRequest = id => dispatch => {
    axios
        .delete(`http://localhost:3000/users/refuseDriverRequest/${id}`).then(res => {
            console.log("action ", id)
            dispatch({
                type: DECLINE_REQUEST,
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
// acc Site
export const acceptRequest = id => dispatch => {
    axios
        .post(`http://localhost:3000/users/acceptDriverRequest/${id}`).then(res => {
            console.log("action ", id)
            dispatch({
                type: ACCEPT_REQUEST,
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
