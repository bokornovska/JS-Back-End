const router = require('express').Router();

const tripService = require('../services/tripService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/profile', isAuth, async (req, res) => {

    const trips = await tripService.getByOwner(req.user._id).lean();
    res.render('profile', { trips, tripsCount: trips.length });
})

module.exports = router;