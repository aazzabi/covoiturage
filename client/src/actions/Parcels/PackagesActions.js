import Axios from "axios";
import {GET_ERRORS} from "../types";

export const GET_PACKAGES_SUCCESS = "GET_PACKAGES_SUCCESS";
export const GET_PARCEL = "GET_PARCEL";
export const PACKAGES_EDIT = "PACKAGES_EDIT";
export const GET_PACKAGES_ERROR = "GET_PACKAGES_ERROR";
export const GET_fetchPost_SUCCESS = "GET_fetchPost_SUCCESS";
export const ADD_Request_Package = "ADD_Request_Package";
export const GET_fetchPackagesByUserId = "GET_fetchPackagesByUserId";

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

export const getParcel = (idParcel) => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/packages/` + idParcel);
            dispatch({type: GET_PARCEL, payload: result.data})
        } catch (error) {
            dispatch({type: GET_ERRORS, error})
        }
    }
};


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


export function EditPackage({title, type, price, weight, size, description, departure, arrival,files,packageId}, historyPush, historyReplace) {
    return function (dispatch) {
        console.log(title,price);
        Axios.put(`http://localhost:3000/packages/edit/` + packageId, {

            title: title,
            type: type,
            price: price,
            weight: weight,
            size: size,
            description: description,
            departure: departure,
            arrival: arrival,
            files: files,

        }, {})
            .then((response) => {  // If create post succeed, navigate to the post detail page
                dispatch({
                    type: PACKAGES_EDIT,
                    payload: response.data,

                });
                console.log()
               // historyPush(`/front/ride/myrides/`);
            })
            .catch(({response}) => {  // If create post failed, alert failure message
                console.log(response, 'error');
                // historyReplace('/front/ride/myrides/',
                //     {
                //     time: new Date().toLocaleString(),
                //     message: response,
                // });
            });
    }
}


export function fetchPackagesByUserId(id) {
    return async (dispatch) => {
        const result = await Axios.get('http://localhost:3000/packages/myParcels/' + id);
        dispatch({type: GET_fetchPackagesByUserId, payload: result.data});
    }
}

export function fetchPostById(id) {
    return async (dispatch) => {
        const result = await Axios.get('http://localhost:3000/packages/' + id);
        dispatch({type: GET_fetchPost_SUCCESS, payload: result.data});
    }


}
