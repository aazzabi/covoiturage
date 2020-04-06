import {DELETE_USER, GET_ALL, GET_DRIVERS, GET_USERS,} from "./UserTypes";

const initialState = {
    user: {},
    drivers: [],
    users: [],
    updatedUser: {}
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL:
            return {...state, allUsers: action.payload};
        case GET_USERS:
            return {...state, users: action.payload};
        case GET_DRIVERS:
            return {...state, drivers: action.payload};
        case DELETE_USER:
            return {...state, users: state.users.filter(u => u._id !== action.payload)};
        default:
            return state;
    }
};

