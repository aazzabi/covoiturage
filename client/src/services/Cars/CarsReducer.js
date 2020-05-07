import {GET_MARQUES, GET_MODEL_BY_MARQUE} from "../../actions/types";

const initialState = {
    marques: [],
    models: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MARQUES:
            return {...state, marques: action.payload};
        case GET_MODEL_BY_MARQUE:
            return {...state, models: action.payload};
        default:
            return state;
    }
}
