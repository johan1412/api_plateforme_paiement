const router = require('express').Router();
const Transaction = require('../models/Transaction');
const TransactionMongo = require('../models/mongo/Transaction');



router.get('/transactions', (req, res) => {
    Transaction.findAll()
    .then((data) => {
        res.send(data);
    })
    .catch((e) => res.sendStatus(500));
});

router.post('/transactions/some', (req, res) => {
    console.log("tester");
    const dataReq = req.body;
    TransactionMongo.find({
        $elemMatch: {
            "lastname": dataReq,
            "firstname": dataReq,
            "email": dataReq,
            "facturation": dataReq,
            "livraison": dataReq,
            "panier": dataReq,
            "montant_commande": dataReq,
        }
    })
    .then((data) => {
        res.send(data);
    })
    .catch((e) => res.sendStatus(500));
});

module.exports = router;