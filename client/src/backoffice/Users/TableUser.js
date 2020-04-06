import React from "react";
import {
    Badge,
    Card,
    CardHeader, Col,
    Container, DropdownItem, DropdownMenu, DropdownToggle,
    Media,
    Progress,
    Row,
    Table,
    UncontrolledDropdown,
    UncontrolledTooltip
} from "reactstrap";


const TableUser = ({users, currentPage, pageSize}) => {
    const currentUsers = users.slice((currentPage - 1) * pageSize, pageSize * currentPage);
    const serverUrl = "http://127.0.0.1:8887/";

    return (
        <Table
            className="align-items-center table-flush"
            responsive
        >
            <thead className="thead-light">
            <tr>
                <th>Image</th>
                <th>User Name</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody className="list">
            {!!users &&
            currentUsers.map(user =>
                <tr key={user._id}>
                    <td><img src={this.imgUrl + user.avatar}/></td>
                    <td>{user.username}</td>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                        <btn variant="info" onClick={() => this.props.editUser(user._id)}>Edit</btn>
                        <btn variant="danger" onClick={() => this.deleteHandler(user._id)}>Delete</btn>
                    </td>
                </tr>
            )}
            </tbody>
        </Table>
    )
}

export default TableUser;
