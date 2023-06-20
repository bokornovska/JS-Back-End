const router = require('express').Router();

const userManager = require('../managers/userManager');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await userManager.register(req.body);

        res.json(result)
    } catch (error) {
        res.status(400).json({
            message: 'Some message'
        })
    }
    res.end();
});

router.post('/login', async (req, res) => {
    try {

        const result = await userManager.login(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }

})
module.exports = router;