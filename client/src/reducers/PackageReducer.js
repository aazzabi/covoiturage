import {
    ADD_Request_Package, DELETE_REQUEST, GET_fetch_Request, GET_fetchPackagesByUserId,
    GET_fetchPost_SUCCESS,
    GET_PACKAGES_ERROR,
    GET_PACKAGES_SUCCESS, GET_PARCEL, PACKAGES_EDIT
} from "../actions/Parcels/PackagesActions";

const initialState = {
    add: {},
    packages: [],
    myparcels: [],
    error: null,
    parcel: {},
    request: []
}

export default function packages(state = initialState, action) {

    switch (action.type) {

        case DELETE_REQUEST:
            return {...state, request: state.request.filter(u => u._id !== action.payload)};


        case GET_PARCEL:
            return {...state, parcel: action.payload};
        case GET_fetch_Request:
            return {...state, request: action.payload};
        case PACKAGES_EDIT:
            return {...state, parcel: action.payload};

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
