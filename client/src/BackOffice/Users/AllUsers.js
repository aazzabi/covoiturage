import React, {Fragment} from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Search} from "react-bootstrap-table2-toolkit";
import {Alert, Button, Table} from "reactstrap";
import {deleteUser, getAll, getAllFinancials, getDrivers, getUsers} from '../../services/Users/UsersActions'
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

class AllUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 5,
            currentPage: 1,
            error: null,
            users: [],
            d: {},
            response: {},
        };
    };

    imgUrl = 'D:/covoiturageImages/uploads/users/';

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            console.log(nextProps, 'nexProps');
            this.setState({
                users: nextProps.users,
            });
        }
    }

    async componentWillMount() {
        const currentUser = jwt_decode(localStorage.getItem("jwtToken"));
        console.log(currentUser._id, 'currentUser');
        await this.props.getUsers();
        console.log(this.state, 'state');
    }


    deleteHandler(e, elementId) {
        e.preventDefault();
        this.props.deleteUser(elementId);
    }


    onPageChange = (page) => {
        this.setState({currentPage: page});
    }


    render() {
        const {error, currentPage, searchFilter, pageSize, d} = this.state;
        let users = this.props.users;
        console.log(this.state, 'this.state');
        console.log(this.props, 'this.props.financials');
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            const currentUsers = users.slice((currentPage - 1) * pageSize, pageSize * currentPage);
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
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>


                        {!!users &&
                        currentUsers.map(user => (
                            <Fragment key={user._id}>
                                <tr>
                                    {user.avatar != null
                                        ? <td><img className="avatar avatar-sm rounded-circle" src={require('D:/covoiturageImages/uploads/users/' + user.avatar)}/></td>
                                        : <td><img className="avatar avatar-sm rounded-circle" src={require("assets/img/theme/team-1.jpg")}/></td>
                                    }
                                    <td>{user.username}</td>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Button variant="info"
                                                onClick={() => this.props.editUser(user._id)}>Edit</Button>
                                        <Button variant="danger"
                                                onClick={e => this.deleteHandler(e, user._id)}>Delete</Button>
                                    </td>
                                </tr>
                            </Fragment>
                        ))}
                        </tbody>
                    </Table>
                    {/*<TableUser pageSize={pageSize} currentPage={currentPage} users={users}/>*/}

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
        users: state.users.users,
    }
};

export default connect(mapStateToProps, { getUsers, deleteUser})(AllUsers);
