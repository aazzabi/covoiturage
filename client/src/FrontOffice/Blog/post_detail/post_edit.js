import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {fetchPost, updatePost} from '../../../actions/Blog/BlogAction';
import AuthHeader from "../../../components/Headers/AuthHeader";
import {Button, Card, CardBody, Container, FormGroup, Input, Row} from "reactstrap";
import {getCurrentUser} from "../../../actions/authActions";

class PostEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {

      title:"",
      categories:"",
      content:"",
      currentUser: {},
      poste:{}

    };

  }


  async componentWillMount() {

    await this.props.getCurrentUser();


    if (this.props.currentUser._id === undefined){
      this.props.history.push('/front/login');
    }else {
      await this.props.fetchPost(this.props.match.params.id);



      //if (this.props.currentUser._id !== this.props.ride.driver){

      //  this.props.history.push('/front/ride/search');

     // }
     // else{

        console.log(this.props, 'props');
        this.setState({
          title: this.props.poste.title,
          categories: this.props.poste.categories,
          content: this.props.poste.content,

        })

      console.log(this.props.poste)

      //}

    }


  }



  confirme(e) {
    e.preventDefault();


        this.props.updatePost({
          _id: this.props.match.params.id,
          title: this.state.title,
          categories: this.state.categories,
          content: this.state.content,

        }, (path) => {  // callback 1: history push
          this.props.history.push(path);
        }, (path, state) => {
          this.props.history.replace(path, state);
        });
        console.log('done jsx');
       // this.props.history.push('/front/login');




  }

  handleChange = (name, value) => {
    this.setState({[name]: value});
  };


  renderTextEditor = (field) => (
    <fieldset className="form-group">
      <label>{field.label}</label>
      <input className="form-control" id="x" type="hidden" name="content" />
      <trix-editor input="x" {...field.input} />
    </fieldset>
  );

  renderAlert() {

    const { state } = this.props;
    const { action } = this.props;

    if (state && action === 'REPLACE') {
      return (
        <div className="alert alert-danger" role="alert">
          {`[${state.time}] --- `} <strong>Oops!</strong> {state.message}
        </div>
      );
    }
  }

  render() {

    const { handleSubmit } = this.props;

    return (
          <div style={{padding:25}}>


                <Card>
                  <div className="post">
                    <CardBody>
                      <div className="post">
                        {this.renderAlert()}
                        <h2 className="mb-5">Edit Your Post</h2>
                        <form>
                          <label
                              className="form-control-label"
                              htmlFor="exampleFormControlTextarea1"
                          >
                            title
                          </label>
                          <Input
                              placeholder="{this.props.ride.description}"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              type="text"
                              value={this.state.title}
                              onChange={event => this.handleChange('title', event.target.value)}
                          />
                          <label
                              className="form-control-label"
                              htmlFor="exampleFormControlTextarea1"
                          >
                            categories
                          </label>
                          <Input
                              placeholder="{this.props.ride.description}"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              type="text"
                              value={this.state.categories}
                              onChange={event => this.handleChange('categories', event.target.value)}
                          />

                          <label
                              className="form-control-label"
                              htmlFor="exampleFormControlTextarea1"
                          >
                            content
                          </label>
                          <Input
                              placeholder="{this.props.ride.description}"
                              component={this.renderTextEditor}
                              id="exampleFormControlTextarea1"
                              rows="3"
                              type="textarea"
                              value={this.state.content}
                              onChange={event => this.handleChange('content', event.target.value)}
                          />

                          <Button type="submit" className="btn btn-primary" onClick={e => this.confirme(e)}>
                            Publish
                          </Button>
                        </form>
                      </div></CardBody></div></Card>
          </div>



    );
  }
}

PostEdit = reduxForm({
  form: 'post_edit',  // name of the form
})(PostEdit);

function mapStateToProps(state) {
  return {
          poste: state.posts.poste,
          currentUser: state.auth.currentUser,

  };
}

export default connect(mapStateToProps, { updatePost,fetchPost,getCurrentUser })(PostEdit);
