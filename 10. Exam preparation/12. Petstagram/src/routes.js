const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

// TODO add controller routes
router.use(homeController);
router.use('/auth', authController);



module.exports = router;