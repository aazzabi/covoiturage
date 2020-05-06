import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPostsByUserId } from '../../actions/Blog/BlogAction';

class PostMine extends Component {

  componentDidMount() {

      this.props.fetchPostsByUserId();

  }



  renderPostSummary(post) {
      console.log(post)
    return (
      <div key={post._id}>
        <h3>
          <Link className="link-without-underline" to={`/posts/${post._id}`}>
            {post.title}
          </Link>
        </h3>
        {post.categories}
        <span className="span-with-margin text-grey"> • </span>
        <span className="span-with-margin text-grey"> • </span>
        <span className="span-with-margin text-grey">{new Date(post.time).toLocaleString()}</span>
        <hr />
      </div>
    );
  }

  render() {
      console.log(this.props.posts)
    return (
      <div className="post">
        <h2 className="mb-5">My Blog Posts</h2>
        {_.map(this.props.posts, post => {
          return this.renderPostSummary(post);
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      posts: state.posts
  };
}


export default connect(mapStateToProps, { fetchPostsByUserId })(PostMine);
