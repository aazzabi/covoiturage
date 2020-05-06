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
import axios from "axios";
import AuthHeader from "../../components/Headers/AuthHeader";
import PlacesAutocomplete from "../Parcels/GAutoComplete";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {DropzoneArea} from "material-ui-dropzone";
import {EditPackage, getParcel} from "../../actions/Parcels/PackagesActions";

class EditPackagePage extends Component {

    constructor(props) {
        super(props);
        this.onChangeParceltitle = this.onChangeParceltitle.bind(this);

        this.onChangeParcelType = this.onChangeParcelType.bind(this);
        this.onChangeParcelPrice = this.onChangeParcelPrice.bind(this);
        this.onChangeParcelWeight = this.onChangeParcelWeight.bind(this);
        this.onChangeParcelDescription = this.onChangeParcelDescription.bind(this);

        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.state = {
            parcel: {},
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

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                parcel: nextProps.parcel,
                currentUser: nextProps.currentUser,
            });
        }
    }

    async componentWillMount() {
        await this.props.getCurrentUser();


        if (this.props.currentUser._id === undefined){
            this.props.history.push('/front/login');
        }else {
            await this.props.getParcel(this.props.match.params.id);

            console.log(this.props.parcel.sender._id)
            console.log(this.props.currentUser._id)

            if (this.props.currentUser._id !== this.props.parcel.sender._id){

                this.props.history.push('/front/parcels/all/');

            }
            else{

                console.log(this.props, 'props');
                this.setState({
                    title: this.props.parcel.title,
                    type: this.props.parcel.type,
                    price: this.props.parcel.price,
                    weight: this.props.parcel.weight,
                    size: this.props.parcel.size,
                    description: this.props.parcel.description,
                    departure: this.props.parcel.departure,
                    arrival: this.props.parcel.arrival,
                    files: this.props.parcel.files,
                })

            }

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


    confirme(e) {
        e.preventDefault();

        //console.log(this.props.currentUser._id, 'currentUser');
        console.log(this.props.parcel);

                this.props.EditPackage({
                    title: this.state.title,
                    type: this.state.type,
                    price: this.state.price,
                    weight: this.state.weight,
                    size: this.state.size,
                    description: this.state.description,
                    departure: this.state.departure,
                    arrival: this.state.arrival,
                    files: this.state.files,
                    packageId:this.props.match.params.id,
                }, (path) => {  // callback 1: history push
                    this.props.history.push(path);
                }, (path, state) => {
                    this.props.history.replace(path, state);
                });
                console.log('done jsx');
                //this.props.history.push('/front/login');

    }

    render() {
        const {handleSubmit} = this.props;
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
                                                <Form>
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
                                                    <Button type="submit" onClick={e => this.confirme(e)}>
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

EditPackagePage = reduxForm({
    validate,
    form: 'package_edit',  // name of the form
    enableReinitialize : true // you need to add this property
})(EditPackagePage);

function mapStateToProps(state) {
    return {
        parcel: state.pack.parcel,
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps, {getCurrentUser, getParcel, EditPackage})(EditPackagePage);
