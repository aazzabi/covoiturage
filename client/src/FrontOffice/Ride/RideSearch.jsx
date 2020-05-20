import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {getRides} from "../../services/Rides/RideAction";
import PaginationsComp from "./Pagination";
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
import RideTable from "./RidesTable";
import searchRide from "./searchFunction";
import ReactDatetime from "react-datetime";


class RideSearch extends Component {

    state = {
        pageSize: 10,
        currentPage: 1,
        searchFilter: '',
        searchFilter2: "",
        searchFilter3: new Date(),
        rating: 0
    };

    componentDidMount() {
        this.props.getRides();
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
        filteredRides = searchRide(rides, searchFilter, searchFilter2, searchFilter3, "origin", "destination","startTime");
        return (
            <>
                <AuthHeader title="Available Rides" lead=""/>
                <Container className="mt--8 pb-5">
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

                                            {!!filteredRides
                                                ?
                                                <RideTable pageSize={pageSize} currentPage={currentPage}
                                                               all={filteredRides}/>
                                                : <h1 className='text-white'>No Rides</h1>}



                                            <PaginationsComp
                                                itemsCount={filteredRides.length}
                                                pageSize={pageSize}
                                                onPageChange={this.onPageChange}
                                                currentPage={currentPage}
                                            />

                                        </Col>
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

const mapStateToProps = state => {

    return {
        rides: state.rides.all,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getRides: () => dispatch(getRides()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RideSearch);
