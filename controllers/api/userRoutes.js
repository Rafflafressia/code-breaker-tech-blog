const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// Get all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [{ model: Post, attributes:['post_content'] }, { model: Comment }],
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [{ model: Post, attributes:['post_content'] }, { model: Comment }],
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with that ID!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;