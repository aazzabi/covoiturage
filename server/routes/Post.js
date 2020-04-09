var express = require('express');
//const commentController = require('../controllers/commentController');
const postController = require('../controllers/postController');

const router = express.Router();

router.route('/')
    .get(postController.findAllBlogs)
    .post(postController.createPost);

router.route('/:id')
    .get(postController.findPostById)
    .put(postController.updatePost)
    .delete(postController.deletePost);

router.route('/Categorie/:Categorie')
    .get(postController.findPostByCategorie);
/*
router.route('/:id/comments')
    .get(commentController.findAllPostComments)
    .post(commentController.createComment);
router.route('comments/:id')
    .get(commentController.findCommentById)
    .put(commentController.updateComment)
    .delete(commentController.deleteComment);

 */
module.exports = router;
