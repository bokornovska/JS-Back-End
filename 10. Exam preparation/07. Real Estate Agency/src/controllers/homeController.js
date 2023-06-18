const router = require('express').Router();

const housingService = require('../services/housingService')
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    const houses = await housingService.getAll().limit(3);
    res.render('home', {houses});
});

router.get('/404', (req, res) => {
    res.render('404');
});

// router.get('/profile', isAuth, async (req, res) => {

//     const photos = await photoService.getByOwner(req.user._id).lean();
//     res.render('profile', { photos, photoCount: photos.length });
// })

module.exports = router;