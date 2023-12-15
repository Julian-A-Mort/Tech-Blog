const router = require('express').Router();
const { Comment, User, Post } = require('../models');
const withAuth = require('../middleware/auth');

// Route for home page
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }, { model: Comment }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render(homepage, { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render(login);
});

// Route for the registration page
router.get('/register', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render(register);
});

module.exports = router;
