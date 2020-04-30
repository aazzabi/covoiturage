import {
  connect
} from 'react-redux';
import MapItem from './map_item';
import { createLocation } from './../../../actions/location/locationAction';
import { createTime } from './../../../actions/location/timeapi';

const mSTP = (state, ownProps) => ({
    locations: Object.values(state.entities.locations),
    currentUserId: state.auth.currentUser.id
});

const mDTP = dispatch => ({
  createLocation: location => dispatch(createLocation(location)),
  createTime: time => dispatch(createTime(time))
});

export default connect(mSTP, mDTP)(MapItem);
