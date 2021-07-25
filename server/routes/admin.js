const router = require('express').Router();
const Transaction = require('../models/sequelize/Transaction');
const TransactionMongo = require('../models/mongo/Transaction');
const User = require('../models/sequelize/User');


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


// @desc delete the user with provided user Id
// @ access private TODO make it private
router.delete('users/:userId', (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.userId })
        .exec()
        .then(() => res.status(200).json({ message: 'User deleted' }))
        .catch(err => res.status(500).json(err));
});


//update a user
router.put('update/:id', function (req, res, next) {
    Log.i("update the user with id " + req.params.id);
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        if (err) return next(err);
        res.status(200).json({
            "success": "updated the User"
        });
    });
});

// delete a user
router.delete('delete/:id', function (req, res, next) {
    Log.i("delete the user with id " + req.params.id);
    User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
        if (err) return next(err);
        res.status(200).json({
            "success": "deleted the User"
        });
    });
});

module.exports = router;