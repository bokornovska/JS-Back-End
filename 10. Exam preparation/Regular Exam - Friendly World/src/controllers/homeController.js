const router = require('express').Router();

const animalService = require('../services/animalService');


router.get('/', async (req, res) => {
    const animals = await animalService.getAll().sort({ _id: -1 }).limit(3);
    res.render('home', {animals});
});

router.get('/404', (req, res) => {
    res.render('404');
});



module.exports = router;