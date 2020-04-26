import React, {Fragment} from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Search} from "react-bootstrap-table2-toolkit";
import {Alert, Button, Table, Badge, Input, Row} from "reactstrap";
import {getAll, deleteClaim, resolveClaim, searchClaim} from '../../services/Claims/ClaimsAction';
import {connect} from 'react-redux';
import jwt_decode from "jwt-decode";
import Pagination from "./Pagination";
import {getCurrentUser} from "./../../actions/authActions"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'


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

class AllClaims extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 5,
            currentPage: 1,
            error: null,
            all: [],
            response: {},
            currentUser: {},
            keyword: '',
            priority: '',
            typeC: '',
            status: '',
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
        this.props.getAll(this.state.currentUser._id);
    }

    deleteHandler(e, elementId) {
        e.preventDefault();
        this.props.deleteClaim(elementId);
    }

    onPageChange = (page) => {
        this.setState({currentPage: page});
    }

    search() {
        this.props.searchClaim(this.state.currentUser._id, this.state.keyword);
    }

     handleChange = async (name, value) => {
        await this.setState({[name]: value});
        this.search();
    };

    render() {
        const {error, currentPage, searchFilter, pageSize, d} = this.state;
        let all = this.state.all;
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            const currentDrivers = this.state.all.slice((currentPage - 1) * pageSize, pageSize * currentPage);
            return (
                <div style={{padding:25}}>
                    <h2>Claims List</h2>
                    <Row>
                        <div className="col-md-4">
                            <label htmlFor="keyword">Keyword : </label>
                            <Input name="keyword" id="keyword" placeholder="Search ..." type="text"
                                   value={this.state.keyword}
                                   onChange={event => this.handleChange('keyword', event.target.value)}/>
                        </div>
                    </Row>
                    {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
                    <Table striped responsive>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>priority</th>
                            <th>Status</th>
                            <th>Comments number</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        {!!all
                        && currentDrivers.map(claim => (
                            <Fragment key={claim._id}>
                                <tr>
                                    <td>{claim.title}</td>
                                    <td>{claim.description}</td>
                                    <td>{claim.type}</td>
                                    <td>
                                        {
                                            claim.priority == 'LOW' ? <Badge color="success" pill>Low</Badge>
                                                : claim.priority == 'NORMAL' ?
                                                <Badge color="info" pill>In Normal</Badge>
                                                : claim.status == 'IMPORTANT' ?
                                                    <Badge color="warning" pill>Important</Badge>
                                                    : <Badge color="danger" pill>Critical</Badge>
                                        }
                                    </td>
                                    <td>
                                        {
                                            claim.status == 'WAITING' ? <Badge color="primary">Waiting</Badge>
                                                : claim.status == 'IN_PROGRESS' ?
                                                <Badge color="info">In progress</Badge>
                                                : claim.status == 'RESOLVED' ? <Badge color="danger">Resolved</Badge>
                                                    : <Badge color="success">Confirmed</Badge>
                                        }
                                    </td>
                                    <td>{claim.comments && claim.comments.length}</td>
                                    <td>
                                        <a href={`/admin/claims/${claim._id}`}
                                           className="btn  btn-outline-success mr-1">
                                            <i className="fa fa-eye"></i>
                                        </a>

                                        <a className="btn btn-secondary"
                                           href={`/admin/claims/edit/${claim._id}`}><i className="fa fa-pen"></i>
                                        </a>
                                        <Button variant="danger" className="btn btn-danger"
                                                onClick={e => this.deleteHandler(e, claim._id)}><i
                                            className="fa fa-trash"></i></Button>
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
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        all: state.claims.all,
        currentUser: state.auth.currentUser,
    }
};

export default withRouter(connect(mapStateToProps, {deleteClaim, resolveClaim, getAll, getCurrentUser, searchClaim})(AllClaims));
