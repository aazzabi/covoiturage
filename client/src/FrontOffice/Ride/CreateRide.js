import React, {Component, useCallback} from "react";
import axios from 'axios';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input, Col, Row, CardBody, Card, CardHeader, Container
} from 'reactstrap';
import AuthHeader from "../../components/Headers/AuthHeader";
import MapWithASearchBox from './Map.jsx';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ReactDatetime from "react-datetime";
import Geocode from "react-geocode";

import PlacesAutocomplete from "../Parcels/GAutoComplete";

export default class CreateRide extends Component {


    constructor(props) {


        super(props);
        this.onChangeParcelType = this.onChangeParcelType.bind(this);
        this.onChangeParcelPrice = this.onChangeParcelPrice.bind(this);
        this.onChangeParcelWeight = this.onChangeParcelWeight.bind(this);
        this.onChangeParcelDescription = this.onChangeParcelDescription.bind(this);

        this.handleOptionChange = this.handleOptionChange.bind(this);
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
            packageAllowed: "",
            originInfo:[
                {
                    lat:"",
                    lng:""
                }
            ],
            destinationInfo:[
                {
                    lat:"",
                    lng:""
                }
            ]

        }
    }



    onChangeParcelType = (date) => {
        const valueOfInput = date.format();
        this.setState({startTime: valueOfInput});
    };

    onChangeParcelPrice(e) {
        Geocode.setApiKey("AIzaSyDtJlOlL_sZhchii9wg4A6yi7vZutilBeg");

        this.setState({origin: e.target.value});
        Geocode.fromAddress(e.target.value).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({
                    originInfo:[lat,lng]
                });
            },
            error => {
                console.error(error);
            }
        );
    }

    onChangeParcelWeight(e) {

        this.setState({destination: e.target.value})
        Geocode.fromAddress(e.target.value).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({
                    destinationInfo:[lat,lng]
                });
            },
            error => {
                console.error(error);
            }
        );
    }


    handleOptionChange(e) {
        this.setState({nbrPlaces: e.target.value})

    }

    onChangeParcelDescription(e) {
        this.setState({description: e.target.value})
    }

    filterLocationdeparture = (e) => {
        this.setState({packageAllowed: e.target.value});

    }




    onSubmit(e) {
        e.preventDefault()
        const parcel = {
            status: this.state.status,
            startTime: this.state.startTime,
            origin: this.state.origin,
            destination: this.state.destination,
            nbrPlaces: this.state.nbrPlaces,
            packageAllowed: this.state.packageAllowed,
            description: this.state.description,
        };
        console.log(parcel);
        axios.post('http://localhost:3000/ride/add/5e84d3139dad8723148ca271', parcel);

        // this.setState({title: '', type: '', price: '', weight: '', size: '', description: ''})
    }

    onPlaceSelected = (place) => {
        console.log('plc', place);
        const latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
        // Set these values in the state.
        this.setState({
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        origin: place.target.value
        })
    };

    render() {
        return (
            <>
                <AuthHeader title="Choose the best plan for your business" lead=""/>
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center">
                        <Col lg="8">
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>

                                        <h3 className="mb-0">Add Parcels </h3>
                                    </CardHeader>

                                    <CardBody>
                                        <Col md="8">
                                            <div className="form-wrapper">
                                                <Form onSubmit={this.onSubmit}>
                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <Label>start time</Label>
                                                                <ReactDatetime
                                                                    inputProps={{
                                                                        placeholder: "Date Picker Here"
                                                                    }}
                                                                    timeFormat={true}
                                                                    selected={this.state.startTime}
                                                                    value={this.state.status}
                                                                    onChange={this.onChangeParcelType}
                                                                    showTimeSelect
                                                                />

                                                            </FormGroup>

                                                        </Col>
                                                        <Col md="6">

                                                            <FormGroup>
                                                                <Label>packageAllowed</Label>
                                                                <Input type="packageAllowed" value={this.state.packageAllowed}
                                                                       onChange={this.filterLocationdeparture}/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <TextField
                                                                    label="nbrPlaces"
                                                                    id="standard-start-adornment"
                                                                    value={this.state.nbrPlaces}
                                                                    onChange={this.handleOptionChange}
                                                                    InputProps={{
                                                                        startAdornment: <InputAdornment
                                                                            position="start">Kg</InputAdornment>,
                                                                    }}
                                                                />
                                                            </FormGroup>


                                                        </Col>
                                                        <Label>From</Label>
                                                        <PlacesAutocomplete inputValue={this.state.origin}
                                                                            handleChange={this.onChangeParcelPrice}/>
                                                        <Label>To</Label>

                                                        <PlacesAutocomplete inputValue={this.state.destination}
                                                                            handleChange={this.onChangeParcelWeight}/>


                                                    </Row>
                                                    <MapWithASearchBox origin={this.state.originInfo} destination={this.state.destinationInfo}>
                                                    </MapWithASearchBox>
                                                    <Button type="submit">
                                                        Create Parcel
                                                    </Button>
                                                </Form>
                                            </div>
                                        </Col>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>
                                    </CardHeader>
                                    <CardBody>
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
                                                onChange={this.onChangeParcelDescription}
                                            />
                                        </FormGroup>

                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

}
