const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

// GET all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{ model: User }, { model: Post }],
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST a new comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.body.user_id,
            post_id: req.body.post_id,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT update a comment by ID
router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!commentData[0]) {
            res.status(404).json({ message: 'No comment found with that ID!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a comment by ID
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with that ID!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Export the router
module.exports = router;