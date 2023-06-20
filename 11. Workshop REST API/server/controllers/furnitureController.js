const router = require('express').Router();
const furnitureManager = require('../managers/furnitureManager');

router.post('/', async (req,res) => {
try {
    await furnitureManager.create(req.body);
    res.status(204).end();
    
} catch (error) {
    res.status(400).json({
        message: 'Cannot create furniture'
    })
}

})
module.exports = router;