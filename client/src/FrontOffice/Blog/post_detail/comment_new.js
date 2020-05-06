import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {createComment} from '../../../actions/Blog/BlogAction';
import {TrixEditor} from "react-trix";
import ReactQuill from "react-quill";
import {Col, FormGroup, Row} from "reactstrap";
import {getCurrentUser} from "../../../actions/authActions";
import Buttons from "../../../views/pages/components/Buttons";

class CommentNew extends Component {

    componentDidMount() {
        this.props.getCurrentUser();
    }

    constructor(props) {
        super(props);
        this.state = {
            content: "",


        }
    }

    handleFormSubmit() {
        const postId = this.props.postId;
        const user = this.props.currentUser._id;
        const content = this.state.content;
        console.log(content)
        this.props.createComment({content, postId, user}, () => {
            this.setState({
                content: ""
            });
            document.querySelector("trix-editor").value = ""
        }, (path, state) => {
            this.props.history.replace(path, state);
        });
    }

    handleReactQuillChange = value => {
        this.setState({
            content: value
        });
    };

    renderAlert() {


    }

    render() {

        const {handleSubmit} = this.props;
        const serverUrl = "http://127.0.0.1:8887/";

        return (

            <div className="align-items-center media">
                <img alt="..." className="avatar avatar-lg rounded-circle mr-3"
    src={`${serverUrl}${this.props.currentUser.avatar}`}/>
                <div className="media-body">
                    {this.renderAlert()}
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="">
                        <Col md="6">
                            <FormGroup>
                                <ReactQuill
                                    value={this.state.content}
                                    onChange={this.handleReactQuillChange}
                                    theme="snow"
                                    modules={{
                                        toolbar: [
                                            ["bold", "italic"],
                                            ["link", "blockquote", "code", "image"],
                                            [
                                                {
                                                    list: "ordered"
                                                },
                                                {
                                                    list: "bullet"
                                                }
                                            ]
                                        ]
                                    }}
                                /></FormGroup></Col>
                        <button type="submit" className="btn btn-secondary">add Comment</button></form>

                </div>
            </div>

        );
    }
}

CommentNew = reduxForm({
    form: 'comment_new',  // name of the form
})(CommentNew);

function mapStateToProps(state) {
    return {
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps, {createComment, getCurrentUser})(CommentNew);
