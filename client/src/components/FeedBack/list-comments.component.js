import React, { Component } from 'react';
import cogoToast from 'cogo-toast';
import moment from 'moment';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {
  addUserUpDownVoteComment,
  allComments, countUpDownVoteComment,
  RemoveUserUpDownVoteComment,
  verifIfUserUpDownVoteComment
} from "../../services/FeedBack/FeedBackService";
class Comment extends Component {

    constructor(props){
      super(props);
      this.handleUpvoteDownvote = this.handleUpvoteDownvote.bind(this);
      this.state = {
        upvoted : false,
        downvoted : false,
        publisher : '',
        nbUpVotes : 0,
        nbDownVotes: 0,
        newNbUpVote:0,
        newNbDownVotes : 0
      }


    }
    componentDidMount(){
      const idUser = jwt_decode(localStorage.getItem("jwtToken"))._id;
      if(idUser === null){
        console.log('not logged in');
      }
      else{
        verifIfUserUpDownVoteComment(this.props.comment._id ,idUser,"upVote")
          .then(resp =>{
            if (resp.data)
            {
              console.log(resp);
              this.setState({upvoted : true});
              console.log("hhhhhhhhh");
            }
            verifIfUserUpDownVoteComment(this.props.comment._id ,idUser,"downVote")
                .then(resp =>{
                  if (resp.data)
                  {
                    this.setState({downvoted : true})
                  }
                  countUpDownVoteComment(this.props.comment._id,"upVote").then(r => {
                    this.setState({nbUpVotes : r.data});
                    countUpDownVoteComment(this.props.comment._id,"downVote").then(r => {
                      this.setState({nbDownVotes : r.data });
                      console.log("nb down votes"+ this.state.nbDownVotes)

                    });
                  });
                }).catch(err => console.log(err));
          })
          .catch(err => console.log(err));  
        }




    }

    handleUpvoteDownvote(e){
      console.log(e.target.name);
      console.log(this.props);
      const json = { type: e.target.name };
      json.data = this.props;
      console.log(json);
      const idUser = jwt_decode(localStorage.getItem("jwtToken"))._id;
      if (idUser === null) {
       const { hide } = cogoToast.warn('Click to login & upvote/downvote.', {
        onClick: () => {
          hide();
          window.location = 'front/login';
        },
      });
      }
      else {
        console.log(this.state.publisher);
        
        if(this.state.publisher == json.data.comment.owner._id){
          cogoToast.error(`You cant ${e.target.name} your own comment!`, { hideAfter : 5 })
        }
        else {
        if(e.target.name === "upvote"){
         /* this.setState({newNbUpVotes : this.state.nbUpVotes+1});
          var b = this.state.nbUpVotes;
          this.setState({nbUpVotes : b });*/
          if(this.state.downvoted){
            /*  this.setState({newNbDownVotes : this.state.newNbDownVotes-1});
             var a = this.state.newNbDownVotes ;
             this.setState({nbDownVotes : a});*/
            RemoveUserUpDownVoteComment(this.props.comment._id ,idUser,"downVote").then(r =>  this.setState({downvoted : false}));
          }

          addUserUpDownVoteComment(this.props.comment._id ,idUser,"upVote").then(r => this.setState({upvoted : true}) );
          console.log(this.state.upvoted);

        }
        else {
          /*  this.setState({newNbDownVotes : this.state.nbDownVotes+1});
           var d = this.state.newNbDownVotes;
           this.setState({nbDownVotes : d });*/
          if(this.state.upvoted){
            /*  this.setState({newNbUpVotes : this.state.nbUpVotes-1});
             var c = this.state.newNbUpVotes;
             this.setState({nbUpVotes : c}); */
            console.log("downVote upvoted");
            RemoveUserUpDownVoteComment(this.props.comment._id ,idUser,"upVote").then(r =>  this.setState({upvoted : false}));

          }
          console.log("downvote add");
          addUserUpDownVoteComment(this.props.comment._id ,idUser,"downVote").then(r => this.setState({downvoted : true}) );

        }
        //this.props.socket.send(JSON.stringify(json));
        }
      }
    }

    render() {
      let likeimgurl = this.state.upvoted ? process.env.PUBLIC_URL + '/logos/liked.png' : process.env.PUBLIC_URL + '/logos/like.png';
      let dislikeimgurl = this.state.downvoted ? process.env.PUBLIC_URL + '/logos/disliked.png' : process.env.PUBLIC_URL + '/logos/dislike.png';

      return (
        <div className="card">
          <div className="row">
            <div className="col-md-10 px-3">
              <div className="card-block px-3">
                <h5 className="card-title text-dark" style={{marginTop: '10px', 'fontWeight':'bolder'}}>{this.props.comment.owner.username} </h5>
                <p className="card-text" style={{fontSize: '16px'}}>{this.props.comment.content }</p>
                <p className="text-muted" style={{fontSize: '13px'}}><img src={process.env.PUBLIC_URL + '/logos/clock.png'} style={{width: '13px', height: '13px'}} />&nbsp;&nbsp;{moment(Date.parse(this.props.comment.createdAt)).fromNow()}</p>
              </div>
            </div>
            <div className="col-md-2 px-3">
              <div>
                <br/>
                <div> <input type="image" disabled={this.state.upvoted} onClick={this.handleUpvoteDownvote} name="upvote" src={likeimgurl}  alt="upvote" width="30" height="30" /><span  style={{fontSize: '16px', 'fontWeight': 'bolder', 'verticalAlign':'6px'}}>&nbsp;&nbsp;&nbsp;{this.state.nbUpVotes}</span> </div>
                <div> <input type="image" disabled={this.state.downvoted} onClick={this.handleUpvoteDownvote} name="downvote" src={dislikeimgurl}  alt="downvote" width="30" height="30" /><span style={{fontSize: '16px', 'fontWeight': 'bolder', 'verticalAlign':'6px'}}>&nbsp;&nbsp;&nbsp;{this.state.nbDownVotes}</span><br/></div>
              </div>
            </div>
          </div>
        </div>
    )

    }

}

export default class ListComments extends Component {

  constructor(props){
    super(props);
    this.state = { comments: [] };

    this.props.actions.on("new-comment", chat => {
      let currentcomments = this.state.comments;
      currentcomments.push(chat);
      this.setState({
        comments: currentcomments
      });
    });
  }

  componentWillMount(){
    console.log(this.props.user);
    allComments(this.props.user)
      .then(resp =>{ this.setState({ comments : resp.data })  ; console.log(this.state.comments)})
      .catch(err => console.log(err));


  }

  componentWillReceiveProps(nextProps){

    const data = JSON.parse(nextProps.comment);
    console.log(data.data);
    if(data.type === "upvote" || data.type === "downvote"){
      let cloneComments = [...this.state.comments];
      const foundIndex = cloneComments.findIndex(x => x._id == data.data.comment._id );
      console.log(foundIndex);
      cloneComments[foundIndex] = data.data.comment;

      this.setState({ comments : cloneComments });
    }
    else if(data.type === "comment"){
      this.setState({ comments : [data.data, ...this.state.comments] })
    }
  }

  commentList() {
    return this.state.comments.map(currentcomment => {
      return <Comment comment={currentcomment} socket={this.props.actions} key={currentcomment._id}/>;
    })
  }


  render() {
    return (
      <div className="d-flex flex-column">
        <strong>Comments</strong>
        { this.commentList() }
     </div>
    );
  }
}
