const router = require('express').Router();

const { getErrorMessage } = require('../utils/error');
const { isAuth } = require('../middlewares/authMiddleware');

const animalService = require('../services/animalService');

// -----------------------------------------------CREATE------------------------------------------------------
router.get('/create', isAuth, (req, res) => {
    res.render('animals/create');
});

router.post('/create', isAuth, async (req, res) => {

    const animalData = req.body;

    try {

        await animalService.create(req.user._id, animalData);
        res.redirect('/animals/catalog');

    } catch (err) {
        res.render('animals/create', { error: getErrorMessage(err) });
    }

});

// ---------------------------------------------------CATALOG----------------------------------------------------------
router.get('/catalog', async (req, res) => {

    try {
        const animals = await animalService.getAll();
        res.render('animals/catalog', { animals });
    } catch (error) {
        res.render('404', { error: 'Cannot get catalog page' });
    }

});

// ---------------------------------------------------DETAILS------------------------------------------------------------

router.get('/:animalId/details', async (req, res) => {

    try {
        const animalId = req.params.animalId;

        const animal = await animalService.getOne(animalId).populate('donations').lean();

        const isOwner = req.user?._id == animal.owner;
        let hasDonated = false;

        const donatedId = animal.donations.map(user => user._id);

        if (donatedId.toString().includes(req.user?._id)) {
            hasDonated = true;
        }

        res.render('animals/details', { animal, isOwner, hasDonated });
    } catch (error) {
        res.render('404', { error: 'Cannot get details page' });
    }

});

// ---------------------------------------------------DELETE--------------------------------------------------------------

router.get('/:animalId/delete', isAuth, async (req, res) => {

    const animalId = req.params.animalId;

    const animal = await animalService.getOne(req.params.animalId).lean();
    const isOwner = animal.owner == req.user?._id;

    try {
        if(isOwner){
            await animalService.delete(animalId);
            res.redirect('/animals/catalog')
        }else{
            throw new Error(error)
        }
    } catch (error) {
        res.render(`404`, { error: 'Cannot delete photo' });
    }
});

// --------------------------------------------------EDIT---------------------------------------------------------------

router.get('/:animalId/edit', isAuth, async (req, res) => {

    const animal = await animalService.getOne(req.params.animalId).lean();

    const isOwner = animal.owner == req.user?._id;
    if(isOwner){

        res.render('animals/edit', { animal })
    }else{
        return res.render('404');
    }
});

router.post('/:animalId/edit', isAuth, async (req, res) => {

    const animalId = req.params.animalId;
    const animalData = req.body;
    

    try {
        await animalService.edit(animalId, animalData);

        res.redirect(`/animals/${animalId}/details`)
    } catch (error) {
        res.render(`404`, { error: 'Unable to edit', ...animalData });
    }
});

// -----------------------------------------DONATE----------------------------------------------------------
router.get('/:animalId/donate', isAuth, async (req, res) => {

    try {
        await animalService.donate(req.user._id, req.params.animalId);

        res.redirect(`/animals/${req.params.animalId}/details`);
    } catch (error) {
        return res.status(400).render('404', { error: getErrorMessage(error) });
    }

});

// ------------------------------SEARCH-----------------------------------------

router.get('/search', async (req, res) => {

    const { location } = req.query;
    const animal = await animalService.search(location);

    res.render('animals/search', { animal });

});


module.exports = router;