const router = require('express').Router();
const Currency = require('../models/mongo/Currency');



router.get('/all', (req, res) => {
    Currency.find()
    .then((data) => {
        res.send(data);
    })
    .catch((e) => res.sendStatus(500));
});

module.exports = router;