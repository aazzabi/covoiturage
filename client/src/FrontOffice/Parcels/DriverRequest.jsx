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
import AuthHeader from "../../components/Headers/AuthHeader";
import Moment from 'moment';
import _ from 'lodash';
import {confirmReciver, confirmSender, deleteRequest, DriverRequest} from "../../actions/Parcels/PackagesActions";
import Axios from "axios";
import ApproveNotif from "./ApproveNotif";


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

class DriverRequestPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            code0: "",
            code1: "",
            code2: "",
            code3: "",
            code4: "",
            code5: "",
            code6: "",
            code7: "",
            code8: "",
            code9: "",
            code10: "",
            code11: "",
            coder0: "",
            coder1: "",
            coder2: "",
            coder3: "",
            coder4: "",
            coder5: "",
            coder6: "",
            coder7: "",
            coder8: "",
            coder9: "",
            coder10: "",
            coder11: "",
            e0: "",
            er0: "",
            s0: "",
            pageSize: 5,
            currentPage: 1,
            error: null,
            request: [],
            response: [],
            currentUser: {},
            Latitude: null,
            Longitude: null
            , sw: false
        }
        ;
        window.navigator.geolocation.getCurrentPosition(
            success => this.setState({Latitude: success.coords.latitude, Longitude: success.coords.longitude})
        );
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                request: nextProps.request,
                currentUser: nextProps.currentUser,
            });
        }
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };
    state = {Latitude: null, Longitude: null, errormsg: ''}; // this is equal to contructor

    async componentWillMount() {

        await this.props.getCurrentUser();


        await this.props.DriverRequest(this.props.currentUser._id);
        const user = this.props.currentUser._id;
        let pos = {};
        pos = {Longitude: this.state.Longitude, Latitude: this.state.Latitude};
        await Axios.put(`http://localhost:3000/api/locations/${user}`, pos)

    }


    deleteHandler(e, req) {
        e.preventDefault();
        this.props.deleteRequest(req);
        window.location.reload();
    }


    onPageChange = (page) => {
        this.setState({currentPage: page});
    }

    validateForm(code, index) {

        let test = true;
        let formValid = true;
        let form = {...this.state};


        if (form['code' + index] !== code) {
            test = false;
            this.handleChange('e' + [index], "wrong code !!")
            this.handleChange('s' + [index], "error")
        } else {
            this.handleChange('e' + [index], "")
            this.handleChange('s' + [index], "")
        }


        return test;
    }

    validateFormr(code, index) {

        let test = true;
        let formValid = true;
        let form = {...this.state};


        if (form['coder' + index] !== code) {
            test = false;
            this.handleChange('er' + [index], "wrong code !!")
            this.handleChange('s' + [index], "error")
        } else {
            this.handleChange('er' + [index], "")
            this.handleChange('s' + [index], "")
        }


        return test;
    }

    async confirme(e, code, id, index) {

        e.preventDefault();
        let formValid = this.validateForm(code, index);
        if (formValid) {
            await this.props.confirmSender(id, code)
            window.location.reload(false);
        }


    }

    async confirmer(e, code, id, index) {

        e.preventDefault();
        let formValid = this.validateFormr(code, index);

        if (formValid) {
            await this.props.confirmReciver(id, code)
            window.location.reload(false);
        }


    }

    render() {
        const {error, currentPage, searchFilter, pageSize, d} = this.state;
        let array = []
        let all = this.state.request;
        array.push(all)
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            const currentDrivers = all.slice((currentPage - 1) * pageSize, pageSize * currentPage);
            return (

                <>
                    <AuthHeader title="Parcels Requests" lead=""/>
                    <Container className="mt--8 pb-5">
                        <Row className="justify-content-center">


                            <Col lg="12">
                                <div className="card-wrapper">
                                    <Card>
                                        <CardHeader>

                                            <h3 className="mb-0">My Requests</h3>
                                            <ApproveNotif></ApproveNotif>
                                        </CardHeader>

                                        <CardBody>
                                            <Col md="12">

                                                <Table responsive>
                                                    <thead>
                                                    <tr>
                                                        <th>parcel title</th>
                                                        <th>From</th>
                                                        <th>To</th>
                                                        <th>Type</th>
                                                        <th>Parcel owner</th>
                                                        <th >Sender confirmation</th>
                                                        <th>Receiver confirmation</th>
                                                        <th></th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {!!all
                                                    && currentDrivers.map((req, index) => (

                                                        <Fragment key={req._id}>
                                                            {req.confirmation ?
                                                                <tr>


                                                                    <td>
                                                                        <div style={{marginTop: 5}}>
                                                                            {req.parcelId.title}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div style={{marginTop: 5}}>
                                                                            {req.parcelId.departure}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div style={{marginTop: 5}}>
                                                                            {req.parcelId.arrival}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div style={{marginTop: 5}}>
                                                                            {req.parcelId.type}
                                                                        </div>

                                                                    </td>
                                                                    <td>
                                                                        <div style={{marginTop: 5}}>
                                                                            {req.parcelId.sender.username}
                                                                        </div>
                                                                    </td>
                                                                    {

                                                                        req.confirmationSend
                                                                            ? <td>
                                                                                <div style={{marginTop: 5}}>
                                                                                    <Badge color="success"
                                                                                           pill>Confirmed</Badge>
                                                                                </div>

                                                                            </td>
                                                                            : <td>

                                                                                <FormGroup>

                                                                                    <InputGroup
                                                                                        className="input-group-merge input-group-alternative mb-3"
                                                                                        className={this.state['s' + index]}
                                                                                    >

                                                                                        <Input
                                                                                            placeholder="code.."
                                                                                            id="standard-start-adornment"
                                                                                            value={this.state['code' + index]}
                                                                                            onChange={event => this.handleChange('code' + index, event.target.value)}
                                                                                        />
                                                                                        <InputGroupAddon
                                                                                            addonType="prepend">
                                                                                            <Button style={{marginLeft: 4}}
                                                                                                    onClick={e => this.confirme(e, req.parcelId.sendingCode, req._id, index)}
                                                                                                    className="btn-icon-only rounded-circle"
                                                                                                    color="twitter"
                                                                                                    type="button"
                                                                                            >
                                                                    <span className="btn-inner--icon">
                                                                    <i className="fab fa fa-pen"/>
                                                                    </span>
                                                                                            </Button>
                                                                                        </InputGroupAddon>

                                                                                    </InputGroup>

                                                                                    <span
                                                                                        className="errorText">{this.state['e' + index]}</span>


                                                                                </FormGroup>


                                                                            </td>

                                                                    }

                                                                    {

                                                                        req.confirmationRecive
                                                                            ? <td>
                                                                                <div style={{marginTop: 5}}>
                                                                                    <Badge color="success"
                                                                                           pill>Confirmed</Badge>
                                                                                </div>

                                                                            </td>
                                                                            : <td>

                                                                                <FormGroup>

                                                                                    <InputGroup
                                                                                        className="input-group-merge input-group-alternative mb-3"
                                                                                        className={this.state['s' + index]}
                                                                                    >

                                                                                        <Input
                                                                                            placeholder="code.."
                                                                                            id="standard-start-adornment"
                                                                                            value={this.state['coder' + index]}
                                                                                            onChange={event => this.handleChange('coder' + index, event.target.value)}
                                                                                        />
                                                                                        <InputGroupAddon
                                                                                            addonType="prepend">

                                                                                            <Button style={{marginLeft: 4}}
                                                                                                    onClick={e => this.confirmer(e, req.parcelId.receiveingCode, req._id, index)}
                                                                                                    className="btn-icon-only rounded-circle"
                                                                                                    color="twitter"
                                                                                                    type="button"
                                                                                            >
                                                                                        <span
                                                                                            className="btn-inner--icon">
                                                                                            <i className="fab fa fa-pen"/>
                                                                                        </span>
                                                                                            </Button>
                                                                                        </InputGroupAddon>
                                                                                    </InputGroup>
                                                                                    <span
                                                                                        className="errorText">{this.state['er' + index]}</span>

                                                                                </FormGroup>


                                                                            </td>

                                                                    }

                                                                    {req.confirmationSend
                                                                            ? <a></a>
                                                                            : <td>
                                                                                <div style={{marginTop: 5}}>


                                                                                    <Button
                                                                                        onClick={e => this.deleteHandler(e, req._id)}
                                                                                        className="btn-icon-only rounded-circle"
                                                                                        color="pinterest"
                                                                                        type="button"
                                                                                    >
                                                                    <span className="btn-inner--icon">
                                                                    <i className="fab fa fa-trash"/>
                                                                    </span>
                                                                                    </Button>

                                                                                </div>


                                                                            </td>

                                                                    }


                                                                </tr> : null}


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
        currentUser: state.auth.currentUser,
        request: state.pack.request,

    }
};

export default withRouter(connect(mapStateToProps, {
    getCurrentUser,
    DriverRequest,
    confirmSender,
    confirmReciver,
    deleteRequest
})(DriverRequestPage));
