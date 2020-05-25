import _ from 'lodash';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {fetchPostsByUserId, deletePost} from '../../actions/Blog/BlogAction';
import {
    Badge,
    Card,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Media,
    Table,
    UncontrolledDropdown
} from "reactstrap";
import PaginationsComp from "../../FrontOffice/Parcels/Pagination";
import PostsTableBack from "./PostsTableBack";
import Cards from "../../views/pages/components/Cards";
import CardBody from "reactstrap/es/CardBody";

class PostMine extends Component {
    state = {
        pageSize: 5,
        currentPage: 1,
    };

    async componentDidMount() {
        await this.props.fetchPostsByUserId();
    }

    onPageChange = (page) => {
        this.setState({currentPage: page});
    }


    handleChange = (name, value) => {
        this.setState({[name]: value, currentPage: 1});
    }


    deleteHandler(e, postId) {
        e.preventDefault();
        this.props.deletePost(postId, (path) => {
            this.props.history.push(path);
        });

    }
    render() {
        const {
            currentPage,
            pageSize
        } = this.state;
        const {posts} = this.props.posts;
        const currentPackages = posts.slice((currentPage - 1) * pageSize, pageSize * currentPage);
        const serverUrl = "http://127.0.0.1:8887/";

        console.log(posts)
        return (
            <>
                <br></br>
                <Container className="container">
                    <div className="justify-content-center row">
                        <div className="col-lg-12">
                            <div className="row">
                                <Card>
                                    <CardBody>
                                        <Table className="align-items-center" responsive>
                                            <thead className="thead-light">
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Categories</th>
                                                <th scope="col">time</th>
                                                <th scope="col"/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {!!posts &&
                                            currentPackages.map(post =>

                                                    <tr key={post._id}>
                                                        <th scope="row">
                                                            <Media className="align-items-center">
                                                                <a
                                                                    className="avatar rounded-circle mr-3"
                                                                    href="#pablo"
                                                                    onClick={e => e.preventDefault()}
                                                                >
                                                                    <img
                                                                        alt="..."
                                                                        src={`${serverUrl}${post.files}`}
                                                                    />
                                                                </a>
                                                                <Media>
                    <span className="mb-0 text-sm">
                        {post.title}
                    </span>
                                                                </Media>
                                                            </Media>
                                                        </th>
                                                        <td>
                                                            <Badge color="" className="badge-dot mr-4">
                                                                <i className="bg-warning"/>
                                                                {post.categories}
                                                            </Badge>
                                                        </td>
                                                        <td>{post.time}</td>

                                                        <td className="text-right">
                                                            <UncontrolledDropdown>
                                                                <DropdownToggle
                                                                    className="btn-icon-only text-light"
                                                                    href="#pablo"
                                                                    role="button"
                                                                    size="sm"
                                                                    color=""
                                                                    onClick={e => e.preventDefault()}
                                                                >
                                                                    <i className="fas fa-ellipsis-v"/>
                                                                </DropdownToggle>
                                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                                    <DropdownItem
                                                                        href={`/admin/Post_edit/${post._id}`}
                                                                    >
                                                                        Edit
                                                                    </DropdownItem>
                                                                    <DropdownItem
                                                                        onClick={e => this.deleteHandler(e, post._id)}
                                                                    >
                                                                        Delete
                                                                    </DropdownItem>

                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        </td>
                                                    </tr>
                                            )}
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </div>
                            <PaginationsComp
                                itemsCount={posts.length}
                                pageSize={pageSize}
                                onPageChange={this.onPageChange}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                </Container>

            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

export default connect(mapStateToProps, {fetchPostsByUserId, deletePost})(PostMine);
