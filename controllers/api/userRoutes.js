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

// Login route
router.post('/login', async (req, res) => {
    try {

        console.log("Request: ", req.body)

        const userData = await User.findOne({ where: { username: req.body.username } });

        console.log("User Data: ", userData)

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.username = userData.username;
            req.session.logged_in = true;

        res.status(200).json({user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.log("Error: ", err);
        res.status(400).json({message: "An error occurred. Please try again later."});
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({user: userData, message: 'You are now logged in!'});
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// delete user
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id,
            },
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

// logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;