
import {DELETE_USER, GET_ALL, GET_DRIVERS, GET_USERS,GET_FINANCIALS , GET_RELATIONALS, GET_TECHNICALS, UPDATE_USER, GET_USER_BY_ID,GET_USER, GET_CAR} from "./UserTypes";

const initialState = {
    user: {},
    car: {},
    drivers: [],
    users: [],
    financials: [],
    technicals: [],
    relationals: [],
    updatedUser: {}
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL:
            return {...state, all: action.payload};
        case GET_USERS:
            return {...state, users: action.payload};
        case GET_CAR:
            return {...state, car: action.payload};
        case GET_USER:
            return {...state, user: action.payload};
        case GET_USER_BY_ID:
            return {...state, user: action.payload};
        case UPDATE_USER:
            return {...state, user: action.payload};
        case GET_DRIVERS:
            return {...state, drivers: action.payload};
        case GET_FINANCIALS:
            return {...state, financials: action.payload};
        case GET_TECHNICALS:
            return {...state, technicals: action.payload};
        case GET_RELATIONALS:
            return {...state, relationals: action.payload};
        case DELETE_USER:
            return {...state, all: state.all.filter(u => u._id !== action.payload)};
        default:
            return state;
    }
};

