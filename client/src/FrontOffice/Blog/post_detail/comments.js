import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments} from '../../../actions/Blog/BlogAction';
import Col from "reactstrap/es/Col";

class Comments extends Component {

    componentDidMount() {
        this.props.fetchComments(this.props.postId);
    }


    renderComment(comment) {
        const serverUrl = "http://127.0.0.1:8887/";

        return (
            <div key={comment._id}>


                <div className="mb-1">
                    <Col md="12">
                        <div className="media-comment media">
                            <img className="avatar avatar-lg media-comment-avatar rounded-circle"
                                 src={`${serverUrl}${comment.user.avatar}`}/>
                            <div className="media">
                                <div className="media-comment-text"><h6
                                    className="h5 mt-0">         {comment.user ? comment.user.lastName : ""} {comment.user ? comment.user.firstName : ""}
                                </h6>
                                    <div className="text-justify" dangerouslySetInnerHTML={{__html: comment.content}}/>

                                    <div className="icon-actions"><a className="like active" href="#pablo"><i
                                        className="ni ni-like-2"></i><span
                                        className="text-muted">{new Date(comment.time).toLocaleString()}</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Col>
                </div>

                </div>

        );
    }

    render() {
        return (
            <div>
                <h3 className="mt-5 mb-4">Comments</h3>
                {_.map(this.props.comments, comment => {
                    return this.renderComment(comment);
                })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {comments: state.comments};
}

export default connect(mapStateToProps, {fetchComments})(Comments);
