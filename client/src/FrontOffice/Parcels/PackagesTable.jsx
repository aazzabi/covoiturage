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

                             <span className="name mb-0 text-sm"> <a className="font-weight-bold"> {pack.title}</a></span>
                            </Media>

                        </td>
                        <td>
                            <Badge color="primary" pill>
                                {pack.type}
                            </Badge>
                        </td>
                        <td><i className="ni ni-square-pin"/> {pack.departure}
                        </td>
                        <td><i className="ni ni-pin-3"/> {pack.arrival}
                        </td>
                        <td>{pack.weight}
                        </td>
                        <td>
                            {pack.size}
                        </td>
                        <td>
                            {pack.price}
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
                                        href={`/front/viewparcels/${pack._id}`}
                                    >

                                        View Parcel info
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


