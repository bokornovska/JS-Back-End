const router = require('express').Router();


const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/404', (req, res) => {
    res.render('404');
});

// router.get('/profile', isAuth, async (req, res) => {

//     const photos = await photoService.getByOwner(req.user._id).lean();
//     res.render('profile', { photos, photoCount: photos.length });
// })

module.exports = router;