const router = require('express').Router();
const { isUser, isGuest } = require('../middleware/guards');
const { register, login } = require('../services/user');
const mapErrors = require('../util/mappers');


router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim().length < 4) {
            throw new Error('Password must be at least 4 characters long');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match');
        }

        const user = await register(req.body.email, req.body.firstName, req.body.lastName, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('register', { data: req.body, errors, title: 'Register' });
    }
});

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('login', { data: { email: req.body.email }, errors, title: 'Login' });
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;