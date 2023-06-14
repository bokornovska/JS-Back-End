const router = require('express').Router();

const { TOKEN_KEY } = require('../config/config');
const authService = require('../services/authService');
const {getErrorMessage} = require('../utils/error');

// ------------------------------------------------LOGIN---------------------------------------------------------
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {

    // TODO: check if the fields are the same
    const { username, password } = req.body;

    const token = await authService.login(username, password);

    res.cookie(TOKEN_KEY, token);

    // TODO: check the redirect
    res.redirect('/')
});

// ---------------------------------------------REGISTER------------------------------------------------
router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {

    // TODO: check if fields are the same
    const { username, email, password, repass } = req.body;

    try {
        await authService.register({ username, email, password, repass });
        res.redirect('/auth/login');

    } catch (err) {
        res.render('auth/register', { error: getErrorMessage(err) })
    }


});

// -----------------------------------------------LOGOUT-----------------------------------------------------

router.get('/logout', (req, res) => {
    res.clearCookie('token');

    // TODO: chek redirection
    res.redirect('/')
})

module.exports = router;