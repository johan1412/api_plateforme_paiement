const router = require('express').Router();
const Transaction = require('../models/sequelize/Transaction');
const TransactionMongo = require('../models/mongo/Transaction');
const User = require('../models/sequelize/User');
const verify = require('../lib/security');


/**
 * PARTIE MARCHANT (USER) 
 */

// Afficher tous les user 
router.get('/all', verify, async (req, res) => {
    const users = await User.findAll();
    res.send(users);
});

// Activater un compte user
router.put('/activate/:id', verify, async (req, res) => {
    const id = req.params.id
    let user = await User.findOne({ where: { username: id } })
    let msgText
    user.isVerified = req.body.activate
    if (req.body.activate) {
        msgText = "Your account has been activated"
    } else {
        msgText = "Your account has been disabled"
    }
    const savedUser = await user.save();
    const msg = {
        to: user.contact, // Change to your recipient
        from: 'mbouhadjar1@myges.fr', // Change to your verified sender
        subject: msgText,
        text: msgText,
    }
    sgMail
        .send(msg)
        .then(() => {
        })
        .catch((error) => {
            console.error(error)
        })
    res.send(savedUser);
});

// Modifier un user
router.put('/update/:id', verify,async function (req, res, next) {
    // Log.i("update the user with id " + req.params.id);
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        if (err) return next(err);
        res.status(200).json({
            "success": "updated the User"
        });
    });
});

// Supprimer un user
router.delete('/delete/:id',verify ,async function (req, res, next) {
    // Log.i("delete the user with id " + req.params.id);
    User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
        if (err) return next(err);
        res.status(200).json({
            "success": "deleted the User"
        });
    });
});


/**
 * PARTIE TRANSACTION
 */

router.get('/transactions', verify,async(req, res) => {
    const transactions = await Transaction.findAll();
    res.send(transactions);
});

router.get('/transactions/:id', verify,async (req, res) => {
    const transactions = await Transaction.findOne({ where });
    res.send(transactions);
});

router.post('/transactions/some', verify, (req, res) => {
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