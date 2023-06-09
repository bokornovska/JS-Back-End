const router = require('express').Router();

const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

// --------------------------------- REGISTER -----------------------------------------------

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {

    const { email, password, repeatPassword, skillsDescription } = req.body;

    try {

        const token = await authService.register(email, password, repeatPassword, skillsDescription);

        res.cookie('auth', token);
        res.redirect('/');

    } catch (error) {
        res.status(400).render('auth/register', { error: getErrorMessage(error) })
    }

});


// ------------------------------------LOGIN-------------------------------------------------------
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token);
        res.redirect('/');

    } catch (error) {
        return res.status(404).render('auth/login', { error: getErrorMessage(error) })
    }

});

// ------------------------------------------------LOGOUT------------------------------------

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});


module.exports = router;