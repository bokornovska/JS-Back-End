const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const auctionService = require('../services/auctionService');
const { category } = require('../constants');

const { getErrorMessage } = require('../utils/errorUtils');

// async function checkIsOwner(req, res, next) {
//     let book = await bookService.getOne(req.params.bookId);

//     if (book.owner == req.user._id) {
//         next();
//     } else {
//         res.redirect(`/books/${req.params.bookId}/details`);
//     }
// }

// ----------------------CATALOG-------------------------------------------

router.get('/catalog', async (req, res) => {

    const auction = await auctionService.getAll();

    res.render('auction/catalog', { auction });
});

// // // ------------------------------SEARCH-----------------------------------------

// // router.get('/search', async (req, res) => {

// //     const { name, paymentMethod } = req.query;
// //     const crypto = await cryptoService.search(name, paymentMethod);

// //     res.render('crypto/search', { crypto });
// // });

// -----------------------------DETAILS-----------------------------------

router.get('/:auctionId/details', async (req, res) => {

    const auction = await auctionService.getOne(req.params.auctionId);

    const isOwner = auction.owner == req.user?._id;
    // const isInWishlist = book.wishList?.some(id => id == req.user?._id);


    res.render('auction/details', { auction, isOwner });
});

// // --------------------------------WISH--------------------------------------

// router.get('/:bookId/wish', isAuth, async (req, res) => {

//     try {
//         await bookService.wish(req.user._id, req.params.bookId);

//         res.redirect(`/books/${req.params.bookId}/details`);
//     } catch (error) {
//         return res.status(400).render('404', { error: getErrorMessage(error) });
//     }

// });


// // ----------------------------------EDIT---------------------------------------

// router.get('/:bookId/edit', isAuth, checkIsOwner, async (req, res) => {

//     const book = await bookService.getOne(req.params.bookId);

//     // const paymentMethods = Object.keys(paymentMethodsMap).map(key => ({
//     //     value: key,
//     //     label: paymentMethodsMap[key],
//     //     isSelected: crypto.paymentMethod == key,
//     // }));


//     res.render('books/edit', { book });
// });

// router.post('/:bookId/edit', isAuth, checkIsOwner, async (req, res) => {

//     const bookData = req.body;

//     await bookService.edit(req.params.bookId, bookData)
//     //todo: check if owner


//     res.redirect(`/books/${req.params.bookId}/details`);
// })

// // ----------------------------------DELETE---------------------------------------

// router.get('/:bookId/delete', isAuth, async (req, res) => {

//     await bookService.delete(req.params.bookId)

//     res.redirect('/books/catalog');

// });

// ---------------------------------CREATE-------------------------------------------

router.get('/create', isAuth, (req, res) => {
    res.render('auction/create');
});

router.post('/create', isAuth, async (req, res) => {

    const auctionData = req.body;

    try {
        await auctionService.create(req.user._id, auctionData);

    } catch (error) {
        return res.status(400).render('auction/create', { error: getErrorMessage(error) });
    }

    res.redirect('/auction/catalog');
});

// // ---------------------------------PROFILE----------------------------------------

// router.get('/profile', isAuth, async (req, res) => {

//     const userId = req.user._id;
//     let wished = await bookService.getMyWishBook(userId);
//     res.render('/books/profile');
// })

// // // router.get('/profile', isAuth, async (req, res) => {
// //     const userId = req.user._id;
// //     let wished = await bookServices.getMyWishBook(userId);
// //     res.render('profile', { title: 'Profile', wished });
// // });



module.exports = router;