const hotelController = require('express').Router();

hotelController.get('/:id/details', (req,res) => {
    res.render('details')
});

hotelController.get('/create', (req,res) => {
    res.render('create')
});

hotelController.get('/:id/edit', (req,res) => {
    res.render('edit')
});

module.exports = hotelController;

