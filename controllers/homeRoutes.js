const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/', async (req, res) => {
    try {

        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['comment_text'],
                }
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', { 
            posts, 
            logged_in: req.session.logged_in 
        });

    } catch (err) {

        res.status(500).json({message: "An error occurred. Please try again later."});

    }
});

// login route
router.all('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;