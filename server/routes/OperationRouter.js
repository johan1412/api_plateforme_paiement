const router = require('express').Router();
const { User, Operation } = require('../models/sequelize');
const verify = require('../lib/security');
const sgMail = require('@sendgrid/mail')

router
    .get("/", (req, res) => {
        const { page = 1, perPage = 20, ...query } = req.query;
        Operation.findAll({
            where: query,
            limit: parseInt(perPage),
            offset: (parseInt(page) - 1) * parseInt(perPage),
            paranoid: false,
        })
            .then((data) => res.json(data))
            .catch((e) => res.sendStatus(500));
    })
    .post("/", (req, res) => {
        new Operation(req.body,
            {
                include: [
                    {
                        association: Operation.Transaction,
                    }
                ]
            }
        )
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
        Operation.findByPk(id)
            .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
            .catch((e) => res.sendStatus(500));
    })
    .put("/:id", (req, res) => {
        Operation.update(req.body, {
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
        Operation.destroy({ where: { id: req.params.id } })
            .then((data) => res.sendStatus(data !== 0 ? 204 : 404))
            .catch((e) => res.sendStatus(500));
    })
    .patch('/:id', async (req, res) => {
        const id = req.params.id;
        const data = req.body.data;
        let user = await User.findByPk(id);
        user.key_p = data;
        user.key_s = data;
        const savedUser = await user.save();
        res.send(savedUser);
    });

module.exports = router;