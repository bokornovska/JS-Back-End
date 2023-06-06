const router = require('express').Router();

const { isAuth, isOwner } = require('../middlewares/authMiddleware');
const gameService = require('../services/gameService');
const { platformMap } = require('../constants');

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

// -----------------------------DETAILS-----------------------------------

router.get('/:gameId/details', async (req, res) => {

    const game = await gameService.getOne(req.params.gameId);

    const isOwner = game.owner == req.user?._id;
    const isBuyer = game.buyers?.some(id => id == req.user?._id);


    res.render('games/details', { game, isOwner, isBuyer });
});

// // --------------------------------BUY--------------------------------------

// router.get('/:cryptoId/buy', isAuth, async (req, res) => {

//     try {
//         await cryptoService.buy(req.user._id, req.params.cryptoId);

//         res.redirect(`/crypto/${req.params.cryptoId}/details`);
//     } catch (error) {
//         return res.status(400).render('404', { error: getErrorMessage(error) });
//     }

// });


// ----------------------------------EDIT---------------------------------------

router.get('/:gameId/edit', isAuth, async (req, res) => {

    const game = await gameService.getOne(req.params.gameId);
    const isOwner = game.owner == req.user?._id;

     if(isOwner){

        const platform = Object.keys(platformMap).map(key => ({
            value: key,
            label: platformMap[key],
            isSelected: game.platform == key,
        }));
    
    
        res.render('games/edit', { game, platform });
     }else{
        return res.render('home/404');
     }
  
});

router.post('/:gameId/edit', isAuth, async (req, res) => {

    try {
        const gameData = req.body;

        await gameService.edit(req.params.gameId, gameData);
    
        res.redirect(`/games/${req.params.gameId}/details`); 
    } catch (error) {
        return res.status(400).render('games/create', { error: getErrorMessage(error) });
    }
    
})

// ----------------------------------DELETE---------------------------------------

router.get('/:gameId/delete', isAuth, async (req, res) => {

    await gameService.delete(req.params.gameId);

    res.redirect('/games/catalog');

});

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