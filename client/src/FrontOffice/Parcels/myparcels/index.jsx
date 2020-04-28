import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {AddRequest, fetchPackagesByUserId, fetchPostById} from '../../../actions/Parcels/PackagesActions';
import {getCurrentUser} from "../../../actions/authActions";
import AuthHeader from "../../../components/Headers/AuthHeader";
import {Col, Container, Row} from "reactstrap";

class MyParcel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myparcels: [],
            currentUser: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                myparcels: nextProps.myparcels,
                currentUser: nextProps.currentUser,
            });
        }
    }

    async componentWillMount() {
        await this.props.getCurrentUser();
        this.props.fetchPackagesByUserId(this.props.currentUser._id);
    }


    renderPostSummary(post) {
        const serverUrl = "http://127.0.0.1:8887/";

        return (
            <div className="col-lg-4" key={post._id}>

                <hr/>
                <div className="card">
                    <div className="card-body"><a href="#pablo"><img
                        className="card-img-top"
                        src={`${serverUrl}${post.files}`}
                        width={140} height={140}/></a>
                        <div className="pt-4 text-center"><Link className="link-without-underline"
                                                                to={`/front/parcels/${post._id}`}>

                            <h5 className="h3 title"><span className="d-block mb-1">  {post.title}</span></h5></Link>
                            <h5><small
                                className="h4 font-weight-light text-muted">{post.type}</small></h5>
                            <h5 className="h3 title"><small
                                className="h4 font-weight-light text-muted">{post.size}</small></h5>
                            <div className="mt-4"><a href="#pablo"
                                                     className="btn-icon-only rounded-circle btn btn-twitter">edit</a>
                                <a href="#pablo"
                                   className="btn-icon-only rounded-circle btn btn-dribbble"><i
                                    className="fa fa-trash"></i></a>

                            </div>
                            <br></br>
                            <a href={`/front/myParcels/${post._id}`} className="btn btn-secondary">Show Request</a>

                        </div>
                    </div>
                </div>
            </div>

        );
    }

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
                                {_.map(this.props.myparcels, post => {
                                    return this.renderPostSummary(post);
                                })}

                            </div>
                        </div>
                    </div>
                </Container></>
        );
    }
}

function mapStateToProps(state) {
    return {
        myparcels: state.pack.myparcels,
        currentUser: state.auth.user,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPackagesByUserId: id => dispatch(fetchPackagesByUserId(id)),
        AddRequest,
        getCurrentUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyParcel);
