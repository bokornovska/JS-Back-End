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
    let tripSeats = trip.seats;
    
    const emails = await tripService.getBuddiesEmails(tripId);
    console.log(emails);
    
    
    // if it's populated - photo.owner._id // if it`s not photo.owner;
    const isCreator = req.user?._id == trip.creator._id;
    
    // const hasJoined = req.user?._id == trip.buddies._id;

    // console.log(hasJoined)

    res.render('trips/details', { trip, isCreator, tripSeats });
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

// -----------------------------------JOIN TRIP--------------------------------------------------------------------------

router.get('/:tripId/join', async (req, res) => {

    
    try {
        await tripService.join(req.user._id, req.params.tripId);


        res.redirect(`/trips/${req.params.tripId}/details`);
    } catch (error) {
        return res.status(400).render('404', { error: getErrorMessage(error) });
    }

});



module.exports = router;