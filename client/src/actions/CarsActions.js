import axios from "axios";

import {GET_ERRORS, GET_MARQUES, GET_MODEL_BY_MARQUE} from "./types";

export const getAllMarques = () => dispatch => {
    axios
        .get("http://localhost:3000/cars/getAllMarques")
        .then(res => {
                dispatch({
                    type: GET_MARQUES,
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

export const getAllModelByMarque = (marque) => dispatch => {
    axios
        .get("http://localhost:3000/cars/getAllModelByMarque/" + marque)
        .then(res => {
                dispatch({
                    type: GET_MODEL_BY_MARQUE,
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
