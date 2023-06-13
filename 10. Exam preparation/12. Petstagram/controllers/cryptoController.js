const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const cryptoService = require('../services/cryptoService');
const { paymentMethodsMap } = require('../constants')

const { getErrorMessage } = require('../utils/errorUtils');

// ----------------------CATALOG-------------------------------------------

router.get('/catalog', async (req, res) => {

    const crypto = await cryptoService.getAll();

    res.render('crypto/catalog', { crypto });
});

// ------------------------------SEARCH-----------------------------------------

router.get('/search', async (req, res) => {

    const { name, paymentMethod } = req.query;
    const crypto = await cryptoService.search(name, paymentMethod);

    res.render('crypto/search', { crypto });
});

// -----------------------------DETAILS-----------------------------------

router.get('/:cryptoId/details', async (req, res) => {

    const crypto = await cryptoService.getOne(req.params.cryptoId);

    const isOwner = crypto.owner == req.user?._id;
    const isBuyer = crypto.buyers?.some(id => id == req.user?._id);


    res.render('crypto/details', { crypto, isOwner, isBuyer });
});

// --------------------------------BUY--------------------------------------

router.get('/:cryptoId/buy', isAuth, async (req, res) => {

    try {
        await cryptoService.buy(req.user._id, req.params.cryptoId);

        res.redirect(`/crypto/${req.params.cryptoId}/details`);
    } catch (error) {
        return res.status(400).render('404', { error: getErrorMessage(error) });
    }

});


// ----------------------------------EDIT---------------------------------------

router.get('/:cryptoId/edit', isAuth, async (req, res) => {

    const crypto = await cryptoService.getOne(req.params.cryptoId);

    const paymentMethods = Object.keys(paymentMethodsMap).map(key => ({
        value: key,
        label: paymentMethodsMap[key],
        isSelected: crypto.paymentMethod == key,
    }));


    res.render('crypto/edit', { crypto, paymentMethods });
});

router.post('/:cryptoId/edit', isAuth, async (req, res) => {

    const cryptoData = req.body;

    await cryptoService.edit(req.params.cryptoId, cryptoData)
    //todo: check if owner


    res.redirect(`/crypto/${req.params.cryptoId}/details`);
})

// ----------------------------------DELETE---------------------------------------

router.get('/:cryptoId/delete', isAuth, async (req, res) => {

    await cryptoService.delete(req.params.cryptoId)

    res.redirect('/crypto/catalog');

});

// ---------------------------------CREATE-------------------------------------------

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {

    const cryptoData = req.body;

    try {
        await cryptoService.create(req.user._id, cryptoData);

    } catch (error) {
        return res.status(400).render('crypto/create', { error: getErrorMessage(error) });
    }

    res.redirect('/crypto/catalog');
});








module.exports = router;