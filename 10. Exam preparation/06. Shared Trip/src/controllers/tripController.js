const router = require('express').Router();

const { getErrorMessage } = require('../utils/error')

const tripService = require('../services/tripService');
// -----------------------------------------------CREATE------------------------------------------------------
router.get('/create', (req, res) => {
    res.render('trips/create');
});

router.post('/create', async (req, res) => {
    const tripData = req.body;

    try {

        await tripService.create(req.user._id, tripData);

        // chek the right redirect
        res.redirect('/trips/catalog');

    } catch (err) {
        res.render('trips/create', { error: getErrorMessage(err) });
    }

});

// ---------------------------------------------------CATALOG----------------------------------------------------------
router.get('/catalog', async (req, res) => {

    const trips = await tripService.getAll();
    res.render('trips/catalog', { trips });
});

// ---------------------------------------------------DETAILS------------------------------------------------------------

router.get('/:tripId/details', async (req, res) => {
    const tripId = req.params.tripId;
    const trip = await tripService.getOne(tripId).lean();
    // if it's populated - photo.owner._id // if it`s not photo.owner;
    const isCreator = req.user?._id == trip.creator._id;
    console.log(isCreator)

    res.render('trips/details', { trip, isCreator });
});

// ---------------------------------------------------DELETE--------------------------------------------------------------

router.get('/:tripId/delete', async (req, res) => {

    const tripId = req.params.tripId;

    try {
        await tripService.delete(tripId);
        res.redirect('/trips/catalog')
    } catch (error) {
        res.render(`trips/details`, { error: 'Cannot delete photo' })
    }
});

// // --------------------------------------------------EDIT---------------------------------------------------------------

router.get('/:tripId/edit', async (req, res) => {

    const trip = await tripService.getOne(req.params.tripId).lean();

    res.render('trips/edit', { trip })
});

router.post('/:tripId/edit', async (req, res) => {

    const tripId = req.params.tripId;
    const tripData = req.body;
    try {
        await tripService.edit(tripId, tripData);

        res.redirect(`/trips/${tripId}/details`)
    } catch (error) {
        res.render(`trips/edit`, { error: 'Unable to edit photo', ...tripData });
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

module.exports = router;