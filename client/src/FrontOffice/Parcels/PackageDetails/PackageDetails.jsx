import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Card,
    CardBody,
    CardHeader,
    Container,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon, InputGroupText,
    Label,
    Modal,
    Row
} from "reactstrap";
import {AddRequest, fetchPostById} from "../../../actions/Parcels/PackagesActions";
import Map from "./map"
import Geocode from "react-geocode";
import Col from "reactstrap/es/Col";
import Form from "reactstrap/es/Form";
import ModalHeader from "reactstrap/es/ModalHeader";
import ModalBody from "reactstrap/es/ModalBody";
import ModalFooter from "reactstrap/es/ModalFooter";
import Button from "@material-ui/core/Button";
import {reduxForm} from "redux-form";
import {getCurrentUser} from "../../../actions/authActions";
import Axios from "axios";
import NotificationAlert from 'react-notification-alert';

class PackagesDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            originInfo: [],
            destinationInfo: [],
            parcel: {},
            currentUser: {},
            open: false,
            Messages: null,
            Suggestions: null,
            showing: true,
            sender: {}

        }
        this.myDivToFocus = React.createRef()

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                parcel: nextProps.parcel,
                currentUser: nextProps.currentUser
            });
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchPostById(id);
        console.log(this.props.parcel)
        this.setState({
            parcel: this.props.parcel,
        });
        this.props.getCurrentUser();

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

    handleOpen = () => {
        const {open} = this.state;

        this.setState({open: !open});

    };


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

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };


    AddRequestSubmit() {
        const {id} = this.props.match.params;
        const request = {
            suggestion: this.state.Suggestions,
            message: this.state.Messages,
            parcelId: id,
            user: this.props.currentUser._id,
        };
        console.log("request",request)

        this.notify("success")
        Axios.post('http://localhost:3000/packages/addrequest', request)
            .then(res => {
                this.props.history.push("/front/parcels/" + id);

            })
            .catch(err => console.log(err));

    }

    notify = type => {
        let options = {
            place: "tc",
            message: (
                <div className="alert-text">
          <span className="alert-title" data-notify="title">
          </span>
                    <span data-notify="message">
             your proposal has been sent successfully
          </span>
                </div>
            ),
            type: type,
            icon: "ni ni-bell-55",
            autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);
    };


    render() {
        const parcel = this.props.parcel;
        const {showing} = this.state;
        const serverUrl = "http://127.0.0.1:8887/";
        const {handleSubmit} = this.props;
        const {open} = this.state;
        console.log(parcel)
        return (
            <>
                <div className="header bg-gradient-info py-7 py-lg-5 pt-lg-5 ">
                    <Container>
                        <div className="header-body text-center mb-7">
                            <Row className="justify-content-center">
                                <Col className="px-5" lg="6" md="8" xl="5">

                                    <h1 className="text-white"></h1>

                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <div className="separator separator-bottom separator-skew zindex-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="fill-default"
                                points="2560 0 2560 100 0 100"
                            />
                        </svg>
                    </div>
                </div>

                {!showing

                    ?
                    <div className="col">
                        <Card className="border-0"><
                            Map className="map-canvas" origin={this.state.destinationInfo}
                                                        destination={this.state.originInfo}>
                        </Map></Card></div>

                    : null
                }
                <Container className="mt--6 container-fluid">
                    <NotificationAlert ref="notificationAlert"/>


                    <Row className="justify-content-center">
                        <Col lg="6">
                            <Card>
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
                                                <div className="col ml--2"><h4 className="mb-0"><a href="#pablo">

                                                    {parcel.sender ? parcel.sender.lastName : ""} {parcel.sender ? parcel.sender.firstName : ""}

                                                </a></h4><span className="text-success">●</span>
                                                    <small>Online</small></div>

                                                <Col className="col-auto">
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <label className="custom-toggle custom-toggle-black">
                                                                <input defaultChecked type="checkbox"
                                                                       onClick={this.handleOpen}

                                                                />
                                                                <span
                                                                    className="custom-toggle-slider rounded-circle"
                                                                    data-label-off="Contact"
                                                                    data-label-on="Contact"
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Col>

                                            </div>
                                        </li>

                                    </ul>

                                    <hr className="my-4"></hr>

                                    {open

                                        ?
                                        <Card className="bg-gradient-info">
                                            <CardBody>
                                                <Row className="justify-content-between align-items-center">
                                                    <div className="col">

                                                    </div>

                                                </Row>
                                                <div className="mt-4">
                                                    <Form>
                                                        <FormGroup>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-money-coins"/>
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input
                                                                    placeholder="Suggestion"
                                                                    type="number"
                                                                    id="Suggestions"
                                                                    onChange={event => this.handleChange('Suggestions', event.target.value)}/>
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-align-center"/>
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input id="Messages"
                                                                       placeholder="Message"
                                                                       type="text"
                                                                       onChange={event => this.handleChange('Messages', event.target.value)}
                                                                />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <Button className="mt-4" type="button"
                                                                onClick={e => this.AddRequestSubmit(e)}>
                                                            add request
                                                        </Button>

                                                    </Form>
                                                </div>
                                            </CardBody>
                                        </Card> : null
                                    }
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
    parcel: state.pack.parcel,
    currentUser: state.auth.user
});
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPostById: id => dispatch(fetchPostById(id)),
        AddRequest,
        getCurrentUser
    }
}
const validate = (values) => {
    const errors = {}

    if (!values.message) {
        errors.message = "Enter a description for request"
    }
    return errors
};
PackagesDetails = reduxForm({
    validate,
    form: 'post_contact',  // name of the form
})(PackagesDetails);

export default connect(mapStateToProps, mapDispatchToProps)(PackagesDetails);
