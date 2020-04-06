
const {
    body, param, query, sanitizeBody,
} = require('express-validator');

const Comment = require('../models/comment');
const Post = require('../models/Blogs');

const commentController = {
    findAllPostComments: [
        param('id').isMongoId(),
        query('offset').toInt(),
        query('limit').toInt(),

        (req, res, next) => {
            Post.findById(req.params.id)
                .populate({ path: 'comments', model: Comment })
                .then((post) => {
                    if (!post) {
                        const err = new Error('Blog post not found');
                        err.name = 'NotFoundError';
                        res.json({
                            error: err
                        })
                    }

                    // Filter comments with query
                    const comments = req.query.q
                        ? post.comments.filter(({ content }) => content.includes(req.query.q))
                        : post.comments;

                    // Pagination
                    const offset = req.query.offset || 0;
                    const { limit } = req.query;

                    // Array bcause seconde arg should be set only if it's not zero
                    const sliceArgs = [offset];

                    if (limit) {
                        sliceArgs.push(offset + limit);
                    }

                    res.json({
                        comments: comments.slice(...sliceArgs)
                    })
                    next();
                })
                .catch(next);
        },


    ],
    findCommentById: [
        param('id').isMongoId(),
        (req, res, next) => {
            Comment.findById(req.params.id)
                .then((comment) => {
                    if (!comment) {
                        const err = new Error('Comment not found');
                        err.name = 'NotFoundError';
                        res.json({
                            error: err
                        })
                    }

                    res.json({
                        comments: comment
                    })
                    next();
                })
                .catch(next);
        },


    ],
    createComment: [
        param('id').isMongoId(),
        body('content').isString().trim().isLength({ max: 500 }),
        body('user').isMongoId(),

        (req, res, next) => {
            Post.findById(req.params.id)
                .then((post) => {
                    if (!post) {
                        const err = new Error('Blog post not found');
                        err.name = 'NotFoundError';
                        res.json({
                            error: err
                        })
                    }

                    // Create document first to use the ID
                    const comment = new Comment(req.body);

                    return Promise.all([
                        comment.save(),
                        post.updateOne({ $push: { comments: comment.id } }),
                    ]);
                })
                .then((response) => {
                    // Respond with saved comment
                    res.json({
                        comments: response
                    })
                    next();
                })
                .catch(next);
        },

    ],
    updateComment: [
        param('id').isMongoId(),

        body('content').isString().trim().isLength({ max: 500 }),



        (req, res, next) => {
            const { id } = req.params;
            const replacement = req.body;
            const options = {
                new: true,
                useFindAndModify: false,
            };

            delete replacement.published;
            delete replacement.user;

            Comment.findByIdAndUpdate(id, replacement, options)
                .then((comment) => {
                    if (!comment) {
                        const err = new Error('Comment not found');
                        err.name = 'NotFoundError';
                        res.json({
                            error: err
                        })
                    }

                    res.json({
                        comments: comment
                    })
                    next();
                })
                .catch(next);
        },

    ],
    deleteComment: [
        param('id').isMongoId(),


        (req, res, next) => {
            Comment.findByIdAndDelete(req.params.id)
                .then(() => {
                    res.status(204);
                    next();
                })
                .catch(next);
        },

    ],
};

module.exports = commentController;
