import { connect } from "react-redux";
import Location from "./location";
import {fetchPostById} from "../../../actions/Parcels/PackagesActions";
import {createLocation} from "../../../actions/location/locationAction";
import {getCurrentUser} from "../../../actions/authActions";

const mapStateToProps = state => ({
    currentUser: state.auth.user
});
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPostById: id => dispatch(fetchPostById(id)),
        createLocation,
        getCurrentUser
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Location);
