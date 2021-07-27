const router = require('express').Router();
const { User } = require('../models/sequelize');
const UserMongo = require('../models/mongo/User');
const verify = require('../lib/security');


router
    .get("/", (req, res) => {
        const { page = 1, perPage = 20, ...query } = req.query;
        User.findAll({
            where: query,
            limit: parseInt(perPage),
            offset: (parseInt(page) - 1) * parseInt(perPage),
            paranoid: false,
        })
            .then((data) => res.json(data))
            .catch((e) => res.sendStatus(500));
    })
    .post("/", (req, res) => {
        new User(req.body)
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
        User.findByPk(id)
            .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
            .catch((e) => res.sendStatus(500));
    })
    .put("/:id", (req, res) => {
        User.update(req.body, {
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
        User.destroy({ where: { id: req.params.id } })
            .then((data) => res.sendStatus(data !== 0 ? 204 : 404))
            .catch((e) => res.sendStatus(500));
    })
    .patch('/:id', async (req, res) => {
        const id = req.params.id;
        const data = req.body.data;
        let user = await UserMongo.find(id);
        user.clientToken = data;
        user.clientSecret = data;
        const savedUser = await user.save();
        res.send(savedUser);

        /*await User.updateOne(
            { userId: id },
            {
              $set: { 'clientToken': '', clientSecret: '' },
            }
        );*/
    })
    .patch('/activate/:id', verify, async (req, res) => {
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

module.exports = router;