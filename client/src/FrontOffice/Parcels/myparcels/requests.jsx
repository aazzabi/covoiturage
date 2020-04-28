import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {AddRequest, fetchPackagesByUserId, fetchPostById, fetchRequest} from '../../../actions/Parcels/PackagesActions';
import {getCurrentUser} from "../../../actions/authActions";
import AuthHeader from "../../../components/Headers/AuthHeader";
import {Button, Col, Container, Modal, Row} from "reactstrap";
import addNotification from 'react-push-notification';
import {acceptRequestParcel, refuserRequest} from "../../../actions/Parcels/RequestsParcelActions";


class requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myrequests: [],
            currentUser: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                myrequests: nextProps.myrequests,
                currentUser: nextProps.currentUser,
            });
        }
    }

    async componentWillMount() {
        const {id} = this.props.match.params;
        await this.props.getCurrentUser();
        this.props.fetchRequest(id);

    }


    deleteRequest(e, id) {
        e.preventDefault();
        this.props.refuserRequest(id);
        console.log(id);
        window.location.reload()
    };

    AddRequest(e, id) {
        e.preventDefault();
        this.props.acceptRequestParcel(id);
        console.log(id);
        //     window.location.reload()
    };

    render() {
        return (
            <>
                <div className="header bg-gradient-info py-7 py-lg-2 pt-lg-2 ">
                    <Container>
                        <div className="header-body text-center mb-7">
                            <Row className="justify-content-center">
                                <Col className="px-5" lg="6" md="8" xl="5">

                                    <h1 className="text-white"></h1>

                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <div className="separator separator-bottom separator-skew zindex-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="fill-default"
                                points="2560 0 2560 100 0 100"
                            />
                        </svg>
                    </div>
                </div>
                <Container className="container">
                    <div className="justify-content-center row">
                        <div className="col-lg-12">
                            <div className={"card-wrapper row"}>
                                <div className="col-md-12">
                                    <div className="bg-default shadow card">
                                        <div className="bg-transparent border-0 card-header"><h3
                                            className="text-white mb-0"></h3> Request List
                                        </div>
                                        <div className="table-responsive">
                                            <table className="align-items-center table-dark table-flush table">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="sort" data-sort="name" scope="col">Message</th>
                                                    <th className="sort" data-sort="budget" scope="col">Price</th>
                                                    <th className="sort" data-sort="budget" scope="col">Status</th>

                                                    <th scope="col">Users</th>
                                                    <th className="sort" data-sort="completion" scope="col">Action</th>
                                                    <th scope="col"></th>
                                                </tr>
                                                </thead>
                                                <tbody className="list">
                                                {_.map(this.props.myrequests, request =>

                                                    <tr key={request._id}>
                                                        <th scope="row">
                                                            <div className="align-items-center media">
                                                                <div className="media"><span
                                                                    className="name mb-0 text-sm">{request.message}</span>
                                                                </div>
                                                            </div>
                                                        </th>
                                                        <td className="budget">{request.suggestion} TND</td>



                                                        <td>
                                                            {request.confirmation === true &&

                                                            <div className="checklist-item checklist-item-success">
                                                                <div className="checklist-info"><h5
                                                                    className="checklist-title mb-0">
                                                                    <div className="align-items-center media">
                                                                    <div className="media"><span
                                                                    className="name mb-0 text-sm" color={"white"}>Confirmed</span>
                                                                    </div></div></h5>
                                                                    <small>10:30 AM</small></div>
                                                                <div>
                                                                    <div
                                                                        className="custom-control custom-checkbox custom-checkbox-warning">
                                                                       </div>
                                                                </div>
                                                            </div>
                                                            }
                                                            {request.confirmation === false &&

                                                            <div className="checklist-item checklist-item-warning">
                                                                <div className="checklist-info"><h5
                                                                    className="checklist-title mb-0">
                                                                    <div className="media"><span
                                                                        className="name mb-0 text-sm">non confirmed</span>
                                                                    </div></h5>
                                                                    <small>10:30 AM</small></div>
                                                                <div>
                                                                    <div
                                                                        className="custom-control custom-checkbox custom-checkbox-warning">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            }
                                                        </td>
                                                        <td><span className="badge-dot mr-4 badge badge-"><i
                                                            className="bg-warning"></i><span
                                                            className="status">  {request.userId ? request.userId.lastName : ""} {request.userId ? request.userId.firstName : ""}</span></span>
                                                        </td>

                                                        <td>
                                                            <div className="d-flex align-items-center">

                                                                <button
                                                                    className="btn btn-outline-danger"
                                                                    onClick={e => this.deleteRequest(e, request._id)}
                                                                >Refuse
                                                                </button>
                                                                <button type="button"
                                                                        className="btn btn-outline-success"
                                                                        onClick={e => this.AddRequest(e, request._id)}>Accept
                                                                </button>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                    )}

                                                    </tbody>
                                                    </table>
                                                    </div>
                                                    </div>
                                                    </div>
                                                    </div>
                                                    </div>
                                                    </div>
                                                    </Container></>
                                                    );
                                                    }
                                                    }

                                                    function mapStateToProps(state) {
                                                    return {
                                                    myrequests: state.pack.myrequests,
                                                    currentUser: state.auth.user,
                                                    };
                                                    }

                                                    const mapDispatchToProps = (dispatch) => {
                                                    return {
                                                    fetchRequest: id => dispatch(fetchRequest(id)),
                                                    AddRequest,
                                                    getCurrentUser,
                                                    refuserRequest: id => dispatch(refuserRequest(id)),
                                                    acceptRequestParcel: id => dispatch(acceptRequestParcel(id)),
                                                    }
                                                    }

                                                    export default connect(mapStateToProps, mapDispatchToProps)(requests);
