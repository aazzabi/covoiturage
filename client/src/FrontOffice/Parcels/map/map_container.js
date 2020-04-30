import { connect } from "react-redux";
import Map from "./map";
import { createLocation } from './../../../actions/location/locationAction';

const mapStateToProps = (state, ownProps) => ({
 locations: state.entities.locations
});

const mapDispatchToProps = dispatch => ({
  createLocation: (user,location) => dispatch(createLocation(user,location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
