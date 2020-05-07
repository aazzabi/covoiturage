import {GET_fetchPost_SUCCESS, GET_PACKAGES_ERROR} from "../actions/Parcels/PackagesActions";

const initialState = {}
export default function(state = {}, action) {
  switch (action.type) {
      case GET_fetchPost_SUCCESS:
          return action.parcel;
        case GET_PACKAGES_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}
