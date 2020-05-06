import  merge from 'lodash/merge';
import {
    CREATE_Location,

} from '../../actions/types';
const initialState = {
    add: {},
};
const locationReducer = (state = initialState, action) => {
    const newState = merge({}, state);
    Object.freeze(state);
    switch (action.type) {
        case CREATE_Location:
            return {...state, add: action.payload};
            default:
            return state;
    }
};

export default locationReducer;
