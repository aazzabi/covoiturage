import axios from 'axios';
import { reset } from 'redux-form';
import {

    FETCH_POSTS,
    CREATE_POST,
    FETCH_POST,
    UPDATE_POST,
    DELETE_POST,
    CREATE_COMMENT,
    FETCH_COMMENTS,
} from '../types';

const ROOT_URL = 'http://localhost:3000/posts';

/**
 * Blog Post
 */

export function fetchPosts() {

    return function(dispatch) {
        axios.get(`${ROOT_URL}/posts`).then((response) => {
            dispatch({
                type: FETCH_POSTS,
                payload: response.data,
            });
        });
    }
}

export function createPost({ title, categories, content,files }, historyPush, historyReplace) {

    return function(dispatch) {
        console.log(files)
        axios.post(`${ROOT_URL}/posts`, {
            title,
            categories,
            content,
            files,
        }, {
        })
            .then((response) => {  // If create post succeed, navigate to the post detail page
                dispatch({
                    type: CREATE_POST,
                    payload: response.data,
                });
                historyPush(`/posts/${response.data._id}`);
            })
            .catch(({response}) => {  // If create post failed, alert failure message
                historyReplace('/posts/new', {
                    time: new Date().toLocaleString(),
                    message: response.data.message,
                });
            });
    }
}

export function fetchPost(id) {

    return function(dispatch) {
        axios.get(`${ROOT_URL}/posts/${id}`).then(response => {
            // console.log(response);
            dispatch({
                type: FETCH_POST,
                payload: response.data,
            });
        });
    }
}

export function updatePost({ _id, title, categories, content }, onEditSuccess, historyReplace) {

    return function(dispatch) {
        axios.put(`${ROOT_URL}/posts/${_id}`, {
            _id,
            title,
            categories,
            content,
        }, {
            headers: {authorization: localStorage.getItem('token')},  // require auth
        })
            .then((response) => {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data,
                });
                onEditSuccess();  // set beingEdit to false
                historyReplace(`/posts/${_id}`, null);
            })
            .catch(({response}) => {
                historyReplace(`/posts/${_id}`, {
                    time: new Date().toLocaleString(),
                    message: response.data.message,
                });
            });
    }
}

export function deletePost(id, historyPush) {

    return function(dispatch) {
        axios.delete(`${ROOT_URL}/posts/${id}`, {
            headers: {authorization: localStorage.getItem('token')},  // require auth
        }).then((response) => {
            dispatch({
                type: DELETE_POST,
                payload: id,
            });
            historyPush('/posts');
        })
    }
}

export function fetchPostsByUserId() {

    return function(dispatch) {
        axios.get(`${ROOT_URL}/my_posts`, {
            headers: {authorization: localStorage.getItem('token')},  // require auth
        })
            .then((response) => {
                dispatch({
                    type: FETCH_POSTS,
                    payload: response.data,
                });
            });
    }
}

export function createComment({ comment, postId }, clearTextEditor, historyReplace) {

    return function(dispatch) {
        axios.post(`${ROOT_URL}/comments/${postId}`, { content: comment })
            .then((response) => {  // If success, clear the text editor
                dispatch({
                    type: CREATE_COMMENT,
                    payload: response.data,
                });
                dispatch(reset('comment_new'));  // - Clear form value (data)
                clearTextEditor();  // - Clear text editor (UI)
                historyReplace(`/posts/${postId}`, null);  // - clear alert message
            })
            .catch(({response}) => {  // If fail, render alert message

                // failure reason: un-authenticated
                if (!response.data.message) {
                    return historyReplace(`/posts/${postId}`, {
                        time: new Date().toLocaleString(),
                        message: 'You must sign in before you can post new comment.',
                    });
                }

                // failure reason: comment is empty
                historyReplace(`/posts/${postId}`, {
                    time: new Date().toLocaleString(),
                    message: response.data.message,
                });
            });
    }
}

export function fetchComments(postId) {

    return function(dispatch) {
        axios.get(`${ROOT_URL}/comments/${postId}`).then((response) => {
            dispatch({
                type: FETCH_COMMENTS,
                payload: response.data,
            });
        });
    }
}
