import {GET_fetchPost_SUCCESS, GET_PACKAGES_ERROR, GET_PACKAGES_SUCCESS} from "../actions/Parcels/PackagesActions";

const initialState = {
    packages: [],
    error: null
}

export default function packages(state = initialState, action) {
    switch (action.type) {
        case GET_PACKAGES_SUCCESS:
            return {
                ...state,
                packages: action.payload,
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
