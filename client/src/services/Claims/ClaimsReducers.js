import {ADD_CLAIM, GET_ALL, RESOLVE_USER , DELETE_CLAIM, GET_CLAIM} from "./ClaimsTypes";

const initialState = {
    addClaim: {},
    all: [],
    claim: {},
};
export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_CLAIM:
            return {...state, add: action.payload};
        case GET_ALL:
            return {...state, all: action.payload};
        case GET_CLAIM:
            return {...state, claim: action.payload};
        case DELETE_CLAIM:
            return {...state, all: state.all.filter(u => u._id !== action.payload)};
        case RESOLVE_USER:
            return {...state, claim: action.payload};
        default:
            return state;
    }
};

