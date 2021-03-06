import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import AuthHeader from "../../../components/Headers/AuthHeader";
import {CardBody, Col, Container, Row} from "reactstrap";
import {createTime} from "../../../actions/location/timeapi";
import {connect} from "react-redux";
import {fetchmap} from "../../../actions/Parcels/RequestsParcelActions";
import {getCurrentUser} from "../../../actions/authActions";
import Card from "@material-ui/core/Card";
import MyMapComponent from "./map_container";
import CardHeader from "@material-ui/core/CardHeader";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCTJckDGDyHM8cZ9R-PKUIQGHgfhoXzzFA");

const AnyReactComponent = ({text}) => <div>{text}</div>;

export class MapItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parcelMap: props.parcelMap,
            adress: ""
        };

    }

    async componentWillMount() {
        const {id} = this.props.match.params;
        await this.props.fetchmap(id);
        await this.props.getCurrentUser();
        const user = this.props.currentUser._id;
        Geocode.fromLatLng(this.props.parcelMap.latitude, this.props.parcelMap.longitude).then(
            response => {
                const address = response.results[0].formatted_address;
                this.setState({
                    adress: address
                });
            },
            error => {
                console.error(error);
            }
        );
    }


    render() {
        const x = this.props.parcelMap;
        console.log(x)
        return (
            <>
                <AuthHeader title="Track Parcels" lead=""/>
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center">
                        <div className="col-lg-8">
                            <Card className="border-0">

                                <div className="card-header"><h5 className="h3 mb-0">Latest parcel position</h5></div>

                                <CardBody>
                                    <MyMapComponent className="map-canvas" position={this.props.parcelMap}
                                                    isMarkerShown>

                                    </MyMapComponent>
                                </CardBody>
                            </Card>
                        </div>
                        <Col lg="4">
                            <div className="card">
                                <div className="card-header"><h5 className="h3 mb-0">Details</h5></div>
                                <div className="card-body">
                                    <div className="timeline timeline-one-side" data-timeline-axis-style="dashed"
                                         data-timeline-content="axis">
                                        <div className="timeline-block"><span className="timeline-step badge-success">
                                            <i className="ni ni-bell-55"/></span>
                                            <div className="timeline-content">
                                                <div className="d-flex justify-content-between pt-1">
                                                    <div><span className="text-muted text-sm font-weight-bold">Latest update </span>
                                                    </div>
                                                    <div className="text-right"><small className="text-muted"><i
                                                        className="fas fa-clock mr-1"/>2 hrs ago</small></div>
                                                </div>
                                                <h6 className="text-sm mt-1 mb-0">
                                                    {x.UpdateLocationAt}

                                                </h6></div>
                                        </div>
                                        <div className="timeline-block"><span className="timeline-step badge-danger"><i
                                            className="ni ni-html5"/></span>
                                            <div className="timeline-content">
                                                <div className="d-flex justify-content-between pt-1">
                                                    <div><span className="text-muted text-sm font-weight-bold">Current Location</span>
                                                    </div>

                                                </div>
                                                <h6 className="text-sm mt-1 mb-0">{this.state.adress}.</h6></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Col>

                    </Row>

                </Container></>
        );
    }
}

GoogleApiWrapper({
    apiKey: "AIzaSyD8gwyU7-Ty2s2_IVmz9I3J5cS5JltJ8rM",

})
const mSTP = (state, ownProps) => ({
    parcelMap: state.pack.parcelMap,
    currentUser: state.auth.currentUser,
});

const mDTP = dispatch => ({
    getCurrentUser,
    createTime: time => dispatch(createTime(time)),
    fetchmap: id => dispatch(fetchmap(id)),

});

export default connect(mSTP, mDTP)(MapItem);
