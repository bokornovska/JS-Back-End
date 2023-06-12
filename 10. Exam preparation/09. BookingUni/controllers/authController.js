const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

// ------------------------------------------------REGISTER---------------------------------------------------
authController.get('/register', (req, res) => {
    // TODO replace with actual view
    res.render('register')
});

authController.post('/register', async (req, res) => {

    try {
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required')
        };

        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don`t match')
        };

        const token = await register(req.body.username, req.body.password);

        // TODO: check assignment to see if register creates session
        res.cookie('token', token);

        res.redirect('/'); //TODO: check the assignment

    } catch (error) {
        console.log(error);
        const errors = parseError(error);

        // TODO: add errordisplay to actual template from asignment

        res.render('register', {
            errors,
            body: {
                username: req.body.username
            }
        });
    }

});

// --------------------------------------------------------LOGIN------------------------------------------------------------

authController.get('/login', (req, res) => {
    res.render('login');
});

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);

        res.cookie('token', token);

        // TODO: replace redirect by assignment

        res.redirect('/');
    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            errors,
            body: {
                username: req.body.username
            }
        });
    }
});

// ------------------------------------------------------------LOGOUT----------------------------------------------

authController.get('/logout', (req,res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;