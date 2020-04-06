/*!

=========================================================
* Argon Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin that prints a given react component
// react component for creating dynamic tables
import paginationFactory from "react-bootstrap-table2-paginator";
import {Search} from "react-bootstrap-table2-toolkit";
import {Alert, Button, Table} from "reactstrap";
import {deleteUser, getAll, getDrivers, getUsers} from '../../services/Users/UsersActions'
import {connect} from 'react-redux';
import TableUser from './TableUser';


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

class AllUsers extends React.Component {
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
            response: {}
        }
    };

    imgUrl = 'D:\\covoiturageImages\\uploads\\users\\';

    componentDidMount() {
        this.all = this.props.getAll();
        this.users = this.props.getUsers();
        this.drivers = this.props.getDrivers();
    }

    deleteHandler(e, elementId) {
        e.preventDefault();
        this.props.deleteUser(elementId);
    }

    deleteUser(userId) {
        const {users} = this.state;

        const apiUrl = 'http://localhost:3000/dev/tcxapp/reactapi/deleteUser';
        const formData = new FormData();
        formData.append('userId', userId);

        const options = {
            method: 'POST',
            body: formData
        };

        fetch(apiUrl, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        response: result,
                        users: users.filter(user => user.id !== userId)
                    });
                },
                (error) => {
                    this.setState({error});
                }
            )
    }

    renderUsers() {
        return this.state.users.map(user =>
            (
                <tr>
                    <td><img src={this.imgUrl + user.avatar}/></td>
                    <td>{user.username}</td>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                        <Button variant="info" onClick={() => this.props.editUser(user._id)}>Edit</Button>
                        <Button variant="danger" onClick={() => this.deleteHandler(user._id)}>Delete</Button>
                    </td>
                </tr>
            ),
        )
    }

    render() {
        const {error,currentPage, searchFilter, pageSize,  d} = this.state;
        const {users} = this.props.getUsers();
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            return (
                <div>
                    <h2>Users List</h2>
                    {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
                    <Table>
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>User Name</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{this.renderUsers()}*/}
                        <TableUser pageSize={pageSize} currentPage={currentPage} users={users}/>
                        </tbody>
                    </Table>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    all: state.all,
    drivers: state.drivers,
    users: state.users
});
const mapDispatchToProps = dispatch => {
    return {
        getAll: () => dispatch(getAll()),
        getUsers: () => dispatch(getUsers()),
        getDrivers: () => dispatch(getDrivers()),
        deleteUser: () => dispatch(deleteUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
