import React, {Component, useCallback} from "react";
import axios from 'axios';
import {
    Button,
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
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
import {connect} from "react-redux";
import {addClaim} from "../../services/Claims/ClaimsAction";
import {getCurrentUser} from "../../actions/authActions";
class CreateParcel extends Component {

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
            titleError:"",
            titleStyle:"",
            type: "",
            typeError:"",
            typeStyle:"",
            price: "",
            priceError:"",
            priceStyle:"",
            weight: "",
            weightError:"",
            weightStyle:"",
            size: "",
            sizeError:"",
            sizeStyle:"",

            description: "",
            descriptionError:"",
            descriptionStyle:"",

            departure: "",
            departureError:"",
            departureStyle:"",
            arrival: "",
            arrivalError:"",
            fileError:"",
            currentUser: {},
            files: [],

        }
    }


    validateForm() {

        let test = true;
        let formValid = true;
        let form = {...this.state};
        console.log('form',form)

        if (form.title === '') {
            test = false;
            this.setState({titleError: "please select a title"});
            this.setState({titleStyle: "error"});
        } else {
            this.setState({titleError: ""});
            this.setState({titleStyle: ""});
        }
        if (form.type === '') {
            test = false;
            this.setState({typeError: "please select a type"});
            this.setState({typeStyle: "error"});
        } else {
            this.setState({typeError: ""});
            this.setState({typeStyle: ""});
        }
        if (form.price === '') {
            test = false;
            this.setState({priceError: "please select the price for your parcel"});
            this.setState({priceStyle: "error"});
        } else {
            this.setState({priceError: ""});
            this.setState({priceStyle: ""});
        }
        if (form.weight === '') {
            test = false;
            this.setState({weightError: "please select your parcel weight"});
            this.setState({weightStyle: "error"});
        }
        else {
            this.setState({weightError: ""});
            this.setState({weightStyle: ""});
        }

        if (form.size==='') {
            test = false;
            this.setState({sizeError: "please select your parcel size"});
            this.setState({sizeStyle: "error"});
        }

        else {
            this.setState({sizeError: ""});
            this.setState({sizeStyle: ""});
        }

        if (form.departure==='') {
            test = false;
            this.setState({departureError: "please select your sending location"});
            this.setState({departureStyle: "error"});
        }

        else {
            this.setState({departureError: ""});
            this.setState({departureStyle: ""});
        }

        if (form.description==='') {
            test = false;
            this.setState({descriptionError: "please write a little description about the parcel"});
            this.setState({descriptionStyle: "error"});
        }

        else {
            this.setState({descriptionError: ""});
            this.setState({descriptionStyle: ""});
        }

        if (form.arrival==='') {
            test = false;
            this.setState({arrivalError: "please select where tou want to send your parcel"});
            this.setState({arrivalStyle: "error"});
        }

        else {
            this.setState({arrivalError: ""});
            this.setState({arrivalStyle: ""});
        }

        // if (!form.file) {
        //     test = false;
        //     this.setState({fileError: "upload at least 1 picture"});
        //     this.setState({arrivalStyle: "error"});
        // }
        //
        // else {
        //     this.setState({arrivalError: ""});
        //     this.setState({arrivalStyle: ""});
        // }


        console.log(test);

        console.log(formValid, 'test2')
        return test;
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

        let formValid = this.validateForm();

        if (formValid){

            const parcel = {
                title: this.state.title,
                type: this.state.type,
                price: this.state.price,
                weight: this.state.weight,
                size: this.state.size,
                departure: this.state.departure,
                arrival: this.state.arrival,
                description: this.state.description,
                files: this.state.files,
                sender: this.props.currentUser._id
            };
            console.log(parcel);
            axios.post('http://localhost:3000/packages/add', parcel)
                .then(res => {
                    this.props.history.push("/front/parcels/all");
                    console.log(this.props.currentUser._id)
                })
                .catch(err => console.log(err));
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                currentUser: nextProps.currentUser,
            });
        }
    }
    componentDidMount() {
        this.props.getCurrentUser();
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
                                                                <InputGroup
                                                                    className="input-group-merge input-group-alternative mb-3"
                                                                    className={this.state.titleStyle}
                                                                >

                                                                <Input type="text" value={this.state.title}
                                                                       onChange={this.onChangeParceltitle}/>
                                                                </InputGroup>
                                                                <span style={{color:'red'}} className="errorText">{this.state.titleError}</span>
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
                                                            <span style={{color:'red'}} className="errorText">{this.state.typeError}</span>

                                                        </Col>
                                                        <Col md="6">

                                                            <FormGroup>
                                                                <Label>price</Label>
                                                                <Input type="price" value={this.state.price}
                                                                       onChange={this.onChangeParcelPrice}/>
                                                                <span style={{color:'red'}} className="errorText">{this.state.priceError}</span>

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
                                                                <span style={{color:'red'}} className="errorText">{this.state.weightError}</span>

                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="12">

                                                            <FormGroup>
                                                                <Label>From</Label>

                                                                <PlacesAutocomplete inputValue={this.state.arrival}
                                                                                    handleChange={this.filterLocationarrival}/>
                                                                <span style={{color:'red'}} className="errorText">{this.state.arrivalError}</span>

                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label>To</Label>

                                                                <PlacesAutocomplete inputValue={this.state.departure}
                                                                                    handleChange={this.filterLocationdeparture}/>
                                                                <span style={{color:'red'}} className="errorText">{this.state.departureError}</span>

                                                            </FormGroup>

                                                        </Col>


                                                    </Row>
                                                    <img
                                                        alt="..."
                                                        width={480}
                                                        height={300}
                                                        src={require("../../assets/img/parcel.png")}
                                                    />
                                                    <Row>
                                                        <Col md="4" sm="6">
                                                            <FormGroup>
                                                                <div className="custom-control custom-radio mb-3">
                                                                    <input
                                                                        className="custom-control-input"
                                                                        //defaultChecked
                                                                        id="customRadio5"
                                                                        name="custom-radio-1"
                                                                        type="radio"
                                                                        value="S"
                                                                        //checked={this.handleOptionChange}
                                                                        onChange={this.handleOptionChange}
                                                                    />
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor="customRadio5"
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
                                                                        //defaultChecked
                                                                        id="customRadio7"
                                                                        name="custom-radio-1"
                                                                        type="radio"
                                                                        value="M"
                                                                        //checked={this.state.size === 'medium'}
                                                                        onChange={this.handleOptionChange}
                                                                    />
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor="customRadio7"
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
                                                                        //defaultChecked
                                                                        id="customRadio6"
                                                                        name="custom-radio-1"
                                                                        type="radio"
                                                                        value="L"
                                                                        onChange={this.handleOptionChange}

                                                                    />
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor="customRadio6"
                                                                    >
                                                                        Large
                                                                    </label>
                                                                </div>

                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="3" sm="6">

                                                        </Col>

                                                        <span style={{color:'red'}} className="errorText">{this.state.sizeError}</span>

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
                                            <span style={{color:'red'}} className="errorText">{this.state.fileError}</span>

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
                                            <span style={{color:'red'}} className="errorText">{this.state.descriptionError}</span>

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

function mapStateToProps(state) {
    return {
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps, {getCurrentUser})(CreateParcel);
