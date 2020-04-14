import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthHeader from "../../../components/Headers/AuthHeader";
import {Card, CardBody, CardHeader, Container, Row} from "reactstrap";
import {fetchPostById} from "../../../actions/Parcels/PackagesActions";
import Map from "./map"
import Geocode from "react-geocode";
import Col from "reactstrap/es/Col";
import InputGroup from "reactstrap/es/InputGroup";
import InputGroupAddon from "reactstrap/es/InputGroupAddon";
import InputGroupText from "reactstrap/es/InputGroupText";


class PackagesDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            originInfo: [],
            destinationInfo: [],
            parcel: {},
            showing: true

        }
        this.myDivToFocus = React.createRef()

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                parcel: nextProps.parcel,
            });
        }

        this.origin();
        this.des();

    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchPostById(id);
        this.setState({
            parcel: this.props.parcel
        });

    }

    handleHide = (event) => {
        const {showing} = this.state;
        if (this.myDivToFocus.current) {
            this.myDivToFocus.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            })
        }
        this.setState({showing: !showing})
        this.origin();
        this.des();


    }

    origin() {
        Geocode.setApiKey("AIzaSyDtJlOlL_sZhchii9wg4A6yi7vZutilBeg");

        Geocode.fromAddress(this.state.parcel.departure).then(
            response => {
                const {lat, lng} = response.results[0].geometry.location;
                this.setState({
                    originInfo: [lat, lng]
                });
            },
            error => {
                console.error(error);
            }
        );
    }

    des() {
        Geocode.setApiKey("AIzaSyDtJlOlL_sZhchii9wg4A6yi7vZutilBeg");
        Geocode.fromAddress(this.state.parcel.arrival).then(
            response => {
                const {lat, lng} = response.results[0].geometry.location;
                this.setState({
                    destinationInfo: [lat, lng]
                });

            },
            error => {
                console.error(error);
            }
        );
    }

    render() {
        const parcel = this.props.parcel;
        const {showing} = this.state;
        const serverUrl = "http://127.0.0.1:8887/";

        return (
            <><AuthHeader title="Packages Available" lead=""/>
                {!showing

                    ?
                    <div className="col">
                        <Card className="border-0"><Map className="map-canvas" origin={this.state.destinationInfo}
                                                        destination={this.state.originInfo}>
                        </Map></Card></div>

                    : null
                }
                <Container className="mt--6 container-fluid">
                    <Row className="justify-content-center">
                        <Col lg="6">
                                <Card >
                                    <CardHeader className="border-0">
                                        <div className="align-items-center row">
                                            <div className="col-8"><h5 className="h3 mb-0">Packages List</h5></div>
                                            <div className="text-right col-4"><a href="#mapss" onClick={this.handleHide}
                                                                                 className="btn-neutral btn btn-default btn-sm">
                                                <i className="ni ni-map-big"></i> Show maps</a>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="h2 mb-0 card-title">{parcel.title}</div>
                                        <hr className="my-4"></hr>
                                        <h6 className="heading-small text-muted mb-4">Destination</h6>
                                        <div
                                            className="timeline timeline-one-side"
                                            data-timeline-axis-style="dashed"
                                            data-timeline-content="axis"
                                        >
                                            <div className="timeline-block">
                      <span className="timeline-step badge-success">
                        <i className="ni ni-square-pin"/>
                      </span>
                                                <div className="timeline-content">
                                                    <div className="d-flex justify-content-between pt-1">
                                                        <div>
                            <span className="text-muted text-sm font-weight-bold">
                                {parcel.departure}
                            </span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="timeline-block">
                      <span className="timeline-step badge-info">
                        <i className="ni ni-delivery-fast"/>
                      </span>
                                                <div className="timeline-content">
                                                    <div className="d-flex justify-content-between pt-1">
                                                        <div>
                            <span className="text-muted text-sm font-weight-bold">
                                {parcel.arrival}
                            </span>
                                                        </div>
                                                        <div className="text-right">

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <hr className="my-4"></hr>
                                        <h6 className="heading-small text-muted mb-4">size and weights</h6>
                                        <b> WEIGHTS : </b>
                                        <button type="button" className="btn btn-success btn-sm">{parcel.weight} Kg
                                        </button>
                                        <br></br> <b> Size : </b>
                                        <button type="button" className="btn btn-primary btn-sm">{parcel.size}</button>
                                        <hr className="my-4"></hr>
                                        <h6 className="heading-small text-muted mb-4">Pricing proposal</h6>
                                        <div className="mb-2"><sup className="text-black-50">$</sup> <span
                                            className="h2 text-black-50">{parcel.price}</span>
                                        </div>
                                        <h6 className="heading-small text-muted mb-4">Owner</h6>

                                        <ul className="list my--3 list-group list-group-flush">
                                            <li className="px-0 list-group-item">
                                                <div className="align-items-center row">
                                                    <div className="col-auto col"><a className="avatar rounded-circle"
                                                                                     href="#pablo">
                                                        <img alt="..." src={`${serverUrl}${parcel.files}`}></img></a>
                                                    </div>
                                                    <div className="col ml--2"><h4 className="mb-0"><a href="#pablo">John
                                                        Michael</a></h4><span className="text-success">●</span>
                                                        <small>Online</small></div>
                                                    <div className="col-auto col">
                                                        <button type="button" className="btn btn-primary btn-sm">Contact
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>

                                        </ul>
                                    </CardBody>

                                </Card>
                          
                        </Col>
                        <Col lg="6">
                            <div className="col">
                                <Card>

                                    <CardBody><img alt="..." className="img-fluid rounded"
                                                   src={`${serverUrl}${parcel.files}`}></img></CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => ({
    parcel: state.parcel
});
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPostById: id => dispatch(fetchPostById(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PackagesDetails);
