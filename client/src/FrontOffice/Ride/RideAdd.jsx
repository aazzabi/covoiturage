import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import AuthHeader from "../../components/Headers/AuthHeader";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col, Container, Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon, InputGroupText,
    Label,
    Row
} from "reactstrap";
import {getCurrentUser} from "./../../actions/authActions"
import {addRide} from "../../services/Rides/RideAction";
import ReactDatetime from "react-datetime";
import classnames from "classnames";
import PlacesAutocomplete from "../Parcels/GAutoComplete";
import MapWithASearchBox from "./Map";
import Geocode from "react-geocode";
import axios from "axios";

class RideAdd extends Component {

    constructor(props) {
        super(props);
        this.onChangeRideStartTime = this.onChangeRideStartTime.bind(this);
        this.onChangeRideOrigin = this.onChangeRideOrigin.bind(this);
        this.onChangeRideDestination = this.onChangeRideDestination.bind(this);
        this.onChangePackagesAcceptation = this.onChangePackagesAcceptation.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);


        this.state = {
            mesg:"",
            currentUser: {},
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
            prixPerPlace: 0,
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

            startTimeError: "",
            originError: "",
            destinationError: "",
            nbrPlacesError: "",
            descriptionError: "",


            startTimeStyle: "",
            originStyle: "",
            destinationStyle: "",
            nbrPlacesStyle: "",
            descriptionStyle: "",


        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
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

    componentDidMount() {
        this.props.getCurrentUser();
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    onChangeRideStartTime = (date) => {
        const valueOfInput = date;
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


    validateForm() {

        let test = true;
        let formValid = true;
        let form = {...this.state};
        console.log('form',form)
        if (form.startTime < new Date()) {

            console.log(form.startTime)
            test = false;
            this.setState({startTimeError: "please select a valid date"});
            this.setState({startTimeStyle: "error"});
        } else {
            console.log(form.startTime)
            let date = new Date()
            console.log(date)

            this.setState({startTimeError: ""});
            this.setState({startTimeStyle: ""});
        }
        if (form.origin === '') {
            test = false;
            this.setState({originError: "select from where you will start"});
            this.setState({originStyle: "error"});
        } else {
            this.setState({originError: ""});
            this.setState({originStyle: ""});
        }
        if (form.destination === '') {
            test = false;
            this.setState({destinationError: "select where you will go"});
            this.setState({destinationStyle: "error"});
        } else {
            this.setState({destinationError: ""});
            this.setState({destinationStyle: ""});
        }
        if (form.nbrPlaces === '') {
            test = false;
            this.setState({nbrPlacesError: "please select places number"});
            this.setState({nbrPlacesStyle: "error"});
        } else {
            this.setState({nbrPlacesError: ""});
            this.setState({nbrPlacesStyle: ""});
        }
        if (form.nbrPlaces > 4) {
            test = false;
            this.setState({nbrPlacesError: "you can't pick more then 4 travellers"});
            this.setState({nbrPlacesStyle: "error"});
        }
        if (form.description==='') {
            test = false;
            this.setState({descriptionError: "please write a little description about the ride"});
            this.setState({descriptionStyle: "error"});
        }
        else {
            this.setState({descriptionError: ""});
            this.setState({descriptionStyle: ""});
        }


        console.log(test);

        console.log(formValid, 'test2')
        return test;
    }


    confirme(e) {

        e.preventDefault();
        const u = this.props.currentUser;
        let formValid = this.validateForm();
        //     const currentUser = jwt_decode(localStorage.getItem("jwtToken").User);
        console.log(this.props.currentUser._id, 'currentUser');
        console.log(this.props.currentUser, 'currentUser');
        console.log(this.state.startTime, 'date');
        if (this.props.currentUser._id) {

            if (formValid) {

                this.props.addRide({
                    startTime: this.state.startTime,
                    origin: this.state.origin,
                    destination: this.state.destination,
                    nbrPlaces: this.state.nbrPlaces,
                    description: this.state.description,
                    packageAllowed: this.state.packageAllowed,
                    prixPerPlace: this.state.prixPerPlace,
                    userId: this.props.currentUser._id,
                }, (path) => {  // callback 1: history push
                   // this.props.history.push(path);
                }, (path, state) => {
                  //  this.props.history.replace(path, state);
                });
                console.log('done jsx');
                this.props.history.push('/front/ride/myrides/');
                window.location.reload(false);
            }


        } else {
            this.props.history.push('/front/login');
        }
    }

    async componentWillMount() {

        await this.props.getCurrentUser();
        if (this.props.currentUser._id === undefined){
            this.props.history.push('/front/login');
        }else {

            if (this.props.currentUser.role !== 'DRIVER'){

                this.props.history.push('/front/ride/search');

            }

        }

    }


    render() {
        const {handleSubmit} = this.props;
        return (
            <>
            <AuthHeader title="Fill the form below to add your ride" lead=""/>
            <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
                            {this.renderAlert()}

                            <Form>

                                <Col lg="12">
                                    <div className="card-wrapper">
                                        <Card>
                                            <CardHeader>

                                                <h3 className="mb-0">Please Fill This Form carefully</h3>
                                            </CardHeader>

                                            <CardBody>
                                                <Col md="12">
                                                    <div className="form-wrapper">

                                                        <CardHeader>

                                                            <h3 className="mb-0">Form where to where you will take us :D</h3>
                                                        </CardHeader>
                                                        <br/>
                                                        <Row>
                                                            <Col md="6">
                                                                <FormGroup>
                                                                    <Label>From</Label>
                                                                    <InputGroup
                                                                        className="input-group-merge input-group-alternative mb-3"
                                                                        className={this.state.originStyle}
                                                                    >
                                                                    <PlacesAutocomplete inputValue={this.state.origin}
                                                                                        handleChange={this.onChangeRideOrigin}/>
                                                                    </InputGroup>

                                                                    <span className="errorText">{this.state.originError}</span>
                                                                </FormGroup>

                                                            </Col>
                                                            <Col md="6">
                                                                <FormGroup>
                                                                    <Label>To</Label>
                                                                    <InputGroup
                                                                        className="input-group-merge input-group-alternative mb-3"
                                                                        className={this.state.destinationStyle}
                                                                    >
                                                                    <PlacesAutocomplete inputValue={this.state.destination}
                                                                                        handleChange={this.onChangeRideDestination}/>
                                                                    </InputGroup>

                                                                    <span className="errorText">{this.state.destinationError}</span>

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

                                                            <h3 className="mb-0">Information About Your Ride(price will automatically calculated)</h3>
                                                        </CardHeader>
                                                        <br/>
                                                        <Row>
                                                            <Col md="6">



                                                                <FormGroup>

                                                                    <InputGroup
                                                                        className="input-group-merge input-group-alternative mb-3"
                                                                        className={this.state.startTimeStyle}
                                                                    >
                                                                        <ReactDatetime
                                                                            inputProps={{
                                                                                placeholder: "strat time: " + this.state.startTime
                                                                            }}
                                                                            timeFormat={true}
                                                                            selected={this.state.startTime}
                                                                            onChange={this.onChangeRideStartTime}
                                                                            showTimeSelect
                                                                        />
                                                                    </InputGroup>



                                                                    <span className="errorText">{this.state.startTimeError}</span>

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
                                                                        className="input-group-merge input-group-alternative mb-3"
                                                                        className={this.state.nbrPlacesStyle}
                                                                    >
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText>
                                                                                <i className="fas fa-user"/>
                                                                            </InputGroupText>
                                                                        </InputGroupAddon>
                                                                        <Input
                                                                            placeholder="Places Number Max 4"
                                                                            id="standard-start-adornment"
                                                                            value={this.state.nbrPlaces}
                                                                            onChange={event => this.handleChange('nbrPlaces', event.target.value)}
                                                                        />
                                                                    </InputGroup>
                                                                    <span className="errorText">{this.state.nbrPlacesError}</span>

                                                                </FormGroup>

                                                                <FormGroup>
                                                                    <Label>Price per place</Label>
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
                                                                            placeholder={this.prixPerPlace}
                                                                            id="standard-start-adornment"
                                                                            value={this.state.prixPerPlace}
                                                                            onChange={event => this.handleChange('prixPerPlace', event.target.value)}
                                                                            // onChange={this.onChangePrice()}
                                                                        />
                                                                    </InputGroup>
                                                                </FormGroup>

                                                            </Col>

                                                            <Col md="6">

                                                                <CardHeader>

                                                                    <h3 className="mb-0">Total Price: {this.state.prixPerPlace * this.state.nbrPlaces} DT </h3>
                                                                </CardHeader>


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
                                                                    <InputGroup
                                                                        className="input-group-merge input-group-alternative mb-3"
                                                                        className={this.state.descriptionStyle}
                                                                    >
                                                                    <Input
                                                                        id="exampleFormControlTextarea1"
                                                                        rows="3"
                                                                        type="textarea"
                                                                        value={this.state.description}
                                                                        onChange={event => this.handleChange('description', event.target.value)}
                                                                    />
                                                                    </InputGroup>
                                                                    <span className="errorText">{this.state.descriptionError}</span>

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

RideAdd = reduxForm({
    form: 'post_new',
})(RideAdd);

function mapStateToProps(state) {
    return {
        currentUser: state.auth.currentUser,
    }
}
export default connect(mapStateToProps, {addRide, getCurrentUser})(RideAdd);
