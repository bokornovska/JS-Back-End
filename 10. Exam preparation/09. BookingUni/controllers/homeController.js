
const homeController = require('express').Router();


// TODO replace with the real controller
homeController.get('/', (req, res) => {
    res.render('home')
});


module.exports = homeController;