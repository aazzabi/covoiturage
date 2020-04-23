import Axios from "axios";

import {ADD_RIDE, DELETE_RIDE, EDIT_RIDE, GET_ALL, GET_RIDE} from "./RideTypes";
import {GET_ERRORS} from "../../actions/types";

const ROOT_URL = 'http://localhost:3000/ride';

// get users
export function addRide({startTime, destination, nbrPlaces, packageAllowed, description, origin, prixPerPlace, userId}, historyPush, historyReplace) {
    return function (dispatch) {
        console.log({startTime, destination, nbrPlaces, packageAllowed, description, origin, userId});
        Axios.post(`${ROOT_URL}/add/` + userId, {
            startTime: startTime,
            destination: destination,
            nbrPlaces: nbrPlaces,
            packageAllowed: packageAllowed,
            description: description,
            origin: origin,
            prixPerPlace: prixPerPlace,
        }, {})
            .then((response) => {  // If create post succeed, navigate to the post detail page
                dispatch({
                    type: ADD_RIDE,
                    payload: response.data,
                });
                historyPush(`/front/ride/myrides/`);
            })
            .catch(({response}) => {  // If create post failed, alert failure message
                console.log(response, 'error');
                historyReplace('/front/ride/add', {
                    time: new Date().toLocaleString(),
                    message: response,
                });
            });
    }
}

export function EditRide({startTime, destination, nbrPlaces, packageAllowed, description, origin, prixPerPlace, rideId}, historyPush, historyReplace) {
    return function (dispatch) {
        console.log(description);
        Axios.put(`${ROOT_URL}/edit/` + rideId, {
            startTime: startTime,
            destination: destination,
            nbrPlaces: nbrPlaces,
            packageAllowed: packageAllowed,
            description: description,
            origin: origin,
            prixPerPlace: prixPerPlace,
        }, {})
            .then((response) => {  // If create post succeed, navigate to the post detail page
                dispatch({
                    type: EDIT_RIDE,
                    payload: response.data,
                });
                historyPush(`/front/ride/myrides/`);
            })
            .catch(({response}) => {  // If create post failed, alert failure message
                console.log(response, 'error');
                historyReplace('/front/ride/myrides/', {
                    time: new Date().toLocaleString(),
                    message: response,
                });
            });
    }
}

export const getRide = (idRide) => {
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/ride/getById/` + idRide);
            dispatch({type: GET_RIDE, payload: result.data})
        } catch (error) {
            dispatch({type: GET_ERRORS, error})
        }
    }
};

export const myRides = (idDriver) => {
    console.log(idDriver)
    return async (dispatch) => {
        try {
            const result = await Axios.get(`http://localhost:3000/ride/getRidesByDiver/` + idDriver);
            dispatch({type: GET_ALL, payload: result.data})
            console.log(result.data)
        } catch (error) {
            dispatch({type: GET_ERRORS, error})
        }
    }
};

export const deleteRide = id => dispatch => {
    Axios.delete(`http://localhost:3000/ride/delete/${id}`).then(res => {
            dispatch({
                type: DELETE_RIDE,
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
