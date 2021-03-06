import {ADD_CLAIM, EDIT_CLAIM, GET_ALL, RESOLVE_CLAIM , SEARCH_CLAIM, DELETE_CLAIM, GET_CLAIM, GET_ALL_COMMENT, DELETE_COMMENT, ADD_COMMENT_TO_CLAIM, UNRESOLVE_CLAIM} from "./ClaimsTypes";

const initialState = {
    addClaim: {},
    all: [],
    allComments: [],
    claim: {},
};
export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_CLAIM:
            return {...state, add: action.payload};
        case EDIT_CLAIM:
            return {...state, claim: action.payload};
        case GET_ALL:
            return {...state, all: action.payload};
        case SEARCH_CLAIM:
            console.log(action.payload, 'payload');
            return {...state, all: action.payload};
        case GET_ALL_COMMENT:
            return {...state, allComments: action.payload};
        case ADD_COMMENT_TO_CLAIM:
            return {...state, claim: action.payload};
        case DELETE_COMMENT:
            console.log(action, 'action REDUCER')
            return {...state, claim: action.payload.data};
        case GET_CLAIM:
            return {...state, claim: action.payload};
        case DELETE_CLAIM:
            return {...state, all: state.all.filter(u => u._id !== action.payload)};
        case RESOLVE_CLAIM:
            console.log(action.payload);
            return {...state, claim: action.payload};
        case UNRESOLVE_CLAIM:
            return {...state, claim: action.payload};
        default:
            return state;
    }
};

