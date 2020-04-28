import Axios from "axios";
import {GET_fetchPackagesByUserId} from "./PackagesActions";

export const ACCEPT_Parcel_Request = "ACCEPT_Parcel_Request";
export const DELETE_Parcel_Request = "DELETE_Parcel_Request";
export const Parcel_Request_ERROR = "Parcel_Request_ERROR";


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
