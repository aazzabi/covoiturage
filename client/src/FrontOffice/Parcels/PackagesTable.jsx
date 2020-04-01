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

const PackagesTable = ({packages, currentPage, pageSize}) => {
    const currentPackages = packages.slice((currentPage - 1) * pageSize, pageSize * currentPage);
    const serverUrl = "http://127.0.0.1:8887/";

    return (
        <Table
            className="align-items-center table-flush"
            responsive
        >
            <thead className="thead-light">
            <tr>
                <th scope="col">
                    Title
                </th>
                <th cope="col">
                    Type
                </th>
                <th cope="col">
                    From
                </th>
                <th cope="col">
                    To
                </th>
                <th scope="col">
                    weight
                </th>
                <th scope="col">size</th>
                <th scope="col">price</th>
                <th scope="col">description</th>

                <th scope="col"/>
            </tr>
            </thead>
            <tbody className="list">
            {!!packages &&
            currentPackages.map(pack =>
                    <tr key={pack._id}>
                        <td className="budget">
                            <Media className="align-items-center">
                                <a
                                    className="avatar"
                                    onClick={e => e.preventDefault()}
                                >
                                    <img
                                        src={`${serverUrl}${pack.files[0]}`}
                                    />
                                </a>
                                <Media>
                            <span className="name mb-0 text-sm">{pack.title}  </span>
                                </Media>
                            </Media>

                        </td>
                        <td>
                            <Badge className="badge-dot mr-4" color="">
                                <i className="bg-warning"/>
                                <span className="status">{pack.type}</span>
                            </Badge>
                        </td>
                        <td>{pack.departure}
                        </td>
                        <td>{pack.arrival}
                        </td>
                        <td>{pack.weight}
                        </td>
                        <td>
                            {pack.size}
                        </td>
                        <td>
                            {pack.price}
                        </td>
                        <td>
                            {pack.description}
                        </td>
                        <td className="text-right">
                            <UncontrolledDropdown>
                                <DropdownToggle
                                    color=""
                                    size="sm"
                                    className="btn-icon-only text-light"
                                >
                                    <i className="fas fa-ellipsis-v"/>
                                </DropdownToggle>
                                <DropdownMenu
                                    className="dropdown-menu-arrow"
                                    right
                                >
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        Action
                                    </DropdownItem>
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        Another action
                                    </DropdownItem>
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        Something else here
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </td>
                    </tr>
            )}
            </tbody>
        </Table>
    )
}

export default PackagesTable;


