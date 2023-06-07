const { isAuth } = require('../01. Book Talk_Author\'s Solution/src/middlewares/authMiddleware');
const bookService = require('../services/bookService')

const router = require('express').Router();

router.get('/', (req,res) => {
    console.log(req.user);
    res.render('home');
});

module.exports = router;

router.get('/profile',isAuth, async (req,res) => {

    const userId = req.user._id;
    let wished = await bookService.getMyWishBook(userId);
    res.render('profile')
})

// // router.get('/profile', isAuth, async (req, res) => {
//     const userId = req.user._id;
//     let wished = await bookServices.getMyWishBook(userId);
//     res.render('profile', { title: 'Profile', wished });
// });