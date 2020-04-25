import React, {Fragment} from "react";
import {
    Badge, Button,
    Table,

} from "reactstrap";
import Moment from "moment";
import {Link} from "react-router-dom";
import _ from 'lodash';

const PackagesTable = ({all, currentPage, pageSize}) => {
    const currentPackages = all.slice((currentPage - 1) * pageSize, pageSize * currentPage);
    const serverUrl = "http://127.0.0.1:8887/";

    return (

        <Table responsive>
            <thead>
            <tr>
                <th>Start Time</th>
                <th>From</th>
                <th>To</th>
                <th WIDTH={10}>Places</th>
                <th>price</th>
                <th>package</th>
                <th>More Details</th>
            </tr>
            </thead>
            <tbody>

            {!!all
            && currentPackages.map(ride => (
                <Fragment key={ride._id}>
                    <tr>
                        <td>
                            {Moment(ride.startTime).format('LLL')}
                        </td>
                        <td>{ride.origin}</td>
                        <td>{ride.destination}</td>
                        <td>
                            <Badge color="warning" pill>{ride.nbrPlaces - _.map(ride.travelers, traveler => {
                            }).length}</Badge>
                        </td>
                        <td>
                            <Badge color="info">{ride.prixPerPlace} DT</Badge>
                        </td>
                        <td>        {
                            ride.packageAllowed ? <Badge color="success">YES</Badge>
                                : <Badge color="danger">NO</Badge>
                        }</td>
                        <td>
                            <Link to={`/front/ride/details/${ride._id}`}>
                                <Button style={{marginRight: 2}}
                                        className="btn-icon-only rounded-circle"
                                        color="slack"
                                        type="button">
                                <span className="btn-inner--icon">
                                <i className="fab fa fa-eye"/>
                                </span>
                                </Button>
                            </Link>

                        </td>
                    </tr>
                </Fragment>
            ))}
            </tbody>
        </Table>

    )
}

export default PackagesTable;


