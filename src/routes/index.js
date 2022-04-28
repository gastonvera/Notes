const router = require('express').Router();

//Get index
router.get('/', (req, res) => {
    res.render('index');
});

//Get about
router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;