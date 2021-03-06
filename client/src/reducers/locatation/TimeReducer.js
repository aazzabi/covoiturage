import { RECEIVE_TIMES, RECEIVE_TIME } from '../../actions/location/TimesAction';

const timesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_TIMES:
            return action.times.data;
        case RECEIVE_TIME:
            return Object.assign({}, state, {[action.time.data._id]: action.time.data});
        default:
            return state;
    }
};

export default timesReducer;
