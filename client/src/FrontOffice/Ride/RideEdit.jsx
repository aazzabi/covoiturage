import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup, InputGroupAddon, InputGroupText,
    Label,
    Row
} from "reactstrap";
import {getCurrentUser} from "./../../actions/authActions"
import {addRide, EditRide, getRide} from "../../services/Rides/RideAction";
import axios from "axios";
import Geocode from "react-geocode";
import AuthHeader from "../../components/Headers/AuthHeader";
import ReactDatetime from "react-datetime";
import classnames from "classnames";
import PlacesAutocomplete from "../Parcels/GAutoComplete";
import MapWithASearchBox from "./Map";

class RideEdit extends Component {

    constructor(props) {
        super(props);
        this.onChangeRideStartTime = this.onChangeRideStartTime.bind(this);
        this.onChangeRideOrigin = this.onChangeRideOrigin.bind(this);
        this.onChangeRideDestination = this.onChangeRideDestination.bind(this);
        this.onChangePackagesAcceptation = this.onChangePackagesAcceptation.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.state = {
            mapPosition: {
                lat: "",
                lng: ""
            },
            markerPosition: {
                lat: "",
                lng: ""
            },
            startTime: new Date(),
            origin: "",
            destination: "",
            nbrPlaces: "",
            description: "",
            prixPerPlace: "",
            packageAllowed: true,
            originInfo: [
                {
                    lat: "",
                    lng: ""
                }
            ],
            destinationInfo: [
                {
                    lat: "",
                    lng: ""
                }
            ],
            currentUser: {},
            ride: {},
        };

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                ride: nextProps.ride,
                currentUser: nextProps.currentUser,
            });
        }
    }

    renderAlert() {
        const {state} = this.props.history.location;
        const {action} = this.props.history;
        if (state && action === 'REPLACE') {
            return (
                <div className="alert alert-danger" role="alert">
                    {`[${state.time}] --- `} <strong>Oops!</strong> {state.message}
                </div>
            );
        }
    }

    async componentWillMount() {
        await this.props.getCurrentUser();
        await this.props.getRide(this.props.match.params.id);
        console.log(this.props, 'props');
        console.log(this.props.ride, 'props.claim.title');
        this.setState({
            startTime: this.props.ride.startTime,
            origin: this.props.ride.origin,
            destination: this.props.ride.destination,
            nbrPlaces: this.props.ride.nbrPlaces,
            description: this.props.ride.description,
            packageAllowed: this.props.ride.packageAllowed,
            prixPerPlace: this.props.ride.prixPerPlace,
        })
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    onChangeRideStartTime = (date) => {
        const valueOfInput = date.format();
        this.setState({startTime: valueOfInput});
    };

    onChangePrice() {

        if (this.state.origin && this.state.destination){
            const result = axios.get('http://localhost:3000/ride/price/' + this.state.origin + '/' + this.state.destination);
            result.then((data) => {
                console.log(JSON.stringify(data));
                if (JSON.stringify(data)){
                    this.setState({prixPerPlace: JSON.stringify(data.data)});
                    console.log(this.prixPerPlace);
                }
            }).catch(err =>{
                this.setState({prixPerPlace: 0});
            });
        }
    }

    onChangeRideOrigin(e) {
        Geocode.setApiKey("AIzaSyCkTjWTcA3sD2wiyBr4SANvsdrtZfmv8rM");

        this.setState({origin: e.target.value});
        Geocode.fromAddress(e.target.value).then(
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
        this.onChangePrice();
    }

    onChangeRideDestination(e) {
        this.setState({destination: e.target.value});
        Geocode.fromAddress(e.target.value).then(
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
        this.onChangePrice();
    }

    onChangePackagesAcceptation = () => {
        this.setState({
            packageAllowed: !this.state.packageAllowed,
        });

    }
    confirme() {
        const u = this.props.currentUser;
        //     const currentUser = jwt_decode(localStorage.getItem("jwtToken").User);
        console.log(this.props.currentUser._id, 'currentUser');

        if (this.props.currentUser) {
            this.props.EditRide({
                startTime: this.state.startTime,
                origin: this.state.origin,
                destination: this.state.destination,
                nbrPlaces: this.state.nbrPlaces,
                description: this.state.description,
                packageAllowed: this.state.packageAllowed,
                prixPerPlace: this.state.prixPerPlace,
                rideId: this.props.match.params.id,
            }, (path) => {  // callback 1: history push
                this.props.history.push(path);
            }, (path, state) => {
                this.props.history.replace(path, state);
            });
            console.log('done jsx');
            this.props.history.push('/front/login');
        } else {
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Oops!</strong> Vous devez se connecter d'abord
                </div>
            );
        }
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <>
                <AuthHeader title="Choose the best plan for your business" lead=""/>
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center">
                        {this.renderAlert()}
                        {/*<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>*/}


                        <Form>

                            <Col lg="12">
                                <div className="card-wrapper">
                                    <Card>
                                        <CardHeader>

                                            <h3 className="mb-0">Edit Your Ride</h3>
                                        </CardHeader>

                                        <CardBody>
                                            <Col md="12">
                                                <div className="form-wrapper">
                                                    <CardHeader>

                                                        <h3 className="mb-0">Information About Your Ride(price will automatically calculated)</h3>
                                                    </CardHeader>
                                                    <br/>
                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <ReactDatetime
                                                                    inputProps={{
                                                                        placeholder: this.props.ride.startTime,
                                                                    }}
                                                                    timeFormat={true}
                                                                    selected={this.state.startTime}
                                                                    onChange={this.onChangeRideStartTime}
                                                                    showTimeSelect
                                                                />
                                                            </FormGroup>


                                                            <FormGroup>
                                                                <br/>
                                                                <Label>package Allowed</Label><br/>
                                                                <label
                                                                    className="custom-toggle custom-toggle-success mr-1">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={this.state.packageAllowed}
                                                                        onChange={this.onChangePackagesAcceptation}/>
                                                                    <span
                                                                        className="custom-toggle-slider rounded-circle"
                                                                        data-label-off="No"
                                                                        data-label-on="Yes"
                                                                    />
                                                                </label>

                                                            </FormGroup>


                                                        </Col>
                                                        <Col md="6">


                                                            <FormGroup>

                                                                <InputGroup
                                                                    className={classnames("input-group-merge", {
                                                                        focused: this.state.yourName
                                                                    })}
                                                                >
                                                                    <InputGroupAddon addonType="prepend">
                                                                        <InputGroupText>
                                                                            <i className="fas fa-user"/>
                                                                        </InputGroupText>
                                                                    </InputGroupAddon>
                                                                    <Input
                                                                        placeholder="Places Number Max 4"
                                                                        id="standard-start-adornment"
                                                                        value={this.props.ride.nbrPlaces}
                                                                        onChange={event => this.handleChange('nbrPlaces', event.target.value)}
                                                                    />
                                                                </InputGroup>
                                                            </FormGroup>

                                                            <FormGroup>
                                                                <Label>{this.state.mesg}</Label>
                                                                <InputGroup
                                                                    className={classnames("input-group-merge", {
                                                                        focused: this.state.yourName
                                                                    })}
                                                                >
                                                                    <InputGroupAddon addonType="prepend">
                                                                        <InputGroupText>
                                                                            <i className="fas fa-dollar-sign"/>
                                                                        </InputGroupText>
                                                                    </InputGroupAddon>
                                                                    <Input
                                                                        placeholder={this.props.ride.prixPerPlace}
                                                                        id="standard-start-adornment"
                                                                        value={this.state.prixPerPlace}
                                                                        onChange={event => this.handleChange('prixPerPlace', event.target.value)}
                                                                        // onChange={this.onChangePrice()}
                                                                    />
                                                                </InputGroup>
                                                            </FormGroup>

                                                        </Col>
                                                    </Row>

                                                    <CardHeader>

                                                        <h3 className="mb-0">Form where to where you will take us :D</h3>
                                                    </CardHeader>
                                                    <br/>
                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label>From</Label>
                                                                <PlacesAutocomplete label={this.props.ride.origin}
                                                                                    inputValue={this.state.origin}
                                                                                    handleChange={this.onChangeRideOrigin}/>
                                                            </FormGroup>

                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label>To</Label>

                                                                <PlacesAutocomplete
                                                                                    label={this.props.ride.destination}
                                                                                    inputValue={this.state.destination}
                                                                                    handleChange={this.onChangeRideDestination}/>
                                                            </FormGroup>


                                                        </Col>
                                                        <Col md="12">
                                                            <div className="form-wrapper">
                                                                <MapWithASearchBox origin={this.state.originInfo}
                                                                                   destination={this.state.destinationInfo}>
                                                                </MapWithASearchBox>

                                                            </div>
                                                        </Col>

                                                    </Row>

                                                    <CardHeader>

                                                        <h3 className="mb-0">A little description about the ride (ok with smoke in the car , listen to music ...) </h3>
                                                    </CardHeader>
                                                    <br/>
                                                    <Row>
                                                        <Col md="12">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="exampleFormControlTextarea1"
                                                                >
                                                                    Description
                                                                </label>
                                                                <Input
                                                                    placeholder={this.props.ride.description}
                                                                    id="exampleFormControlTextarea1"
                                                                    rows="3"
                                                                    type="textarea"
                                                                    value={this.state.description}
                                                                    onChange={event => this.handleChange('description', event.target.value)}
                                                                />
                                                            </FormGroup>
                                                            <br/>
                                                            <Row className="justify-content-center">
                                                                <Button type="submit" onClick={e => this.confirme(e)}>
                                                                    Let's Gooo !!
                                                                </Button>
                                                            </Row>


                                                        </Col>
                                                    </Row>



                                                </div>
                                            </Col>
                                        </CardBody>

                                    </Card>
                                </div>
                            </Col>

                        </Form>

                    </Row>
                </Container>
            </>
        );
    }
}

const validate = (values) => {
    const errors = {}

    if(!values.destination) {
        errors.title = "Enter a destination"
    }
    if(!values.description) {
        errors.content = "Enter a description for your ride"
    }
    return errors
};

RideEdit = reduxForm({
    validate,
    form: 'ride_edit',  // name of the form
    enableReinitialize : true // you need to add this property
})(RideEdit);

function mapStateToProps(state) {
    return {
        ride: state.rides.ride,
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps, {addRide, getCurrentUser, getRide, EditRide})(RideEdit);
