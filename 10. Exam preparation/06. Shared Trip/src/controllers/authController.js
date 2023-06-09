const router = require('express').Router();

const { TOKEN_KEY } = require('../config/config');
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/error');

// ------------------------------------------------LOGIN---------------------------------------------------------
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {

    // TODO: check if the fields are the same
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie(TOKEN_KEY, token);

        // TODO: check the redirect
        res.redirect('/');

    } catch (err) {
        res.render('auth/login', { error: getErrorMessage(err) })
    }

});

// ---------------------------------------------REGISTER------------------------------------------------
router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {

    // TODO: check if fields are the same
    const { email, password, repass, gender } = req.body;

    try {
        // if not auto login after register
        // await authService.register({ username, email, password, repass });
        // res.redirect('/auth/login');

        const token = await authService.register({ email, password, repass, gender });

        res.cookie(TOKEN_KEY, token);
        res.redirect('/');

    } catch (err) {
        res.render('auth/register', { error: getErrorMessage(err), email });
        // next(err); //in index - errorHandler...???
    }
});

// -----------------------------------------------LOGOUT-----------------------------------------------------

router.get('/logout', (req, res) => {
    res.clearCookie('token');

    // TODO: chek redirection
    res.redirect('/')
})

module.exports = router;