const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const gameService = require('../services/gameService');
// const { paymentMethodsMap } = require('../constants');

const { getErrorMessage } = require('../utils/errorUtils');

// ----------------------CATALOG-------------------------------------------

router.get('/catalog', async (req, res) => {

    const games = await gameService.getAll();

    res.render('games/catalog', {games});
});

// // ------------------------------SEARCH-----------------------------------------

// router.get('/search', async (req, res) => {

//     const { name, paymentMethod } = req.query;
//     const crypto = await cryptoService.search(name, paymentMethod);

//     res.render('crypto/search', { crypto });
// });

// // -----------------------------DETAILS-----------------------------------

// router.get('/:cryptoId/details', async (req, res) => {

//     const crypto = await cryptoService.getOne(req.params.cryptoId);

//     const isOwner = crypto.owner == req.user?._id;
//     const isBuyer = crypto.buyers?.some(id => id == req.user?._id);


//     res.render('crypto/details', { crypto, isOwner, isBuyer });
// });

// // --------------------------------BUY--------------------------------------

// router.get('/:cryptoId/buy', isAuth, async (req, res) => {

//     try {
//         await cryptoService.buy(req.user._id, req.params.cryptoId);

//         res.redirect(`/crypto/${req.params.cryptoId}/details`);
//     } catch (error) {
//         return res.status(400).render('404', { error: getErrorMessage(error) });
//     }

// });


// // ----------------------------------EDIT---------------------------------------

// router.get('/:cryptoId/edit', isAuth, async (req, res) => {

//     const crypto = await cryptoService.getOne(req.params.cryptoId);

//     const paymentMethods = Object.keys(paymentMethodsMap).map(key => ({
//         value: key,
//         label: paymentMethodsMap[key],
//         isSelected: crypto.paymentMethod == key,
//     }));


//     res.render('crypto/edit', { crypto, paymentMethods });
// });

// router.post('/:cryptoId/edit', isAuth, async (req, res) => {

//     const cryptoData = req.body;

//     await cryptoService.edit(req.params.cryptoId, cryptoData)
//     //todo: check if owner


//     res.redirect(`/crypto/${req.params.cryptoId}/details`);
// })

// // ----------------------------------DELETE---------------------------------------

// router.get('/:cryptoId/delete', isAuth, async (req, res) => {

//     await cryptoService.delete(req.params.cryptoId)

//     res.redirect('/crypto/catalog');

// });

// ---------------------------------CREATE-------------------------------------------

router.get('/create', isAuth, (req, res) => {
    res.render('games/create');
});

router.post('/create', isAuth, async (req, res) => {

    const gamesData = req.body;

    try {
        await gameService.create(req.user._id, gamesData);

    } catch (error) {
        return res.status(400).render('games/create', { error: getErrorMessage(error) });
    }

    res.redirect('/games/catalog');
});


module.exports = router;