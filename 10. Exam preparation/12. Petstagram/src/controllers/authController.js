const router = require('express').Router();

const authService = require('../services/authService');

// ------------------------------------------------LOGIN---------------------------------------------------------
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {

    // TODO: check if the fields are the same
    const { username, password } = req.body;

    await authService.login(username, password);

    res.send('Logged in')
});

// ---------------------------------------------REGISTER------------------------------------------------
router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {

    // TODO: check if fields are the same
    const { username, email, password, repass } = req.body;

    await authService.register({ username, email, password, repass });

    res.send('registered')
})




module.exports = router;