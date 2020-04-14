import React, {Fragment} from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Search} from "react-bootstrap-table2-toolkit";
import {Alert, Button, Nav, NavItem, NavLink, Table,  Card, CardBody, TabContent, TabPane} from "reactstrap";
import {
    deleteUser,
    getAll,
    getAllFinancials,
    getAllRelationals,
    getAllTechnicals,
    getDrivers,
    getUsers
} from '../../services/Users/UsersActions'
import {connect} from 'react-redux';
import classnames from "classnames";


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

class Agents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 5,
            currentPage: 1,
            error: null,
            all: [],
            users: [],
            drivers: [],
            financials: [],
            relationals: [],
            technicals: [],
            currentUser: {},
            d: {},
            response: {},
            circledNavPills: 3
        };
        // if (localStorage.getItem("jwtToken")) {
        //     currentUser: jwt_decode(localStorage.getItem("jwtToken"));
        // }
    };

    imgUrl = '../../assets/uploads/users/';

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            console.log(nextProps, 'nexProps');
            this.setState({
                all: nextProps.all,
                drivers: nextProps.drivers,
                users: nextProps.users,
                technicals: nextProps.technicals,
                financials: nextProps.financials,
                relationals: nextProps.relationals,
            });
        }
    }

    componentDidMount() {
        // const currentUser = jwt_decode(localStorage.getItem("jwtToken"));
        // console.log(currentUser._id, 'currentUser');
        this.props.getAll();
        this.props.getUsers();
        this.props.getDrivers();
        this.props.getAllFinancials();
        this.props.getAllTechnicals();
        this.props.getAllRelationals()
    }

    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index
        });
    };

    deleteHandler(e, elementId) {
        e.preventDefault();
        console.log("deleteHandler");
        this.props.deleteUser(elementId);
    }


    onPageChange = (page) => {
        this.setState({currentPage: page});
    }


    render() {
        const {error, currentPage, searchFilter, pageSize, d} = this.state;
        let users = this.props.users;
        const {all, financials} = this.props;
        // const currentUsers = fin.slice((currentPage - 1) * pageSize, pageSize * currentPage);

        console.log(this.state, 'this.state.state');
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            return (
                <div>
                    <div className="nav-wrapper">
                        <Nav
                            className="nav-fill flex-column flex-md-row"
                            id="tabs-icons-text"
                            pills
                            role="tablist"
                        >
                            <NavItem>
                                <NavLink
                                    aria-selected={this.state.tabs === 1}
                                    className= {classnames("mb-sm-3 mb-md-0 ", {
                                        active: this.state.tabs === 1
                                    })}
                                    onClick={e => this.toggleNavs(e, "tabs", 1)}
                                    href="#pablo"
                                    role="tab"
                                >
                                    <i className="ni ni-cloud-upload-96 mr-2"/>
                                    Agents Financiers
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    aria-selected={this.state.tabs === 2}
                                    className={classnames("mb-sm-3 mb-md-0", {
                                        active: this.state.tabs === 2
                                    })}
                                    onClick={e => this.toggleNavs(e, "tabs", 2)}
                                    href="#pablo"
                                    role="tab"
                                >
                                    <i className="ni ni-bell-55 mr-2"/>
                                    Agents Techniques
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    aria-selected={this.state.tabs === 3}
                                    className={classnames("mb-sm-3 mb-md-0", {
                                        active: this.state.tabs === 3
                                    })}
                                    onClick={e => this.toggleNavs(e, "tabs", 3)}
                                    href="#pablo"
                                    role="tab"
                                >
                                    <i className="ni ni-calendar-grid-58 mr-2"/>
                                    Agents Relationnels
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                    <Card className="shadow">
                        <CardBody>
                            <TabContent activeTab={"tabs" + this.state.tabs}>
                                <TabPane tabId="tabs1">
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


                                        {!!all &&
                                        this.props.financials.map(user => (
                                            <Fragment key={user._id}>
                                                <tr>
                                                    {user.avatar != null
                                                        ? <td><img className="avatar avatar-sm rounded-circle"
                                                                   src={this.imgUrl + user.avatar}/></td>
                                                        : <td><img className="avatar avatar-sm rounded-circle"
                                                                   src={require("assets/img/theme/team-1.jpg")}/></td>
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
                                </TabPane>
                                <TabPane tabId="tabs2">
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


                                        {!!all &&
                                        this.props.technicals.map(user => (
                                            <Fragment key={user._id}>
                                                <tr>
                                                    {user.avatar != null
                                                        ? <td><img className="avatar avatar-sm rounded-circle"
                                                                   src={this.imgUrl + user.avatar}/></td>
                                                        : <td><img className="avatar avatar-sm rounded-circle"
                                                                   src={require("assets/img/theme/team-1.jpg")}/></td>
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
                                </TabPane>
                                <TabPane tabId="tabs3">
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


                                        {!!all &&
                                        this.props.relationals.map(user => (
                                            <Fragment key={user._id}>
                                                <tr>
                                                    {user.avatar != null
                                                        ? <td><img className="avatar avatar-sm rounded-circle"
                                                                   src={this.imgUrl + user.avatar}/></td>
                                                        : <td><img className="avatar avatar-sm rounded-circle"
                                                                   src={require("assets/img/theme/team-1.jpg")}/></td>
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
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
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
        financials: state.users.financials,
        relationals: state.users.relationals,
        technicals: state.users.technicals,
    }
};

export default connect(mapStateToProps, {
    getAll,
    getUsers,
    getDrivers,
    deleteUser,
    getAllTechnicals,
    getAllRelationals,
    getAllFinancials
})(Agents);
