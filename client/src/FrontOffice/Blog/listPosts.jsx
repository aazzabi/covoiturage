import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../../actions/Blog/BlogAction';
import AuthHeader from "../../components/Headers/AuthHeader";
import {Card, CardBody, CardFooter, CardHeader, Container, Row} from "reactstrap";
import PostsTable from "./posts";
import PaginationsComp from "../Parcels/Pagination";

class ListPosts extends Component {
    state = {
        pageSize: 5,
        currentPage: 1,
    };

    componentDidMount() {
        this.props.fetchPosts();
    }

    onPageChange = (page) => {
        this.setState({currentPage: page});
    }


    handleChange = (name, value) => {
        this.setState({[name]: value, currentPage: 1});
    }

    render() {
        const {
            currentPage,
            pageSize
        } = this.state;
        const {posts} = this.props.posts;

        console.log(posts)
        return (
            <>
                <AuthHeader title="Add Parcels" lead=""/>
                <Container className="container">
                    <div className="justify-content-center row">
                        <div className="col-lg-12">
                            <div className="row">
                                <PostsTable pageSize={pageSize} currentPage={currentPage}
                                            posts={posts}/>
                            </div>
                            <PaginationsComp
                                itemsCount={posts.length}
                                pageSize={pageSize}
                                onPageChange={this.onPageChange}
                                currentPage={currentPage}
                            />
                        </div>
                    </div></Container>

            </>
        );
    }
}

function mapStateToProps(state) {
    return {posts: state.posts};
}

export default connect(mapStateToProps, {fetchPosts})(ListPosts);
