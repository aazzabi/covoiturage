import React, {Fragment} from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Search} from "react-bootstrap-table2-toolkit";
import {Alert, Badge, Button, Table} from "reactstrap";
import {deleteUser, getAll, getDrivers, getUsers} from '../../services/Users/UsersActions'
import {connect} from 'react-redux';
import jwt_decode from "jwt-decode";
import Pagination from "./Pagination";


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

class AllDrivers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 5,
            currentPage: 1,
            error: null,
            all: [],
            users: [],
            drivers: [],
            d: {},
            response: {},
            currentUser: jwt_decode(localStorage.getItem("jwtToken")),
        };

    };

    imgUrl = 'D:/covoiturageImages/uploads/users/';

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                all: nextProps.all,
                drivers: nextProps.drivers,
                users: nextProps.users,
            });
        }
    }

    componentWillMount() {
        this.props.getAll();
        this.props.getUsers();
        this.props.getDrivers();
    }


    deleteHandler(e, elementId) {
        e.preventDefault();
        this.props.deleteUser(elementId);
    }


    onPageChange = (page) => {
        this.setState({currentPage: page});
    }

    getDoc(docs, type, name, cls) {
        let final;
        docs.forEach(d => {
            if (d.type == type) {
                final = d;
            }
        });
        console.log(docs, 'docs')
        return (
            <a href={require('D:/covoiturageImages/uploads/drivers/' + final.name)}
               id={final.name} target="_blank">
                <Badge color={cls} pill><i className="fas fa-download"></i> {name} </Badge>
            </a>
        );
    }

    render() {
        const {error, currentPage, searchFilter, pageSize, d} = this.state;
        let users = this.props.users;
        let all = this.props.all;
        let drivers = this.props.drivers;
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            const currentDrivers = this.state.drivers.slice((currentPage - 1) * pageSize, pageSize * currentPage);
            return (

                <div>
                    <h2>Drivers List</h2>
                    {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
                    <Table>
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>User Name</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User's document</th>
                            <th>car's document</th>
                            <th>Car info</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        {!!drivers
                        && currentDrivers.map(user => (
                            <Fragment key={user._id}>
                                <tr>
                                    {user.avatar != null
                                        ? <td><img className="avatar avatar-sm rounded-circle" src={require('D:/covoiturageImages/uploads/users/' + user.avatar)}/></td>
                                        : <td><img className="avatar avatar-sm rounded-circle"
                                                   src={require("assets/img/theme/team-1.jpg")}/></td>
                                    }
                                    <td>{user.username}</td>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.documents[0] && this.getDoc(user.documents, 'CIN', 'cin', 'success')}
                                        {user.documents[1] && this.getDoc(user.documents, 'PERMIS', 'permis', 'warning')}
                                    </td>
                                    <td>
                                        {user.documents[2] && this.getDoc(user.documents, 'CARTE_GRISE', 'Carte grise', 'danger')}
                                        {user.documents[3] && this.getDoc(user.documents, 'ASSURANCE', 'Assurance', 'primary')}
                                        {user.documents[4] && this.getDoc(user.documents, 'VIGNETTE', 'Vignette', 'info')}
                                    </td>
                                    <td>
                                        {user.car && user.car.marque} - {user.car && user.car.model}
                                        <br/>{user.car && user.car.capacite} L
                                    </td>
                                    <td>
                                        <Button variant="danger"
                                                onClick={e => this.deleteHandler(e, user._id)}>Delete</Button>
                                    </td>
                                </tr>
                            </Fragment>
                        ))}
                        </tbody>
                    </Table>

                    <Pagination
                        itemsCount={users.length}
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
        all: state.users.all,
        drivers: state.users.drivers,
        users: state.users.users,
    }
};

export default connect(mapStateToProps, {getAll, getUsers, getDrivers, deleteUser})(AllDrivers);
