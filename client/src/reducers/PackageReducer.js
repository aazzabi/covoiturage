import {
    ADD_Request_Package, GET_fetchPackagesByUserId,
    GET_fetchPost_SUCCESS,
    GET_PACKAGES_ERROR,
    GET_PACKAGES_SUCCESS
} from "../actions/Parcels/PackagesActions";

const initialState = {
    add: {},
    packages: [],
    myparcels: [],
    error: null,
    parcel: {}
}

export default function packages(state = initialState, action) {
    switch (action.type) {
        case ADD_Request_Package:
            return {...state, add: action.payload};

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
        case GET_fetchPackagesByUserId:

            return {
                ...state,
                myparcels: action.payload
            };
        case GET_fetchPost_SUCCESS:
            return {
                ...state,
                parcel: action.payload
            };
        default:
            return state;
    }
}
