const router = require('express').Router();
const Transaction = require('../models/Transaction');


router.get('/transactions', (req, res) => {
    Transaction.findAll()
    .then((data) => {
        res.render("payment", {
            success: true,
            items: [{ title: "spoon", quantity: "1" }],
        });
    })
    .catch((e) => res.sendStatus(500));
});

module.exports = router;