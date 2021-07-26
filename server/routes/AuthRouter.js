const router = require('express').Router();
const { User } = require('../models/sequelize');
const { registerValidation, loginValidation } = require('../validation/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isLoggedIn, isNotLoggedIn } = require('../lib/middlewares');

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")


router.post('/register', async (req, res) => {

    // CHECK PASSWORD IF EXIST
    const emailExist = await User.findOne({ where: { username: req.body.username } });
    if (emailExist) return res.status(400).send("Email already exists");

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        confirmed: false,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        phone: req.body.phone,
        societyName: req.body.societyName,
        contact: req.body.contact,
        kabis: req.body.kabis,
        confirmationUrl: req.body.confirmationUrl,
        cancelUrl: req.body.cancelUrl,
        currency: req.body.currency,
        isVerified: req.body.isVerified,
        roles: "MARCHAND"
    });
    try {
        const savedUser = await user.save();
        const msg = {
            to: user.contact, // Change to your recipient
            from: 'mbouhadjar1@myges.fr', // Change to your verified sender
            subject: "Registration successful",
            text: "Your registration is complete, you will recieve another email when your account is activated",
        }
        sgMail
            .send(msg)
            .then(() => {
            })
            .catch((error) => {
                console.error(error)
            })
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {

    // LETS VALIDATE A DATA BEFORE WE CREATE A USER 
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details.map((item) => item.message));

    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) return res.status(400).send("Invalid email");

    if (!user.isVerified) return res.status(400).send("Invalid account");

    // HASH PASSWORD
    try {
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send("Invalid password");
    } catch (error) {
        res.status(400).send(err);
    }

    // CEEATE AND SIGN A TOKEN
    try {
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    } catch (err) {
        res.status(400).send(err);
    }
})


router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;