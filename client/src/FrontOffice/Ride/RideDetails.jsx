import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthHeader from "../../components/Headers/AuthHeader";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup, Input,
    InputGroup,
    InputGroupAddon, InputGroupText,
    Label,
    Row
} from "reactstrap";
import {fetchRideById} from "../../actions/Rides/RidesActions";
import axios from "axios";
import ReactDatetime from "react-datetime";
import classnames from "classnames";
import PlacesAutocomplete from "../Parcels/GAutoComplete";
import MapWithASearchBox from "./Map";

class RideDetails extends Component {


    constructor(props) {
        super(props);
        this.onChangePrice = this.onChangePrice.bind(this);

        this.state = {
            prixPerPlace: this.props.parcel.prixPerPlace
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchRideById(id);
        console.log(this.props)
    }

    onChangePrice(e) {
        this.setState({prixPerPlace: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()
        const parcel = this.props.parcel;
        const parcels = {
            prixPerPlace: "20"
        };

        axios.put(`http://localhost:3000/ride/edit/5e9dc5ea8066f43c8c1f7752`, parcels)
            .then(res => {
                console.log(res);
                console.log(res.data._id);
                console.log(res.data.prixPerPlace);
                //this.props.history.push('myride/'+res.data._id);
            })
    }


    render() {
        const parcel = this.props.parcel;

        return (<>
                <AuthHeader title="Choose the best plan for your business" lead=""/>
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center"><Row>
                        <div className="col"><Card>
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Packages List</h3>
                            </CardHeader>
                            <CardBody>
                                {this.prixPerPlace = parcel.prixPerPlace}
                                {parcel.prixPerPlace}

                                {parcel._id}
                            </CardBody>

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

                                                        <CardHeader>

                                                            <h3 className="mb-0">Form where to where you will take us :D</h3>
                                                        </CardHeader>
                                                        <br/>

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
                                                                        placeholder={this.prixPerPlace}
                                                                        value={this.state.prixPerPlace}
                                                                        onChange={this.onChangePrice}
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
                        </Card>
                        </div>
                    </Row>
                    </Row></Container>
            </>
        );
    }
}

const mapStateToProps = state => ({
    parcel: state.parcel
});
const mapDispatchToProps = (dispatch) => {
    return {
        fetchRideById: id => dispatch(fetchRideById(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RideDetails);
