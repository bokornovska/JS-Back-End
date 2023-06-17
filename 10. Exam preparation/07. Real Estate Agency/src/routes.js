const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const housingController = require('./controllers/housingController');


// TODO add controller routes
router.use(homeController);
router.use('/auth', authController);
router.use('/housing', housingController);
// router.get('*', (req, res) => {
//     res.redirect('/404');
// });



module.exports = router;