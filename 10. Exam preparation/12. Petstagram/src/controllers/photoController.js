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
    const isOwner = req.user?._id == photo.owner._id;

    res.render('photos/details', { photo, isOwner });
});

// ---------------------------------------------------DELETE--------------------------------------------------------------

router.get('/:photoId/delete', async (req, res) => {

    const photoId = req.params.photoId;

    try {
        await photoService.delete(photoId);
        res.redirect('/photos/catalog')
    } catch (error) {
        res.render(`photos/details`, { error: 'Cannot delete photo' })
    }
});

// --------------------------------------------------EDIT---------------------------------------------------------------

router.get('/:photoId/edit', async (req, res) => {

    const photo = await photoService.getOne(req.params.photoId);

    res.render('photos/edit', { photo })
});

router.post('/:photoId/edit', async (req, res) => {

    const photoId = req.params.photoId;
    const photoData = req.body;

    try {
        await photoService.edit(photoId, photoData);

        res.redirect(`/photos/${photoId}/details`)
    } catch (error) {
        res.render(`photos/edit`, { error: 'Unable to edit photo', ...photoData });
    }
});

// -----------------------------------ADD COMMENT--------------------------------------------------------------------------

router.post('/:photoId/commnets', async (req, res) => {

    const photoId = req.params.photoId;
    const { comment } = req.body;
    const user = req.user._id;

    try {
        await photoService.addComment(photoId, { user, comment });
        res.redirect(`/photos/${photoId}/details`)
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;