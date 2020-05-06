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
import {confirmTraveller, deleteRide, deleteTraveller, myRides, myTravellers} from "../../services/Rides/RideAction";
import AuthHeader from "../../components/Headers/AuthHeader";
import Moment from 'moment';
import _ from 'lodash';



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

class MyTravellers extends React.Component {
    code1;
    code2;
    code3;
    code4;
    constructor(props) {
        super(props);
        this.state = {

            code0:"",code1:"",code2:"",code3:"",
            e0:"",
            s0:"",
            pageSize: 5,
            currentPage: 1,
            error: null,
            travellers: [],
            response: {},
            currentUser: {},
        };
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                travellers: nextProps.travellers,
                currentUser: nextProps.currentUser,
            });
        }
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
        console.log("code",this.state.code);
    };

    async componentWillMount() {

        await this.props.getCurrentUser();
        await this.props.myTravellers(this.props.match.params.id);

        if (this.props.currentUser._id === undefined){
            this.props.history.push('/front/login');
        }else {

            if (this.props.currentUser.role !== 'DRIVER'){

                this.props.history.push('/front/ride/search');

            }
            else{

                console.log(this.state.travellers)
                console.log(this.props.currentUser)

            }

        }

    }


    deleteHandler(e, user,ride) {
        e.preventDefault();
        this.props.deleteTraveller(user,ride);
        window.location.reload();
    }


    onPageChange = (page) => {
        this.setState({currentPage: page});
    }

    validateForm(code,index) {

        let test = true;
        let formValid = true;
        let form = {...this.state};
        console.log('form',form)


        if (form['code'+index] !== code) {
            test = false;
            this.handleChange('e'+[index], "wrong code !!")
            this.handleChange('s'+[index], "error")
        } else {
            this.handleChange('e'+[index], "")
            this.handleChange('s'+[index], "")
        }


        console.log(test);

        console.log(formValid, 'test2')
        return test;
    }

   async confirme(e,code,index) {

        e.preventDefault();
        let formValid = this.validateForm(code,index);

            if (formValid) {
                await this.props.confirmTraveller(this.props.match.params.id,code)
                console.log('done jsx');
                window.location.reload(false);
            }


    }


    renderTravler(travler,index) {

        return (

            <tr>
                <td>
                    <div  style={{paddingTop: 5}}>
                        {travler.user.username}
                    </div>

                </td>
                <td>
                    <div style={{marginTop: 5}}>
                        {travler.user.email}
                    </div>
                    </td>
                <td>
                    <div style={{marginTop: 5}}>
                        {travler.user.phone}
                    </div>
                </td>
                <td>
                    <div style={{marginTop: 5}}>
                        {
                            travler.user.gender === "HOMME"
                                ?<Badge color="success" pill >Man</Badge>
                                :<Badge color="warning" pill >Women</Badge>


                        }
                    </div>

                </td>
                <td>
                    <div style={{marginTop: 5}}>
                        {
                            travler.valide
                                ?<Badge color="success" pill >Yes</Badge>
                                :<Badge color="warning" pill >Not yet</Badge>


                        }
                    </div>

                </td>
                {

                    travler.valide
                    ?<a></a>
                    : <td>

                            <FormGroup>

                                <InputGroup
                                    className="input-group-merge input-group-alternative mb-3"
                                    className={this.state['s'+index]}
                                >
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fas fa-pen"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="traveller confirmation code"
                                        id="standard-start-adornment"
                                        value={this.state['code'+index]}
                                        onChange={event => this.handleChange('code'+index, event.target.value)}
                                    />
                                </InputGroup>
                                <span className="errorText">{this.state['e'+index]}</span>

                            </FormGroup>

                        </td>

                }

                {

                    travler.valide
                        ?<a></a>
                        : <td>
                            <div style={{marginTop: 5}}>

                                <Button style={{marginRight: 2}}
                                        onClick={e => this.confirme(e,travler.confirmationCode,index)}
                                        className="btn-icon-only rounded-circle"
                                        color="twitter"
                                        type="button"
                                >
                                                                    <span className="btn-inner--icon">
                                                                    <i className="fab fa fa-pen" />
                                                                    </span>
                                </Button>

                                <Button
                                    onClick={e => this.deleteHandler(e, travler.user._id,this.props.match.params.id)}
                                    className="btn-icon-only rounded-circle"
                                    color="pinterest"
                                    type="button"
                                >
                                                                    <span className="btn-inner--icon">
                                                                    <i className="fab fa fa-trash" />
                                                                    </span>
                                </Button>

                            </div>


                        </td>

                }

            </tr>


        );
    }







    render() {
        const {error, currentPage, searchFilter, pageSize, d} = this.state;
        let array = []
        let all = this.state.travellers;

        array.push(all)
        console.log(array)
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            const currentDrivers = array.slice((currentPage - 1) * pageSize, pageSize * currentPage);
            console.log(currentDrivers[0])
            return (

                <>
                    <AuthHeader title="Travellers" lead=""/>
                    <Container className="mt--8 pb-5">
                        <Row className="justify-content-center">


                            <Col lg="12">
                                <div className="card-wrapper">
                                    <Card>
                                        <CardHeader>

                                            <h3 className="mb-0">travellers will be with you</h3>
                                        </CardHeader>

                                        <CardBody>
                                            <Col md="12">

                                                <Table responsive>
                                                    <thead>
                                                    <tr>
                                                        <th>traveler username</th>
                                                        <th>email</th>
                                                        <th width={10}>phone</th>
                                                        <th>gender</th>
                                                        <th>confirmed</th>
                                                        <th>Code</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {!!all
                                                    && currentDrivers.map(ride => (

                                                        <Fragment key={ride._id}>

                                                            {_.map(ride.travelers,(traveler,index)  => {
                                                                {

                                                                }
                                                                return this.renderTravler(traveler,index);
                                                                //console.log(traveler)
                                                            })}

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
        travellers: state.rides.travellers,

    }
};

export default withRouter(connect(mapStateToProps, { getCurrentUser, myTravellers, confirmTraveller, deleteTraveller})(MyTravellers));
