import {GET_PACKAGES_ERROR, GET_PACKAGES_SUCCESS} from "../actions/PackagesActions";

const initialState = {
    packages: [],
    pack: {},
    error: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PACKAGES_SUCCESS:
            return {
                ...state,
                packages: action.payload
            };

        case GET_PACKAGES_ERROR:
            return {
                ...state,
                error: action.error
            };

        default:
            return state;
    }
}
