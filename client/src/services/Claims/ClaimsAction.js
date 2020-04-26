import Axios from "axios";
import {
    ADD_CLAIM,
    EDIT_CLAIM,
    ADD_COMMENT_TO_CLAIM,
    DELETE_CLAIM,
    DELETE_COMMENT,
    GET_ALL,
    GET_CLAIM,
    SEARCH_CLAIM,
    RESOLVE_CLAIM,
    UNRESOLVE_CLAIM
} from "./ClaimsTypes"
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
                historyPush(`/admin/claims/` + userId);
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

// editClaim
export function editClaim({titleC, typeC, priority, description,claimId}, historyPush, historyReplace) {
    return function (dispatch) {
        console.log({titleC, typeC, priority, description});
        console.log(`${ROOT_URL}/updateClaim/` + claimId, '`${ROOT_URL}/updateClaim/`+ claimId');
        Axios.post(`${ROOT_URL}/updateClaim/` + claimId, {
            title: titleC,
            description: description,
            type: typeC,
            priority: priority,
        }, {})
            .then((response) => {  // If create post succeed, navigate to the post detail page
                dispatch({
                    type: EDIT_CLAIM,
                    payload: response.data,
                });
                historyPush(`/admin/claims/` + claimId);
            })
            .catch(({response}) => {  // If create post failed, alert failure message
                console.log(response, 'error');
                historyReplace('/admin/claims/', {
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
            const result = await Axios.get(`http://localhost:3000/claims/getAll/` + id);
            console.log(result, 'result');
            dispatch({type: GET_ALL, payload: result.data})
        } catch (error) {
            dispatch({type: GET_ERRORS, payload: error})
        }
    }
};

export const getClaim = (idClaim, idUser) => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/claims/getById/` + idClaim + `/` + idUser);
            dispatch({type: GET_CLAIM, payload: result.data})
        } catch (error) {
            dispatch({type: GET_ERRORS, payload: error})
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

// deleteComment
export const deleteComment = (id, idComment) => dispatch => {
    Axios
        .post(`http://localhost:3000/claims/deleteComment/${id}/${idComment}`).then(res => {
            console.log(res, 'res');
            dispatch({
                type: DELETE_COMMENT,
                payload: res,
                idComment: idComment
            })
        }
    ).catch(err => {
            console.log(err, 'err');
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        }
    );
};

// Delete Site
export const resolveClaim = id => dispatch => {
    console.log('RESOLVE_CLAIM action');
    Axios
        .post(`http://localhost:3000/claims/resolve/${id}`).then(res => {
            dispatch({
                type: RESOLVE_CLAIM,
                payload: res.data
            })
        }
    ).catch(err => {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    });
};
// unresolveClaim
export const unresolveClaim = id => dispatch => {
    Axios
        .post(`http://localhost:3000/claims/changeStatus/${id}/IN_PROGRESS`).then(res => {
            dispatch({
                type: UNRESOLVE_CLAIM,
                payload: res.data
            })
        }
    ).catch(err => {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    });
};


export const searchClaim = (id, keyword) => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/claims/searchClaim/`+ id+'/'+keyword );
            console.log(result, 'result');
            dispatch({type: GET_ALL, payload: result.data})
        } catch (error) {
            console.log(error, 'error');
            dispatch({type: GET_ERRORS, payload: error})
        }
    }
};


export function addComment({commentText, claimId, userId}, historyPush, historyReplace) {
    return function (dispatch) {
        Axios.post(`${ROOT_URL}/addComment/` + claimId + '/' + userId, {
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
                historyReplace('/claims/' + claimId, {
                    time: new Date().toLocaleString(),
                    message: response,
                });
            });
    }
}
