import React, {Fragment} from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Search} from "react-bootstrap-table2-toolkit";
import {
    Alert,
    Button,
    Table,
    Badge,
    Media,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Label,
    InputGroup,
    InputGroupAddon,
    InputGroupText, Input, Form
} from "reactstrap";
import {connect} from 'react-redux';
import jwt_decode from "jwt-decode";
import Pagination from "./Pagination";
import {getCurrentUser} from "./../../actions/authActions"
import {Link, withRouter} from 'react-router-dom'
import {deleteRide, myRides} from "../../services/Rides/RideAction";
import AuthHeader from "../../components/Headers/AuthHeader";
import Moment from 'moment';


const pagination = paginationFactory({
    page: 1,
    alwaysShowAllBtns: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPageRenderer: ({options, currSizePerPage, onSizePerPageChange}) => (
        <div className="dataTables_length" id="datatable-basic_length">
            <label>
                Show{" "}
                {
                    <select
                        name="datatable-basic_length"
                        aria-controls="datatable-basic"
                        className="form-control form-control-sm"
                        onChange={e => onSizePerPageChange(e.target.value)}
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                }{" "}
                entries.
            </label>
        </div>
    )
});

const {SearchBar} = Search;

class MyRides extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 5,
            currentPage: 1,
            error: null,
            all: [],
            response: {},
            currentUser: {},
        };
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                all: nextProps.all,
                currentUser: nextProps.currentUser,
            });
        }
    }

    async componentWillMount() {
        await this.props.getCurrentUser();
        if (this.props.currentUser._id === undefined){
            this.props.history.push('/front/login');
        }else {
            this.props.myRides(this.state.currentUser._id);
        }


    }

    deleteHandler(e, elementId) {
        e.preventDefault();
        this.props.deleteRide(elementId);
    }

    onPageChange = (page) => {
        this.setState({currentPage: page});
    }

    render() {
        const {error, currentPage, searchFilter, pageSize, d} = this.state;
        let all = this.state.all;
        console.log(all)
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            const currentDrivers = this.state.all.slice((currentPage - 1) * pageSize, pageSize * currentPage);
            console.log(currentDrivers)
            return (

                <>
                    <AuthHeader title="My Rides" lead=""/>
                    <Container className="mt--8 pb-5">
                        <Row className="justify-content-center">


                            <Col lg="12">
                                <div className="card-wrapper">
                                    <Card>
                                        <CardHeader>

                                            <h3 className="mb-0">My Rides</h3>
                                        </CardHeader>

                                        <CardBody>
                                            <Col md="12">

                                                <Table responsive>
                                                    <thead>
                                                    <tr>
                                                        <th>Start Time</th>
                                                        <th>From</th>
                                                        <th>To</th>
                                                        <th WIDTH={10}>Places</th>
                                                        <th>price</th>
                                                        <th>package</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {!!all
                                                    && currentDrivers.map(ride => (
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
                                                                   <Badge color="info">{ride.prixPerPlace} DT</Badge>
                                                                </td>
                                                                <td>        {
                                                                    ride.packageAllowed ? <Badge color="success">YES</Badge>
                                                                            : <Badge color="danger">NO</Badge>
                                                                }</td>
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

                                                                    <Link to={`/front/ride/edit/${ride._id}`}>
                                                                    <Button style={{marginRight: 2}}
                                                                        className="btn-icon-only rounded-circle"
                                                                        color="twitter"
                                                                        type="button"
                                                                    >
                                                                    <span className="btn-inner--icon">
                                                                    <i className="fab fa fa-pen" />
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

                                    </Card>
                                </div>
                            </Col>


                        </Row>
                    </Container>

                </>

            )
        }
    }
}

function mapStateToProps(state) {
    return {
        all: state.rides.all,
        currentUser: state.auth.currentUser,
    }
};

export default withRouter(connect(mapStateToProps, {deleteRide,  myRides , getCurrentUser})(MyRides));
