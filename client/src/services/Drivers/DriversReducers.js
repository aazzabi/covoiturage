import {DECLINE_REQUEST, GET_ALL_DRIVER_REQUESTS, ACCEPT_REQUEST} from "../../actions/types";

const initialState = {
    allDriversRequests: [],
    models: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DRIVER_REQUESTS:
            return {...state, allDriversRequests: action.payload};
        case ACCEPT_REQUEST:
            return {...state, allDriversRequests: action.payload};
        case DECLINE_REQUEST:
            return {...state, allDriversRequests: state.allDriversRequests.filter(u => u._id !== action.payload)};
        default:
            return state;
    }
}
