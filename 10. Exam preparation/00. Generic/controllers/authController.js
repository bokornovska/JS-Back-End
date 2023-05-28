const router = require('express').Router();

const authService = require('../services/authService');

// --------------------------------- REGISTER -----------------------------------------------

router.get('/register', (req,res) => {
    res.render('auth/register');
});

router.post('/register', async (req,res) => {

    const {username, email, password, repeatPassword} = req.body;

    await authService.register(username, email, password, repeatPassword);

    // TODO login automatically

    res.redirect('/');
});


// ------------------------------------LOGIN-------------------------------------------------------
router.get('/login', (req,res) => {
    res.render('auth/login');
});

router.post('/login', (req,res) => {

    const {email, password} = req.body;


});




module.exports = router;