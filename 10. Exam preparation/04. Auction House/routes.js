const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const houseController = require('./controllers/houseController');

router.use(homeController);
router.use(authController);
router.use('/houses', houseController);
router.all('*', (req, res) => {
    res.render('home/404')
});

module.exports = router;