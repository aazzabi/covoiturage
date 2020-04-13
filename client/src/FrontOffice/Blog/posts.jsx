import React from "react";

const PostsTable = ({posts, currentPage, pageSize}) => {
    const currentPackages = posts.slice((currentPage - 1) * pageSize, pageSize * currentPage);
    const serverUrl = "http://127.0.0.1:8887/";

    return (<>
            {!!posts &&
            currentPackages.map(post =>
                <div className="col-lg-4">

                    <div className="card" key={post._id}>
                        <img width="350" height="270"
                             src={`${serverUrl}${post.files}`}
                        />
                        <div className="card-body">
                            <div className="h2 mb-0 card-title"><a href={`/posts/${post._id}`}> {post.title}
                            </a></div>
                            <small className="text-muted">by John Snow on {new Date(post.time).toLocaleString()}</small>
                            <p
                                className="mt-4 card-text"><div
                                dangerouslySetInnerHTML={{__html: post.content}}/>
                            </p>
                            <div>
                                    <span
                                        className="badge badge-info badge-pill">{post.categories}</span>
                            </div>
                            <a href={`/posts/${post._id}`}
                                className="px-0 btn btn-link">View
                                article</a></div>
                    </div>
                </div>
            )}</>
    )
}
export default PostsTable;


