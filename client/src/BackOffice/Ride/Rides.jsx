import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {deleteRide, getRides} from "../../services/Rides/RideAction";
import Pagination from "../../FrontOffice/Ride/Pagination";
import AuthHeader from "../../components/Headers/AuthHeader";
import {
    Badge, Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader, Col,
    Container, Form,
    FormGroup,
    InputGroup,
    InputGroupAddon, InputGroupText,
    Row, Table
} from "reactstrap";
import classnames from "classnames";
import Input from "reactstrap/es/Input";
import searchRide from "../../FrontOffice/Ride/searchFunction";
import ReactDatetime from "react-datetime";
import Moment from "moment";
import {Link} from "react-router-dom";
import _ from "lodash";


class Rides extends Component {

    state = {
        all:[],
        pageSize: 5,
        currentPage: 1,
        searchFilter: '',
        searchFilter2: "",
        searchFilter3: new Date(),
        rating: 0
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                all: nextProps.all,
            });
        }
    }

    async componentWillMount() {

        await this.props.getRides();

    }



    onChangeRideStartTime = (date) => {
        const valueOfInput = date.format();
        this.setState({searchFilter3: valueOfInput, currentPage: 1});
    };

    handleChange = (name, value) => {
        this.setState({[name]: value, currentPage: 1});
    }
    onPageChange = (page) => {
        this.setState({currentPage: page});
    }

    deleteHandler(e, elementId) {
        console.log(elementId)
        e.preventDefault();
        this.props.deleteRide(elementId);
    }

    render() {
        const {
            currentPage,
            searchFilter,
            searchFilter2,
            searchFilter3,
            pageSize
        } = this.state;
        const {rides} = this.props;
        let filteredRides = [];
        let all = this.state.all;

        filteredRides = searchRide(all, searchFilter, searchFilter2, searchFilter3, "origin", "destination","startTime");
        filteredRides = filteredRides.slice((currentPage - 1) * pageSize, pageSize * currentPage);
        return (
            <div style={{padding:25}}>
                <h2>Rides List</h2>
                    <Row className="justify-content-center">


                        <Col lg="12">
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>

                                        <h3 className="mb-0">Use the search inputs to look for what you need</h3>
                                    </CardHeader>

                                    <CardBody>
                                        <Col md="12">

                                            <Row>
                                                <Col md="4">
                                                    <FormGroup>
                                                        <InputGroup
                                                            className={classnames("input-group-merge", {
                                                                focused: this.state.location
                                                            })}
                                                        >
                                                            <Input
                                                                onChange={event => this.handleChange('searchFilter', event.target.value)}

                                                                placeholder="From"
                                                                type="text"
                                                            />
                                                            <InputGroupAddon addonType="append">
                                                                <InputGroupText>
                                                                    <i className="fas fa-map-marker" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <InputGroup
                                                            className={classnames("input-group-merge", {
                                                                focused: this.state.location
                                                            })}
                                                        >
                                                            <Input
                                                                onChange={event => this.handleChange('searchFilter2', event.target.value)}

                                                                placeholder="To"
                                                                type="text"
                                                            />
                                                            <InputGroupAddon addonType="append">
                                                                <InputGroupText>
                                                                    <i className="fas fa-map-marker" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>

                                                        <ReactDatetime
                                                            inputProps={{
                                                                placeholder: "Start time"
                                                            }}
                                                            timeFormat={true}
                                                            selected={this.state.searchFilter3}
                                                            onChange={this.onChangeRideStartTime}
                                                            showTimeSelect
                                                        />

                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <CardBody>
                                                <Col md="12">

                                                    <Table responsive>
                                                        <thead>
                                                        <tr>
                                                            <th>Start Time</th>
                                                            <th>From</th>
                                                            <th>To</th>
                                                            <th width={10}>Places</th>
                                                            <th width={10}>Places Available</th>
                                                            <th width={10}>confirmed</th>

                                                            <th>price</th>
                                                            <th>package</th>
                                                            <th>total</th>

                                                            <th>Action</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>

                                                        {!!all
                                                        && filteredRides.map(ride => (
                                                            <Fragment key={ride._id}>
                                                                <tr>
                                                                    <td>
                                                                        {Moment(ride.startTime).format('LLL')}
                                                                    </td>
                                                                    <td>{ride.origin}</td>
                                                                    <td>{ride.destination}</td>
                                                                    <td>
                                                                        <Badge color="warning" pill >{ride.nbrPlaces}</Badge>
                                                                    </td>
                                                                    <td>
                                                                        <Badge color="warning" pill>{ride.nbrPlaces - _.map(ride.travelers, traveler => {
                                                                        }).length}</Badge>
                                                                    </td>
                                                                    <td>
                                                                        <Badge color="success" pill >{ride.placeConfirmed}</Badge>
                                                                    </td>
                                                                    <td>
                                                                        <Badge color="info">{ride.prixPerPlace} DT</Badge>
                                                                    </td>
                                                                    <td>        {
                                                                        ride.packageAllowed ? <Badge color="success">YES</Badge>
                                                                            : <Badge color="danger">NO</Badge>
                                                                    }</td>
                                                                    <td>
                                                                        <Badge color="info">{ride.total} DT</Badge>
                                                                    </td>
                                                                    <td>
                                                                        <Link to={`/front/ride/details/${ride._id}`}>
                                                                            <Button style={{marginRight: 2}}
                                                                                    className="btn-icon-only rounded-circle"
                                                                                    color="slack"
                                                                                    type="button"
                                                                            >
                                                                    <span className="btn-inner--icon">
                                                                    <i className="fab fa fa-eye" />
                                                                    </span>
                                                                            </Button>
                                                                        </Link>

                                                                        <Button
                                                                            onClick={e => this.deleteHandler(e, ride._id)}
                                                                            className="btn-icon-only rounded-circle"
                                                                            color="pinterest"
                                                                            type="button"
                                                                        >
                                                                    <span className="btn-inner--icon">
                                                                    <i className="fab fa fa-trash" />
                                                                    </span>
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            </Fragment>
                                                        ))}
                                                        </tbody>
                                                    </Table>
                                                    <Pagination
                                                        itemsCount={all.length}
                                                        pageSize={pageSize}
                                                        onPageChange={this.onPageChange}
                                                        currentPage={currentPage}
                                                    />

                                                </Col>
                                            </CardBody>

                                        </Col>
                                    </CardBody>

                                </Card>
                            </div>
                        </Col>


                    </Row>
            </div>



        );
    }
}

const mapStateToProps = state => {

    return {
        all: state.rides.all,
    }
}

export default connect(mapStateToProps, {getRides,deleteRide})(Rides);
