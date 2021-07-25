const router = require('express').Router();
const User = require('../models/sequelize/User');
const { registerValidation, loginValidation } = require('../validation/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")


router.post('/register', async (req, res) => {

    // LETS VALIDATE A DATA BEFORE WE CREATE A USER 
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].messsage);

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
        currency: req.body.currency
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
    if (error) return res.status(400).send(error.details[0].messsage);

    // CHECK PASSWORD IF EXIST
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Email is not found");

    bcrypt.compare(req.body.password, user.password)
        .then(passwordMatch => passwordMatch ? res.send(passwordMatch) : res.send(passwordMatch))

    // HASH PASSWORD
    // try {
    //     const validPass = await bcrypt.compare(req.body.password, user.password);

    //     if (!validPass) return res.status(400).send("Invalid password !" + req.body.password
    //         + " diff " + user.password);
    // } catch (error) {
    //     res.status(400).send(err);
    // }


    // CEEATE AND SIGN A TOKEN
    try {
        const token = jwt.sign({ _id: user._id }, "AKJZEDHEJFBKEZFNBJQHDBFJL");
        res.header('auth-token', token).send(token);
        res.send('Logged in yes ça marche');
    } catch (err) {
        res.status(400).send(err);
    }

})

router.get('/all', async (req, res) => {
    const users = await User.findAll();
    res.send(users);
});

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    res.send(user);
});

router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const data = req.body.data;
    let user = await User.findByPk(id);
    user.key_p = data;
    user.key_s = data;
    const savedUser = await user.save();
    res.send(savedUser);
});

router.put('/activate/:id', async (req, res) => {
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