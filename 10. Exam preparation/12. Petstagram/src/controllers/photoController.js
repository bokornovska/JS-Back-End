const router = require('express').Router();

const { getErrorMessage } = require('../utils/error')

const photoService = require('../services/photoService');
// -----------------------------------------------CREATE------------------------------------------------------
router.get('/create', (req, res) => {
    res.render('photos/create');
});

router.post('/create', async (req, res) => {
    const photoData = req.body;

    try {

        await photoService.create(req.user._id, photoData);

        // chek the right redirect
        res.redirect('/photos/catalog');

    } catch (err) {
        res.render('photos/create', { error: getErrorMessage(err) });
    }

});

// ---------------------------------------------------CATALOG----------------------------------------------------------
router.get('/catalog', async (req, res) => {

    const photos = await photoService.getAll();
    res.render('photos/catalog', { photos });
});

// ---------------------------------------------------DETAILS------------------------------------------------------------

router.get('/:photoId/details', async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await photoService.getOne(photoId);
    // if it's populated - photo.owner._id // if it`s not photo.owner;
    const isOwner = req.user._id == photo.owner._id;

    res.render('photos/details', { photo, isOwner });
})


module.exports = router;