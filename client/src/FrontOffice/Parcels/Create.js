import React, {Component, useCallback} from "react";
import axios from 'axios';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input, Col, Row, CardBody, Card, CardHeader, Container
} from 'reactstrap';
import PlacesAutocomplete from "./GAutoComplete";
import AuthHeader from "../../components/Headers/AuthHeader";

import {DropzoneArea, DropzoneDialog} from 'material-ui-dropzone'
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Redirect} from "react-router";

export default class CreateParcel extends Component {

    constructor(props) {
        super(props);
        this.onChangeParceltitle = this.onChangeParceltitle.bind(this);

        this.onChangeParcelType = this.onChangeParcelType.bind(this);
        this.onChangeParcelPrice = this.onChangeParcelPrice.bind(this);
        this.onChangeParcelWeight = this.onChangeParcelWeight.bind(this);
        this.onChangeParcelDescription = this.onChangeParcelDescription.bind(this);

        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            title: "",
            type: "",
            price: "",
            weight: "",
            size: "",
            description: "",
            departure: "",
            arrival: "",
            files: [],

        }
    }

    onChangeParceltitle(e) {
        this.setState({title: e.target.value})
    }

    onChangeParcelType(e) {
        this.setState({type: e.target.value})
    }

    onChangeParcelPrice(e) {
        this.setState({price: e.target.value})
    }

    onChangeParcelWeight(e) {
        this.setState({weight: e.target.value})
    }


    handleOptionChange(e) {
        this.setState({size: e.target.value})

    }

    onChangeParcelDescription(e) {
        this.setState({description: e.target.value})
    }

    filterLocationdeparture = (e) => {
        this.setState({departure: e.target.value});

    }
    filterLocationarrival = (e) => {
        this.setState({arrival: e.target.value});
    }

    handleSave(files) {
        const data = new FormData()
        for (var x = 0; x < files.length; x++) {
            data.append('file', files[x])
            this.setState({files: [files[x].name]})
        }
        console.log(data)

        axios.post('http://localhost:3000/upload',
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(function () {
            console.log('SUCCESS!!');
        })
            .catch(function () {
                console.log('FAILURE!!');
            });

    }

    onSubmit(e) {
        e.preventDefault()
        const parcel = {
            title: this.state.title,
            type: this.state.type,
            price: this.state.price,
            weight: this.state.weight,
            size: this.state.size,
            departure: this.state.departure,
            arrival: this.state.arrival,
            description: this.state.description,
            files: this.state.files
        };
        console.log(parcel);
        axios.post('http://localhost:3000/packages/add', parcel)
    .then(res => {
            this.setState({title: '', type: '', price: '', weight: '', size: '', description: ''})
            this.props.history.push("/front/parcels");
        })
            .catch(err => console.log(err));
    }


    render() {
        return (
            <>
                <AuthHeader title="Add Parcels" lead=""/>
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
                                                                <Label>Title</Label>
                                                                <Input type="text" value={this.state.title}
                                                                       onChange={this.onChangeParceltitle}/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <InputLabel
                                                                    id="demo-simple-select-label">Type</InputLabel>
                                                                <Select
                                                                    label="Parcel Type"
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={this.state.type}
                                                                    onChange={this.onChangeParcelType}>
                                                                    <MenuItem value={"DOCUMENT"}>DOCUMENT</MenuItem>
                                                                    <MenuItem value={"CLOTHES"}>CLOTHES</MenuItem>
                                                                    <MenuItem value={"GLASS"}>GLASS</MenuItem>
                                                                    <MenuItem value={"MEDICINE"}>MEDICINE</MenuItem>
                                                                    <MenuItem value={"MONEY"}>MONEY</MenuItem>
                                                                    <MenuItem value={"OTHER"}>OTHER</MenuItem>
                                                                </Select>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">

                                                            <FormGroup>
                                                                <Label>price</Label>
                                                                <Input type="price" value={this.state.price}
                                                                       onChange={this.onChangeParcelPrice}/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <TextField
                                                                    label="Weight"
                                                                    id="standard-start-adornment"
                                                                    value={this.state.weight}
                                                                    onChange={this.onChangeParcelWeight}
                                                                    InputProps={{
                                                                        startAdornment: <InputAdornment
                                                                            position="start">Kg</InputAdornment>,
                                                                    }}
                                                                />
                                                            </FormGroup>


                                                        </Col>
                                                        <Label>From</Label>
                                                        <PlacesAutocomplete inputValue={this.state.arrival}
                                                                            handleChange={this.filterLocationarrival}/>
                                                        <Label>To</Label>

                                                        <PlacesAutocomplete inputValue={this.state.departure}
                                                                            handleChange={this.filterLocationdeparture}/>
                                                    </Row>
                                                    <img
                                                        alt="..."
                                                        width={480}
                                                        height={300}
                                                        // src={require("../../assets/img/parcel.png")}
                                                    />
                                                    <Row>
                                                        <Col md="4" sm="6">
                                                            <FormGroup>
                                                                <div className="custom-control custom-radio mb-3">
                                                                    <input
                                                                        className="custom-control-input"
                                                                        id="customRadio1"
                                                                        name="custom-radio-1"
                                                                        type="radio"
                                                                        value="S"
                                                                        checked={this.state.size === 'Small'}
                                                                        onChange={this.handleOptionChange}
                                                                    />
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor="customRadio1"
                                                                    >
                                                                        Small
                                                                    </label>
                                                                </div>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="4" sm="6">
                                                            <FormGroup>
                                                                <div className="custom-control custom-radio mb-3">
                                                                    <input
                                                                        className="custom-control-input"
                                                                        id="customRadio2"
                                                                        name="custom-radio-2"
                                                                        type="radio"
                                                                        value="M"
                                                                        checked={this.state.size === 'medium'}
                                                                        onChange={this.handleOptionChange}
                                                                    />
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor="customRadio2"
                                                                    >
                                                                        Medium
                                                                    </label>
                                                                </div>

                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="3" sm="6">
                                                            <FormGroup>
                                                                <div className="custom-control custom-radio mb-3">
                                                                    <input
                                                                        className="custom-control-input"
                                                                        id="customRadio3"
                                                                        name="custom-radio-3"
                                                                        type="radio"
                                                                        value="L"
                                                                        checked={this.state.size === 'Large'}
                                                                        onChange={this.handleOptionChange}
                                                                    />
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor="customRadio3"
                                                                    >
                                                                        Large
                                                                    </label>

                                                                </div>

                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="3" sm="6">

                                                        </Col>
                                                    </Row>
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
                                        <h3 className="mb-0">Image Dropzone</h3>

                                        <div>
                                            <DropzoneArea
                                                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                                maxFileSize={5000000}
                                                onChange={this.handleSave.bind(this)}
                                                filesLimit={1}
                                            />
                                        </div>
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
