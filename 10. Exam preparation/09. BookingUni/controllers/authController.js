const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register')
});

authController.post('/register', async (req, res) => {
    console.log(req.body);
    res.redirect('/auth/register')
});

module.exports = authController;