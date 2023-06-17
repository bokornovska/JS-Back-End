const router = require('express').Router();

const { getErrorMessage } = require('../utils/error');
const { isAuth } = require('../middlewares/authMiddleware');

const housingService = require('../services/housingService');

// -----------------------------------------------CREATE------------------------------------------------------
router.get('/create', isAuth, (req, res) => {
    res.render('housing/create');
});

router.post('/create', isAuth, async (req, res) => {
    const houseData = req.body;

    try {

        await housingService.create(req.user._id, houseData);

        // chek the right redirect
        res.redirect('/housing/catalog');

    } catch (err) {
        res.render('housing/create', { error: getErrorMessage(err) });
    }

});

// ---------------------------------------------------CATALOG----------------------------------------------------------
router.get('/catalog', async (req, res) => {

    const houses = await housingService.getAll();
    res.render('housing/catalog', { houses });
});

// ---------------------------------------------------DETAILS------------------------------------------------------------

router.get('/:houseId/details', async (req, res) => {
    const houseId = req.params.houseId;
    const house = await housingService.getOne(houseId).lean();
    // if it's populated - photo.owner._id // if it`s not photo.owner;
    const isOwner = req.user?._id == house.owner;
    let availablePieces = false;
    let isRented = false;
    if (house.rented.length > 0) {
        isRented = true;
    };
    if(house.availablePieces > 0){
        availablePieces = true;
    };

    const hasRented = house.rented?.some(id => id == req.user?._id)
    
    res.render('housing/details', { house, isRented, isOwner, availablePieces, hasRented });
});

// ---------------------------------------------------DELETE--------------------------------------------------------------

router.get('/:houseId/delete', async (req, res) => {

    const houseId = req.params.houseId;

    try {
        await housingService.delete(houseId);
        res.redirect('/housing/catalog')
    } catch (error) {
        res.render(`housing/details`, { error: 'Cannot delete photo' });
    }
});

// --------------------------------------------------EDIT---------------------------------------------------------------

router.get('/:houseId/edit', async (req, res) => {

    const house = await housingService.getOne(req.params.houseId).lean();

    res.render('housing/edit', { house })
});

router.post('/:houseId/edit', async (req, res) => {

    const houseId = req.params.houseId;
    const houseData = req.body;


    try {
        // if (houseData.type != 'Villa' || houseData.type != 'House' || houseData.type != 'Apartment') {
        //     res.render(`housing/edit`, { error: "Invalid type. Only 'Apartment', 'Villa', 'House' is allowed." })
        // };
        await housingService.edit(houseId, houseData);


        res.redirect(`/housing/${houseId}/details`)
    } catch (error) {
        res.render(`housing/edit`, { error: 'Unable to edit photo', ...houseData });
    }
});

// // -----------------------------------ADD COMMENT--------------------------------------------------------------------------

// router.post('/:photoId/commnets', async (req, res) => {

//     const photoId = req.params.photoId;
//     const { message } = req.body;
//     const user = req.user._id;


//         await photoService.addComment(photoId, { user, message });
//         res.redirect(`/photos/${photoId}/details`);

// })

// -----------------------------------------RENT----------------------------------------------------------
router.get('/:houseId/rent', isAuth, async (req, res) => {

    try {
        await housingService.rent(req.user._id, req.params.houseId);

        res.redirect(`/housing/${req.params.houseId}/details`);
    } catch (error) {
        return res.status(400).render('404', { error: getErrorMessage(error) });
    }

});

// ------------------------------SEARCH-----------------------------------------

router.get('/search', async (req, res) => {

    const { type } = req.query;
    const house = await housingService.search(type);
  
    res.render('housing/search', { house });

});

// router.get('/search', async (req, res) => {
//     let houseType = req.query.type;

//     let house = await housingService.search(houseType);

//     if (house == undefined) {
//         house = await housingService.getAll();
//     }

//     console.log(house);

//     res.render('housing/search', { house })
// })


module.exports = router;