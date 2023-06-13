const { getAll } = require('../services/hotelService');

const homeController = require('express').Router();


// TODO replace with the real controller
homeController.get('/', async (req, res) => {
    const hotels = await getAll();
    res.render('home', {
        hotels
    })
});


module.exports = homeController;