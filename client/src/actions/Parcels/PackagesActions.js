import Axios from "axios";

export const GET_PACKAGES_SUCCESS = "GET_PACKAGES_SUCCESS";
export const GET_PACKAGES_ERROR = "GET_PACKAGES_ERROR";
export const GET_fetchPost_SUCCESS = "GET_fetchPost_SUCCESS";
export const ADD_Request_Package = "ADD_Request_Package";

export const getPackages = () => {
    return async (dispatch) => {
        try {
            const result = await Axios.get('http://localhost:3000/packages/All');
            dispatch({type: GET_PACKAGES_SUCCESS, payload: result.data})
        } catch (error) {
            dispatch({type: GET_PACKAGES_ERROR, error})
        }
    }
}

export function AddRequest({Suggestion, Message, userId, postId}, historyPush, historyReplace) {
    return function (dispatch) {
        console.log("AddRequestAction");
        Axios.post(`http://localhost:3000/packages/add/`, {
            Suggestion: Suggestion,
            Message: Message,
            userId: userId,
            postId: postId,
        }, {})
            .then((response) => {  // If create post succeed, navigate to the post detail page
                historyPush(`/Front/parcels/` + userId);
            })
            .catch(({response}) => {  // If create post failed, alert failure message
                console.log(response, 'error');
                historyReplace('/front/parcels/' + postId, {
                    time: new Date().toLocaleString(),
                    message: response,
                });
            });
    }

}

export function fetchPostById(id) {
    return async (dispatch) => {
        const result = await Axios.get('http://localhost:3000/packages/' + id);
        dispatch({type: GET_fetchPost_SUCCESS, parcel: result.data});
    }


}
