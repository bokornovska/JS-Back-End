const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const adService = require('../services/adService');
// const { paymentMethodsMap } = require('../constants')

const { getErrorMessage } = require('../utils/errorUtils');

// ----------------------CATALOG-------------------------------------------

router.get('/catalog', async (req, res) => {

    const ad = await adService.getAll();

    res.render('ad/catalog', { ad });
});

// // ------------------------------SEARCH-----------------------------------------

// router.get('/search', async (req, res) => {

//     const { name, paymentMethod } = req.query;
//     const crypto = await cryptoService.search(name, paymentMethod);

//     res.render('crypto/search', { crypto });
// });

// -----------------------------DETAILS-----------------------------------

router.get('/:adId/details', async (req, res) => {

    const ad = await adService.getOne(req.params.adId);

    const isAuthor = ad.author == req.user?._id;
    const hasApplied = ad.usersApplied?.some(id => id == req.user?._id);
    const authorEmail = ad.author;
    console.log(authorEmail);
    // const usersApplied = Object.values(ad.usersApplied);
    // console.log(usersApplied);

    res.render('ad/details', { ad, authorEmail, isAuthor, hasApplied});
});

// // --------------------------------APPLY--------------------------------------

router.get('/:adId/apply', isAuth, async (req, res) => {

    try {
        await adService.apply(req.user._id, req.params.adId);

        res.redirect(`/ad/${req.params.adId}/details`);
    } catch (error) {
        return res.status(400).render('404', { error: getErrorMessage(error) });
    }

});


// // ----------------------------------EDIT---------------------------------------

router.get('/:adId/edit', isAuth, async (req, res) => {

    const ad = await adService.getOne(req.params.adId);

    res.render('ad/edit', { ad });
});

router.post('/:adId/edit', isAuth, async (req, res) => {

    const adData = req.body;

    await adService.edit(req.params.adId, adData)
    //todo: check if owner


    res.redirect(`/ad/${req.params.adId}/details`);
})

// ----------------------------------DELETE---------------------------------------

router.get('/:adId/delete', isAuth, async (req, res) => {

    await adService.delete(req.params.adId)

    res.redirect('/ad/catalog');

});

// ---------------------------------CREATE-------------------------------------------

router.get('/create', isAuth, (req, res) => {
    res.render('ad/create');
});

router.post('/create', isAuth, async (req, res) => {

    const adData = req.body;

    try {
        await adService.create(req.user._id, adData);

    } catch (error) {
        return res.status(400).render('ad/create', { error: getErrorMessage(error) });
    }

    res.redirect('/ad/catalog');
});








module.exports = router;