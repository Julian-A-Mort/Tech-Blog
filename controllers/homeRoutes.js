const router = require('express').Router();
const { Comment, User, Post } = require('../models');
const withAuth = require('../middleware/auth');
const bcrypt = require('bcrypt');


// Route for home page
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }, { model: Comment }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        // Render the homepage with posts and loggedIn status
        res.render('homepage', { 
            posts, 
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Route for the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

// Handle the login form submission
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).send('Invalid credentials');
        }

        req.session.loggedIn = true;
        req.session.username = user.username;
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});


//  Sign-up form 
router.get('/register', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('register');
});

// sign-up form submission
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });

        req.session.loggedIn = true;
        req.session.username = newUser.username;
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
