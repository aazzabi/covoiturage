import Axios from "axios";
import {CREATE_Location} from "../types";


export function createLocation(id,location, historyPush, historyReplace) {
    return function (dispatch) {
        console.log("AddRequestAction");
        Axios.post(`/api/locations/${id}`, location, {})
            .then((response) => {  // If create post succeed, navigate to the post detail page
                dispatch({
                    type: CREATE_Location,
                    payload: response.data,
                });
            })
            .catch(({response}) => {  // If create post failed, alert failure message

            });
    }

}
