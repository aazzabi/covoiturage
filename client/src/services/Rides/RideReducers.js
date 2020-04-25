import {ADD_MSG, ADD_RIDE, ADD_TRAVELLER, DELETE_RIDE, EDIT_RIDE, GET_ALL, GET_RIDE} from "./RideTypes";

const initialState = {
    msg: {},
    addRide: {},
    all: [],
    ride: {},
};
export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_RIDE:
            return {...state, add: action.payload};
        case ADD_TRAVELLER:
            return {...state, add: action.payload};
        case ADD_MSG:
            return {...state, msg: action.payload};
        case EDIT_RIDE:
            return {...state, ride: action.payload};
        case GET_ALL:
            return {...state, all: action.payload};

        case GET_RIDE:
            return {...state, ride: action.payload};
        case DELETE_RIDE:
            return {...state, all: state.all.filter(u => u._id !== action.payload)};

        default:
            return state;
    }
};

