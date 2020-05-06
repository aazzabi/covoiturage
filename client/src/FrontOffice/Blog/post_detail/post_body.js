import React, { Component } from 'react';
import {CardBody} from "reactstrap";
const serverUrl = "http://127.0.0.1:8887/";

class PostBody extends Component {

  renderTags(tags) {
    return tags.map(tag => {
      return <span className="badge badge-info span-with-margin" key={tag}>{tag}</span>;
    });
  }

  render() {

    const {post} = this.props;

    return (
      <div>
        <h3>{post.title}</h3>
        {this.renderTags(post.categories)}

        <span className="span-with-margin"> • </span>

          <span className="span-with-margin">{new Date(post.time).toLocaleString()}</span>
        <hr />
          <img width="350" height="270"
               src={`${serverUrl}${post.files}`}
          />
        <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
        <hr />
      </div>
    );
  }
}

export default PostBody;
