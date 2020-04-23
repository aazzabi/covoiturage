import {ADD_RIDE, DELETE_RIDE, EDIT_RIDE, GET_ALL, GET_RIDE, RESOLVE_RIDE, UNRESOLVE_RIDE} from "./RideTypes";

const initialState = {
    addRide: {},
    all: [],
    ride: {},
};
export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_RIDE:
            return {...state, add: action.payload};
        case EDIT_RIDE:
            return {...state, ride: action.payload};
        case GET_ALL:
            return {...state, all: action.payload};

        case GET_RIDE:
            return {...state, ride: action.payload};
        case DELETE_RIDE:
            return {...state, all: state.all.filter(u => u._id !== action.payload)};
        case RESOLVE_RIDE:
            console.log(action.payload);
            return {...state, ride: action.payload};
        case UNRESOLVE_RIDE:
            return {...state, ride: action.payload};
        default:
            return state;
    }
};

