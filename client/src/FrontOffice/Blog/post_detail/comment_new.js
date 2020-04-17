import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createComment } from '../../../actions/Blog/BlogAction';
import { TrixEditor } from "react-trix";
class CommentNew extends Component {

  handleFormSubmit({ comment }) {
    const postId = this.props.postId;
      this.props.createComment({ comment, postId }, () => {
      document.querySelector("trix-editor").value = ""
    }, (path, state) => {
      this.props.history.replace(path, state);
    });
  }

  renderTextEditor = (field) => (
      <fieldset className="form-group">
        <input className="form-control" id="x" type="hidden" name="content" />
        <TrixEditor input="x" {...field.input} />
      </fieldset>
  );

  renderAlert() {


  }

  render() {

    const { handleSubmit } = this.props;

    return (
        <div>
          <h3 className="mt-5 mb-4">New Comment</h3>
          {this.renderAlert()}
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <Field name="comment" component={this.renderTextEditor} />
            <button action="submit" className="btn btn-primary">Post Your Comment</button>
          </form>
        </div>
    );
  }
}

CommentNew = reduxForm({
  form: 'comment_new',  // name of the form
})(CommentNew);

export default connect(null, { createComment })(CommentNew);
