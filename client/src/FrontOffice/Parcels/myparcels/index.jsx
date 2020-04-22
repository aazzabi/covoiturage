import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {AddRequest, fetchPackagesByUserId, fetchPostById} from '../../../actions/Parcels/PackagesActions';
import {getCurrentUser} from "../../../actions/authActions";
import AuthHeader from "../../../components/Headers/AuthHeader";
import {Container} from "reactstrap";

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
        return (
            <div key={post._id}>
                <h3>
                    <Link className="link-without-underline" to={`/posts/${post._id}`}>
                        {post.title}
                    </Link>
                </h3>
                <span className="span-with-margin text-grey"> • </span>
                <span className="span-with-margin text-grey">{post.type}</span>
                <span className="span-with-margin text-grey"> • {post.size}</span>
                <hr/>
            </div>
        );
    }

    render() {
        return (
            <>
                <AuthHeader title="Add Parcels" lead=""/>
                <Container className="container">
                    <div className="justify-content-center row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="post">
                                    <h2 className="mb-5">My Blog Posts</h2>
                                    {_.map(this.props.myparcels, post => {
                                        return this.renderPostSummary(post);
                                    })}
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
