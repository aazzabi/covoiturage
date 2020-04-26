import React, {Fragment} from "react";
// reactstrap components
import {Alert, Badge, Button, Table} from "reactstrap";
// core components
import {connect} from "react-redux";
import {getCurrentUser} from "../../actions/authActions";
import {getAllDriverRequest, refuserRequest, acceptRequest} from "../../services/Drivers/DriversAction";

import Pagination from "../Users/Pagination";
import Moment from "moment";

class AllDriverRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 5,
            currentPage: 1,
            error: null,
            response: {},
            currentUser: {},
            allDriversRequests: [],

        }
    }


    imgUrl = 'D:\\covoiturageImages\\uploads\\users\\';

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                currentUser: nextProps.currentUser,
                allDriversRequests: nextProps.allDriversRequests,
            });
        }
    }

    renderAlert() {
        const {state} = this.props.history.location;
        const {action} = this.props.history;
        if (state && action === 'PUSH') {
            return (
                <div className="alert alert-success" role="alert" style={{marginBottom: 0}}>
                    <strong>Oops!</strong> user updated successfuly, changes will refreshed during your next login !
                </div>
            );
        }
    }

    componentWillMount() {
        this.props.getAllDriverRequest();
    }

    onPageChange = (page) => {
        this.setState({currentPage: page});
    };

    getDoc(docs, type, name, cls) {
        let final;
        docs.forEach(d => {
            if (d.type == type) {
                final = d;
            }
        });
        return (
            <a href={require('D:/covoiturageImages/uploads/drivers/' + final.name)}
               id={final.name} target="_blank">
                <Badge color={cls} pill><i className="fas fa-download"></i> {name} </Badge>
            </a>
        );
    }


    deleteDriverRequest(e, id) {
        console.log(id);
        this.props.refuserRequest(id);
    }
    acceptDriverRequest(e, id) {
        console.log(id);
        this.props.acceptRequest(id);
        window.location.reload();
    }

    render() {
        const {error, currentPage, searchFilter, pageSize, d} = this.state;
        let all = this.props.allDriversRequests;
        console.log(this.state.allDriversRequests)
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            const allDriversRequests = this.state.allDriversRequests.slice((currentPage - 1) * pageSize, pageSize * currentPage);
            return (

                <div>
                    <h2>Drivers List</h2>
                    {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
                    <Table>
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Requested At</th>
                            <th>User Name</th>
                            <th>Name</th>
                            <th>User's document</th>
                            <th>car's document</th>
                            <th>Car info</th>
                            <th>Car info</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        {!!all
                        && allDriversRequests.map(driveReq => (
                            <Fragment key={driveReq._id}>
                                <tr>
                                    {driveReq.user.avatar != null
                                        ? <td><img className="avatar avatar-sm rounded-circle"
                                                   src={require('D:/covoiturageImages/uploads/users/' + driveReq.user.avatar)}/>
                                        </td>
                                        : <td><img className="avatar avatar-sm rounded-circle"
                                                   src={require("assets/img/theme/team-1.jpg")}/></td>
                                    }
                                    <td>{Moment(driveReq.requestedAt).format(' DD -  MMMM  - YYYY')}</td>
                                    <td>{driveReq.user.username}</td>
                                    <td>{driveReq.user.firstName} {driveReq.user.lastName}</td>
                                    <td>
                                        {this.getDoc(driveReq.user.documents, 'CIN', 'cin', 'success')}
                                        {this.getDoc(driveReq.user.documents, 'PERMIS', 'permis', 'warning')}
                                    </td>
                                    <td>
                                        {this.getDoc(driveReq.user.documents, 'CARTE_GRISE', 'Carte grise', 'danger')}
                                        {this.getDoc(driveReq.user.documents, 'ASSURANCE', 'Assurance', 'primary')}
                                        {this.getDoc(driveReq.user.documents, 'VIGNETTE', 'Vignette', 'info')}
                                    </td>
                                    <td>
                                        {driveReq.user.car && driveReq.user.car.marque} - {driveReq.user.car && driveReq.user.car.model}
                                        <br/>{driveReq.user.car.capacite} L
                                    </td>
                                    <td>{driveReq.confirmation}</td>
                                    <td>
                                        <Button className="btn btn-sm btn-success"
                                                onClick={e => this.acceptDriverRequest(e, driveReq._id)}><i className="fas fa-check"></i></Button>
                                        <Button className="btn btn-sm btn-danger"
                                                onClick={e => this.deleteDriverRequest(e, driveReq._id)}><i className="fas fa-trash"></i></Button>
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
        currentUser: state.auth.currentUser,
        allDriversRequests: state.drivers.allDriversRequests,
    }
};

export default connect(mapStateToProps, {getAllDriverRequest, getCurrentUser, refuserRequest, acceptRequest})(AllDriverRequest);
