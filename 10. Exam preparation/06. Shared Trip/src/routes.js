const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const tripsController = require('./controllers/tripController');


// TODO add controller routes
router.use(homeController);
router.use('/auth', authController);
router.use('/trips', tripsController);
router.get('*', (req, res) => {
    res.redirect('/404');
});



module.exports = router;