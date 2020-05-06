import Axios from "axios";
import {GET_fetch_Request, GET_fetchPackagesByUserId} from "./PackagesActions";

export const ACCEPT_Parcel_Request = "ACCEPT_Parcel_Request";
export const DELETE_Parcel_Request = "DELETE_Parcel_Request";
export const Parcel_Request_ERROR = "Parcel_Request_ERROR";
export const GET_fetch_Map = "GET_fetch_Map";

export function refuserRequest(id) {
    console.log(id)
    return async (dispatch) => {

        Axios.delete('http://localhost:3000/packages/RequestRefuse/' + id).then(res => {
                dispatch({
                    type: DELETE_Parcel_Request,
                    payload: id
                })

            }
        ).catch(err =>
            dispatch({
                type: Parcel_Request_ERROR,
                payload: err.response.data
            })
        );

    }

}

export const acceptRequestParcel = id => dispatch => {
    Axios.post(`http://localhost:3000/packages/myrequests/${id}/accept`).then(res => {
            dispatch({
                type: ACCEPT_Parcel_Request,
                payload: id
            })
        }
    ).catch(err =>
        dispatch({
            type: Parcel_Request_ERROR,
            payload: err.response.data
        })
    );

};

export function fetchmap(id) {
    return async (dispatch) => {
        const result = await Axios.get('http://localhost:3000/api/locations/' + id);
        console.log(id)
        console.log("ssssss",result)
        dispatch({type: GET_fetch_Map, payload: result.data});
    }
}
