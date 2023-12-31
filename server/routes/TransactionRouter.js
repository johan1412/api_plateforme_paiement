const router = require('express').Router();
const { Transaction, Cart, Product, User, Operation } = require('../models/sequelize');
const TransactionMongo = require('../models/mongo/Transaction');
const verify = require('../lib/security');


router
    .get("/", (req, res) => {
        const { page = 1, perPage = 20, ...query } = req.query;
        Transaction.findAll({
            where: query,
            limit: parseInt(perPage),
            offset: (parseInt(page) - 1) * parseInt(perPage),
        })
        const query = req.query;
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            res.json(null);
        } else {
            if (loggedInUser.role == "admin") {
                Transaction.find(query)
                .then((data) => res.json(data))
                .catch((e) => res.sendStatus(500));
            } else if(loggedInUser.role == "merchant") {
                Transaction.find(query)
                .then((data) => res.json(data))
                .catch((e) => res.sendStatus(500));
            }
        }
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
=======
        const { page = 1, perPage = 10, ...query } = req.query;
        TransactionMongo.find()
            .then((data) => res.json(data))
            .catch((e) => res.sendStatus(500));
    })
    .post("/", async (req, res) => {
        // TODO : Add transaction
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
           
            let tmp = req.body
            const user = await User.findByPk(req.body.userId) 
            console.log(user)
            delete tmp.userId

            tmp.user = { username: user.username } 
            let transMango = new TransactionMongo(tmp)
            
            transMango.save(function(err, doc) {
                if (err) return console.error(err);
                console.log("Document inserted succussfully!");
              });
    })
    .get("/:id", (req, res) => {
        const { id } = req.params;
        Transaction.findOne({
            where: { id: id},
            include : Operation
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
    });


module.exports = router;