import { connect } from "react-redux";
import History from "./history";
import { getLocations } from '../../../reducers/selector';

const mapStateToProps = (state, ownprops) => {
  return {
    locations: getLocations(state, state.session.id)
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
