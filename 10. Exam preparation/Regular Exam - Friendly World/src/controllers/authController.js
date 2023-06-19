const router = require('express').Router();

const { TOKEN_KEY } = require('../config/config');
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/error');

// // ------------------------------------------------LOGIN---------------------------------------------------------
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie(TOKEN_KEY, token);

        res.redirect('/')

    } catch (err) {
        res.render('auth/login', { error: getErrorMessage(err) })
    }

});

// // ---------------------------------------------REGISTER------------------------------------------------
router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {

    const { email, password, repass } = req.body;

    try {
        const token = await authService.register({ email, password, repass });

        res.cookie(TOKEN_KEY, token);
        res.redirect('/');

    } catch (err) {
        res.render('auth/register', { error: getErrorMessage(err), email });
    }


});

// // -----------------------------------------------LOGOUT-----------------------------------------------------

router.get('/logout', (req, res) => {
    res.clearCookie('token');

    res.redirect('/')
})

module.exports = router;