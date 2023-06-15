const router = require('express').Router();

router.get('/', (req,res) => {
    res.render('home');
});

router.get('/404', (req,res) => {
    res.render('404');
});

router.get('/profile', async (req,res) => {
    res.render('profile')
})

module.exports = router;