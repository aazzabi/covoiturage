import Axios from "axios";
import {ADD_CLAIM, GET_ALL, RESOLVE_USER, DELETE_CLAIM, GET_CLAIM , GET_ALL_COMMENT, ADD_COMMENT_TO_CLAIM} from "./ClaimsTypes"
import {GET_ERRORS} from "../../actions/types";

const ROOT_URL = 'http://localhost:3000/claims';

// get users
export function addClaim({titleC, typeC, priority, description, userId}, historyPush, historyReplace) {
    return function (dispatch) {
        console.log({titleC, typeC, priority, description, userId});
        console.log(`${ROOT_URL}/add/` + userId, '`${ROOT_URL}/add/`+ userId');
        Axios.post(`${ROOT_URL}/add/` + userId, {
            title: titleC,
            description: description,
            type: typeC,
            priority: priority,
        }, {})
            .then((response) => {  // If create post succeed, navigate to the post detail page
                dispatch({
                    type: ADD_CLAIM,
                    payload: response.data,
                });
                historyPush(`/admin/claims/`+userId);
            })
            .catch(({response}) => {  // If create post failed, alert failure message
                console.log(response, 'error');
                historyReplace('/claims/new', {
                    time: new Date().toLocaleString(),
                    message: response,
                });
            });
    }
}

export const getAll = (id) => {
    return async (dispatch) => {
        try {
            console.log(id, 'claim action : $id ');
            const result = await Axios.get(`http://localhost:3000/claims/getAll/`+id);
            console.log(result, 'result');
            dispatch({type: GET_ALL, payload: result.data})
        } catch (error) {
            dispatch({type: GET_ERRORS, error})
        }
    }
};

export const getClaim = (idClaim, idUser) => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/claims/getById/`+idClaim+`/`+idUser);
            dispatch({type: GET_CLAIM, payload: result.data[0]})
        } catch (error) {
            dispatch({type: GET_ERRORS, error})
        }
    }
};


// Delete Site
export const deleteClaim = id => dispatch => {
    Axios
        .delete(`http://localhost:3000/claims/delete/${id}`).then(res => {
            dispatch({
                type: DELETE_CLAIM,
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

// Delete Site
export const resolveClaim = id => dispatch => {
    Axios
        .delete(`http://localhost:3000/users/delete/${id}`).then(res => {
            console.log("action ", id);
            dispatch({
                type: RESOLVE_USER,
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

export function addComment({commentText, claimId, userId},  historyPush, historyReplace)
{
    return function (dispatch) {
        Axios.post(`${ROOT_URL}/addComment/`+ claimId +'/' + userId, {
            content: commentText,
        }, {})
            .then((response) => {  // If create post succeed, navigate to the post detail page
                dispatch({
                    type: ADD_COMMENT_TO_CLAIM,
                    payload: response.data,
                });
                // historyPush(`/admin/claims/`+claimId);
            })
            .catch(({response}) => {  // If create post failed, alert failure message
                console.log(response, 'error');
                historyReplace('/claims/new', {
                    time: new Date().toLocaleString(),
                    message: response,
                });
            });
    }
}
