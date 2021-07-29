const router = require('express').Router();
const { Transaction, Cart, Product, User, Operation } = require('../models/sequelize');
const TransactionMongo = require('../models/mongo/Transaction');
const verify = require('../lib/security');


router
    .get("/", (req, res) => {
        const { page = 1, perPage = 20, ...query } = req.query;
        Transaction.findAll().then((data) => res.json(data))
        .catch((e) => res.sendStatus(500));

    })
    .post("/", async (req, res) => {
        new Transaction(req.body,
            {
                include: [
                    {
                        association: Transaction.ShippingAddress,
                    },
                    {
                        association: Transaction.User,
                    },
                    {
                        association: Transaction.BillingAddress
                    },
                    {
                        association: Transaction.Cart,
                        include: [Cart.Products]
                    },

                ]
            }

        )
            .save()
            .then((data) => res.status(201).json(data))
            .catch((e) => {
                console.log(e)
                if (e.name === "SequelizeValidationError") {
                    res.status(400).json(prettifyErrors(e));
                } else console.error(e) || res.sendStatus(500);
            });
    })
    .get("/:id", (req, res) => {
        const { id } = req.params;
        Transaction.findOne({
            where: { id: id },
            include: Operation
        })
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
    })
    .patch('/refund/:id', async (req, res) => {
        const id = req.params.id
        let transaction = await Transaction.findOne({ where: { id: id } })
        let arr = transaction.history
           arr.push('refund : ' + Date());
        transaction.state = "refunded"
        transaction.history = arr

        const savedTr = await transaction.save();

        res.send(savedTr);
    })
    ;


module.exports = router;