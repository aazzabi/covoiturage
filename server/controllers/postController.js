const {
    body, param, query,
} = require('express-validator');

const Post = require('../models/Blogs');

const postController = {
    findAllBlogs: [
        query('limit').toInt(),
        query('offset').toInt(),

        (req, res, next) => {
            const { offset, limit } = req.query;

            Post.find({}, {}, {
                skip: offset,
                limit,
            })
                .then((posts) => {
                    res.status(202).json(posts);

                    next();
                })
                .catch(next);
        },

    ],

    findPostById: [

        param('id').isMongoId(),
        (req, res, next) => {
            Post.findById(req.params.id)
                .then((post) => {
                    if (!post) {
                        const err = new Error('Blog post not found ');
                        err.name = 'NotFoundError';
                        throw err;
                    }

                    res.status(202).json(post);

                    next();
                })
                .catch(next);
        },

    ],
    findPostByCategorie: [
        (req, res, next) => {
            Post.find({ categories: req.params.categories })
                .then((post) => {
                    if (!post) {
                        const err = new Error('Blog post not found for the given permalink');
                        err.name = 'NotFoundError';
                        throw err;
                    }

                    res.status(202).json(post);

                    next();
                })
                .catch(next);
        },

    ],
    createPost: [
        body('title').isString().trim().isLength({ max: 500 }),
        body('content').isString().trim()
            .isLength({ max: 500 }),
        body('tags').toArray().isLength({ min: 1 }),
        body('categories.*').isMongoId(),
        body('user.*').isMongoId(),
        body('publishAt'),
        body('modifyAt'),

        (req, res, next) => {
            Post.create(req.body)
                .then((post) => {
                    res.status(202).json(post);

                    next();
                })
                .catch(next);
        },

    ],
    updatePost: [
        param('id').isMongoId(),
        body('title').optional({ checkFalsy: true }).isString().trim()
            .isLength({ max: 500 }),
        body('content').optional({ checkFalsy: true }).isString().trim()
            .isLength({ max: 500 }),
        body('tags').optional({ checkFalsy: true }).toArray()
            .isLength({ min: 1 }),
        body('categories.*').isMongoId(),
        body('user.*').isMongoId(),

        (req, res, next) => {
            const { id } = req.params;
            const replacement = req.body;
            const options = {
                new: true,
                useFindAndModify: false,
            };

            replacement.updated = new Date();

            Post.findByIdAndUpdate(id, replacement, options)
                .then((post) => {
                    if (!post) {
                        const err = new Error('Blog post not found ');
                        err.name = 'NotFoundError';
                        throw err;
                    }

                    res.status(202).json(post);

                    next();
                })
                .catch(next);
        },


    ],
    deletePost: [
        param('id').isMongoId(),

        (req, res, next) => {
            Post.findByIdAndDelete(req.params.id)
                .then(() => {
                    res.status(204);
                    next();
                })
                .catch(next);
        },
    ],
};

module.exports = postController;
