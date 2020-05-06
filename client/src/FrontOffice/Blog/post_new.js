import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {createPost} from '../../actions/Blog/BlogAction';
import AuthHeader from "../../components/Headers/AuthHeader";
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row} from "reactstrap";
import axios from "axios";
import {DropzoneArea} from "material-ui-dropzone";
import ReactQuill from "react-quill";
import SimpleHeader from "../../components/Headers/SimpleHeader";
import {getCurrentUser} from "../../actions/authActions";

class PostNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            categories: "",
            content: "",
            files: ""


        }
    }

    handleFormSubmit({title, categories, content}) {
        console.log(this.props.currentUser._id)
        const user = this.props.currentUser._id
        const files = this.state.files;
        console.log(this.state.content)

        this.props.createPost({
            title: this.state.title,
            categories: this.state.categories,
            content: this.state.content,
            files: this.state.files,
            user: this.props.currentUser._id
        }, (path) => {  // callback 1: history push
        }, (path, state) => {
        });
    }

    handleReactQuillChange = value => {
        this.setState({
            content: value
        });
    };
    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    renderTextEditor = (field) => (
        <fieldset className="form-group">
            <label>{field.label}</label>
            <input onChange={event => this.handleChange('content', event.target.value)} className="form-control" id="x"
                   type="hidden" name="content"/>
            <trix-editor input="x" {...field.input} />
        </fieldset>
    );

    renderAlert() {

        const {state} = this.props.history.location;
        const {action} = this.props.history;

        if (state && action === 'REPLACE') {
            return (
                <div className="alert alert-danger" role="alert">
                    {`[${state.time}] --- `} <strong>Oops!</strong> {state.message}
                </div>
            );
        }
    }

    handlesSave(files) {
        const data = new FormData();

        for (var x = 0; x < files.length; x++) {
            data.append('file', files[x])
            this.setState({files: files[x].name})
        }
        console.log(data)

        axios.post('http://localhost:3000/upload',
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(function () {
            console.log('SUCCESS!!');
        })
            .catch(function () {
                console.log('FAILURE!!');
            });

    }

    componentDidMount() {
        this.props.getCurrentUser();
    }

    render() {

        const {handleSubmit} = this.props;

        return (
            <>
                <SimpleHeader name="Add Blog" parentName="Forms"/>
                <Container className="mt--6" fluid>
                    <Row>
                        <div className="col">
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>
                                        <h3 className="mb-0">Server side</h3>
                                    </CardHeader>

                                    <CardBody>

                                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                                            <div className="form-row">
                                                <Col className="mb-3" md="4">

                                                    <Input name="title" id="titleC" placeholder="Enter your title"
                                                           type="text"
                                                           component={this.renderInput}
                                                           onChange={event => this.handleChange('title', event.target.value)}/>
                                                </Col>
                                                <Col className="mb-3" md="4">

                                                    <Input name="categories" id="categories"
                                                           placeholder="Enter your categories" type="text"
                                                           onChange={event => this.handleChange('categories', event.target.value)}/>
                                                </Col><br></br>

                                                <Col lg="12" md="12">

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
                                                />

                                                </Col>
                                                <hr></hr>
                                                <DropzoneArea
                                                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                                    maxFileSize={5000000}
                                                    onChange={this.handlesSave.bind(this)}
                                                    filesLimit={1}
                                                    files="files"
                                                />
                                            </div>
                                            <Button color="primary" type="submit">
                                                Submit form
                                            </Button>
                                        </form>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </Row></Container>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.auth.currentUser,
    }
}

PostNew = reduxForm({
    form: 'post_new',  // name of the form
})(PostNew);

export default connect(mapStateToProps, {createPost, getCurrentUser})(PostNew);


