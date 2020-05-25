import React, {Component} from 'react';
import {connect} from 'react-redux';

import PostBody from './post_body';
import Comments from './comments';
import CommentNew from './comment_new';
import PostEdit from './post_edit';

import {fetchPost, deletePost} from '../../../actions/Blog/BlogAction';
import AuthHeader from "../../../components/Headers/AuthHeader";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader, Col,
  Container, Form,
  FormGroup,
  InputGroup,
  InputGroupAddon, InputGroupText,
  Row
} from "reactstrap";
import {Link} from "react-router-dom";
const serverUrl = "http://127.0.0.1:8887/";

class PostDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {  // component state: being read or being edited
            beingEdit: false,
            poste:{},
        };
    }

   async componentDidMount() {

        this.setState({
            beingEdit: false
        });

        const {id} = this.props.match.params;


           await this.props.fetchPost(id);


    }

    handleEditSuccess() {
        this.setState({
            beingEdit: false
        });
    }

    onEditClick() {
        this.setState({
            beingEdit: true
        });
    }

    onDeleteClick() {
        const {id} = this.props.match.params;
        this.props.deletePost(id, (path) => {
            this.props.history.push(path);
        });
    }

    renderDeleteConfirmModal() {
        return (
            <div className="modal fade" id="deleteConfirmModal" tabIndex="-1" role="dialog"
                 aria-labelledby="deleteConfirmModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteConfirmModalLabel">Confirm Delete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this post with its
                                comments? <strong>Attention!</strong> This delete operation cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal"
                                    onClick={this.onDeleteClick.bind(this)}>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderUpdateAndDeleteButton() {
            return (
                <div>

                </div>
            );

    }

    render() {

        if (!this.props.poste) {
            return "nothing";
        }

        if (this.state.beingEdit) {
            return (
                <PostEdit
                    post={this.props.post}
                    onEditSuccess={this.handleEditSuccess.bind(this)}
                    history={this.props.history}
                    state={this.props.history.location.state}
                    action={this.props.history.action}
                />
            );
        }

        return (
            <>
                <AuthHeader title="post list" lead=""/>
                <Container className="mt--8 pb-5">
                        <Card>
                            <div className="post">
                              <CardBody>
                                <PostBody post={this.props.poste}/>
                                {this.renderUpdateAndDeleteButton()}
                              </CardBody>
                              <CardFooter>
                                <Comments postId={this.props.match.params.id}/>
                                  <br></br>
                                <CommentNew
                                    postId={this.props.match.params.id}
                                    history={this.props.history}
                                    state={this.props.history.location.state}
                                    action={this.props.history.action}
                                />

                                {this.renderDeleteConfirmModal()}
                              </CardFooter>
                            </div>
                        </Card>
                </Container>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        poste: state.posts.poste,
        //allowChange: auth.allowChange,
    };
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostDetail);
