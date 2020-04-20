import React, {Component} from "react";
import axios from 'axios';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input, Col, Row, CardBody, Card, CardHeader, Container, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import AuthHeader from "../../components/Headers/AuthHeader";
import MapWithASearchBox from './Map.jsx';
import ReactDatetime from "react-datetime";
import Geocode from "react-geocode";

import PlacesAutocomplete from "../Parcels/GAutoComplete";
import classnames from "classnames";
import {fetchRideById} from "../../actions/Rides/RidesActions";


export default class CreateRide extends Component {


    constructor(props) {


        super(props);
        this.onChangeRideStartTime = this.onChangeRideStartTime.bind(this);
        this.onChangeRideOrigin = this.onChangeRideOrigin.bind(this);
        this.onChangeRideDestination = this.onChangeRideDestination.bind(this);
        this.onChangeRidePlacesNumber = this.onChangeRidePlacesNumber.bind(this);
        this.onChangeRideDescription = this.onChangeRideDescription.bind(this);
        this.onChangePackagesAcceptation = this.onChangePackagesAcceptation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
            ]

        }
    }


    onChangeRideStartTime = (date) => {
        const valueOfInput = date.format();
        this.setState({startTime: valueOfInput});
    };

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
    }


    onChangeRidePlacesNumber(e) {
        this.setState({nbrPlaces: e.target.value})

    }

     onChangePrice() {

        // if (this.state.origin && this.state.destination){
        //
        //     const result = axios.get('http://localhost:3000/ride/price/' + this.state.origin + '/' + this.state.destination);
        //
        //     result.then((data) => {
        //
        //         console.log(JSON.stringify(data));
        //         if (JSON.stringify(data)){
        //             this.setState({prixPerPlace: JSON.stringify(data.data)});
        //             console.log(this.prixPerPlace);
        //         }
        //     }).catch(err =>{
        //
        //         this.setState({prixPerPlace: 0});
        //
        //     });
        // }

    }

    onChangeRideDescription(e) {
        this.setState({description: e.target.value})
    }

    onChangePackagesAcceptation = () => {
        this.setState({
            packageAllowed: !this.state.packageAllowed,
        });

    }


     onSubmit(e) {
        e.preventDefault()
        const parcel = {
            status: this.state.status,
            startTime: this.state.startTime,
            destination: this.state.destination,
            nbrPlaces: this.state.nbrPlaces,
            packageAllowed: this.state.packageAllowed,
            description: this.state.description,
            origin: this.state.origin,

        };
         // axios.post('http://localhost:3000/ride/add/5e77726fe79f4c2ef0080397', parcel);
         //
         // console.log(parcel);

         axios.post(`http://localhost:3000/ride/add/5e77726fe79f4c2ef0080397`, parcel)
             .then(res => {
                 console.log(res);
                 console.log(res.data._id);
                 this.props.history.push('myride/'+res.data._id);
             })

        // fetch('http://localhost:3000/ride/add/5e77726fe79f4c2ef0080397', parcel).then(response => response.json())
        // console.log(parcel);



    }

    render() {

        return (
            <>
                <AuthHeader title="Choose the best plan for your business" lead=""/>
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center">
                        <Form onSubmit={this.onSubmit}>

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

                                                        <h3 className="mb-0">Information About Your Ride(price will automatically calculated)</h3>
                                                    </CardHeader>
                                                    <br/>
                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <ReactDatetime
                                                                    inputProps={{
                                                                        placeholder: "Start time"
                                                                    }}
                                                                    timeFormat={true}
                                                                    selected={this.state.startTime}
                                                                   // value={this.state.status}
                                                                    onChange={this.onChangeParcelType}
                                                                    showTimeSelect
                                                                />
                                                            </FormGroup>


                                                            <FormGroup>
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
                                                                        value={this.state.nbrPlaces}
                                                                        onChange={this.onChangeRidePlacesNumber}
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
                                                                <PlacesAutocomplete inputValue={this.state.origin}
                                                                                    handleChange={this.onChangeRideOrigin}/>
                                                            </FormGroup>

                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label>To</Label>

                                                                <PlacesAutocomplete inputValue={this.state.destination}
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
                                                                    id="exampleFormControlTextarea1"
                                                                    rows="3"
                                                                    type="textarea"
                                                                    value={this.state.description}
                                                                    onChange={this.onChangeRideDescription}
                                                                />
                                                            </FormGroup>
                                                            <br/>
                                                            <Row className="justify-content-center">
                                                                <Button type="submit">
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
