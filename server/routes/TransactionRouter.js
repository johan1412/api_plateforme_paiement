const router = require('express').Router();
const { Transaction, Cart, Product, User } = require('../models/sequelize');
const TransactionMongo = require('../models/mongo/Transaction');
const verify = require('../lib/security');


router
    .get("/", (req, res) => {
<<<<<<< HEAD
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
>>>>>>> 060df6971c788025b09600166d44da77117d0872
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