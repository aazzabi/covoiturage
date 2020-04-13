import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {createPost} from '../../actions/Blog/BlogAction';
import AuthHeader from "../../components/Headers/AuthHeader";
import {Container, Row} from "reactstrap";
import axios from "axios";
import {DropzoneArea} from "material-ui-dropzone";

class PostNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: ""


    }}
    handleFormSubmit({title, categories, content}) {
        const files = this.state.files;
        console.log(files)
        this.props.createPost({title, categories, content, files}, (path) => {  // callback 1: history push
            this.props.history.push(path);
        }, (path, state) => {
            this.props.history.replace(path, state);
        });
    }

    renderInput = (field) => (
        <fieldset className="form-group">
            <label>{field.label}</label>
            <input
                className="form-control"
                {...field.input}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required ? 'required' : ''}
                disabled={field.disabled ? 'disabled' : ''}
            />
        </fieldset>
    );

    renderTextEditor = (field) => (
        <fieldset className="form-group">
            <label>{field.label}</label>
            <input className="form-control" id="x" type="hidden" name="content"/>
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

    render() {

        const {handleSubmit} = this.props;

        return (
            <>
                <AuthHeader title="Add Parcels" lead=""/>
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center">
                        <div className="post">
                            {this.renderAlert()}
                            <h2 className="mb-5">New Post</h2>
                            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                                <Field name="title" component={this.renderInput} type="text" label="Title:"
                                       placeholder="Enter your title" required={true}/>
                                <Field name="categories" component={this.renderInput} type="text" label="Categories:"
                                       placeholder="Enter your categories, use ',' to separate them" required={true}/>
                                <Field name="content" component={this.renderTextEditor} label="Content:"/>
                                <DropzoneArea
                                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                    maxFileSize={5000000}
                                    onChange={this.handlesSave.bind(this)}
                                    filesLimit={1}
                                    files="files"
                                />
                                <button action="submit" className="btn btn-primary">Publish</button>
                            </form>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

PostNew = reduxForm({
    form: 'post_new',  // name of the form
})(PostNew);

export default connect(null, {createPost})(PostNew);
