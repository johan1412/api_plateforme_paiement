const router = require('express').Router();
const Transaction = require('../models/sequelize/Transaction');
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
            "consumer.lastname": dataReq,
            "consumer.firstname": dataReq,
            "consumer.email": dataReq,
            "billingAdress.adress": dataReq,
            "billingAdress.zipCode": dataReq,
            "billingAdress.city": dataReq,
            "billingAdress.country": dataReq,
            "shippingAdress.adress": dataReq,
            "shippingAdress.zipCode": dataReq,
            "shippingAdress.city": dataReq,
            "shippingAdress.country": dataReq,
            "cart": dataReq,
            "totalPrice": dataReq,
        }
    })
    .then((data) => {
        res.send(data);
    })
    .catch((e) => res.sendStatus(500));
});

module.exports = router;