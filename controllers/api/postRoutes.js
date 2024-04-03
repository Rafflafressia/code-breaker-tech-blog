const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// GET all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes:['username', 'createdAt'] }, { model: Comment, attributes:['comment_text'] }],
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET specific post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes:['username', 'createdAt'] }, { model: Comment, attributes:['comment_text'] }],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with that ID!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE specific post
router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!postData[0]) {
            res.status(404).json({ message: 'No post found with that ID!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with that ID!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;