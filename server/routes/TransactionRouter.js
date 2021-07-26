const router = require('express').Router();
const { Transaction } = require('../models/sequelize');
const TransactionMongo = require('../models/mongo/Transaction');
const verify = require('../lib/security');


router
    .get("/", (req, res) => {
        const { page = 1, perPage = 10, ...query } = req.query;
        Transaction.findAll({
            where: query,
            limit: parseInt(perPage),
            offset: (parseInt(page) - 1) * parseInt(perPage),
            paranoid: false,
        })
            .then((data) => res.json(data))
            .catch((e) => res.sendStatus(500));
    })
    .post("/", (req, res) => {
        new Transaction(req.body)
            .save()
            .then((data) => res.status(201).json(data))
            .catch((e) => {
                if (e.name === "SequelizeValidationError") {
                    res.status(400).json(prettifyErrors(e));
                } else console.error(e) || res.sendStatus(500);
            });
    })
    .get("/:id", (req, res) => {
        const { id } = req.params;
        Transaction.findByPk(id)
            .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
            .catch((e) => res.sendStatus(500));
    })
    .put("/:id", (req, res) => {
        Transaction.update(req.body, {
            where: { id: req.params.id },
            returning: true,
            individualHooks: true,
        })
            .then(([, [data]]) =>
                data !== undefined ? res.json(data) : res.sendStatus(404)
            )
            .catch((e) => {
                if (e.name === "SequelizeValidationError") {
                    res.status(400).json(prettifyErrors(e));
                } else res.sendStatus(500);
            });
    })
    .delete("/:id", (req, res) => {
        // <==> HttpCode.deleteOne({ _id: req.params.code })
        Transaction.destroy({ where: { id: req.params.id } })
            .then((data) => res.sendStatus(data !== 0 ? 204 : 404))
            .catch((e) => res.sendStatus(500));
    });


router.post('/some', verify, (req, res) => {
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