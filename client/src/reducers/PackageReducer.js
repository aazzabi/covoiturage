import {
    ADD_Request_Package, GET_fetch_Request, GET_fetchPackagesByUserId,
    GET_fetchPost_SUCCESS,

    GET_PACKAGES_ERROR,
    GET_PACKAGES_SUCCESS
} from "../actions/Parcels/PackagesActions";
import {DELETE_Parcel_Request} from "../actions/Parcels/RequestsParcelActions";

const initialState = {
    add: {},
    packages: [],
    myparcels: [],
    myrequests:[],
    error: null,
    parcel: {}
}

export default function packages(state = initialState, action) {
    switch (action.type) {
        case DELETE_Parcel_Request:
            return {...state, packages: state.packages.filter(u => u.id !== action.payload)};

        case ADD_Request_Package:
            return {...state, add: action.payload};

        case GET_fetch_Request:
            return {
                ...state,
                myrequests: action.payload,
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
        case GET_PACKAGES_SUCCESS:
            return {
                ...state,
                packages: action.payload,
            };
        default:
            return state;
    }
}
