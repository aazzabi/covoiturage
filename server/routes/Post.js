var express = require('express');





const Blog = require('../controllers/postController');

const router = express.Router();
/**
 * Blog Posts APIs
 */

router.get('/posts', Blog.fetchPosts);

router.post('/posts', Blog.createPost);

router.get('/posts/:id', Blog.fetchPost);

router.get('/allow_edit_or_delete/:id',  Blog.allowUpdateOrDelete);

router.put('/posts/:id', Blog.updatePost);

router.delete('/posts/:id',  Blog.deletePost);

router.get('/my_posts', Blog.fetchPostsByAuthorId);

/**
 * Blog Comment APIs
 */

router.post('/comments/:postId', Blog.createComment);

router.get('/comments/:postId', Blog.fetchCommentsByPostId);




module.exports = router;
