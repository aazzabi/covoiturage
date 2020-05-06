import {
    combineReducers
} from 'redux';

import locations from './locationReducer';
import times from './TimeReducer';

export default combineReducers({
    locations,

    times
});
