import React, { Component } from 'react';
import cogoToast from 'cogo-toast';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { addComment } from "../../services/FeedBack/FeedBackService";

export default class AddComment extends Component {

  constructor(props){
    super(props);
   
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        content: ''
    }
  }
  
  onChangeContent(e){
      this.setState({
          content : e.target.value
      });
  }

   onSubmit(e) {
       e.preventDefault();
       const comment = {
           content: this.state.content,
       };
       const idUser = jwt_decode(localStorage.getItem("jwtToken"))._id;
       if (idUser === null) {
           console.log('not logged in');
           const {hide} = cogoToast.warn('Click to login & comment', {
               onClick: () => {
                   hide();
                   window.location = 'front/login';
               },
           });
       } else {

           addComment(idUser, this.props.user, comment)
               .then(res => {
                   const json = {type: 'comment'};
                   json.data = res.data;
                   console.log(json);
                   this.props.actions.send(JSON.stringify(json));
                   this.setState({content: ''});
                   cogoToast.success('comment added succesfully', {hideAfter: 5});
                   this.props.actions.emit("broadcast-comment", res.data);
               })
               .catch(err => cogoToast.error('Failed adding comment, please try again!', {hideAfter: 5})
                   .then(() => this.setState({content: ''})));
       }
   }
  render() {
    return (
      <div>
          <strong>Add a Comment</strong>
      <form onSubmit={this.onSubmit} >
          <div className="form-group">
            <textarea rows="5"
                required
                className="form-control"
                value={this.state.content}
                placeholder="Type a comment"
                onChange={this.onChangeContent}>
            </textarea>
          </div>
          <div className="form-group" align="right">
            <input type="submit"
                className="btn btn-dark"
                value="Post Comment">
            </input>
          </div>
      </form>
      </div>
    );
  }
}
