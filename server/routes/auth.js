const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/register', async(req, res) => {
    
    // LETS VALIDATE A DATA BEFORE WE CREATE A USER 
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].messsage);

    // CHECK PASSWORD IF EXIST
    const emailExist = await User.findOne({where : { username: req.body.username }});
    console.log("________________________________________________________",emailExist)
    if (emailExist) return res.status(400).send("Email already exists");
    
    // // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        confirmed: false,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        phone: req.body.phone,
        societyName: req.body.societyName,
        contact: req.body.courriel,
        kabis: req.body.kabis, 
        confirmationUrl :req.body.confirmationUrl,
        cancelUrl: req.body.cancelUrl,
        currency:req.body.currency
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async(req, res) => {
    // LETS VALIDATE A DATA BEFORE WE CREATE A USER 
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].messsage);

    // CHECK PASSWORD IF EXIST
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Email is not found");

    // HASH PASSWORD
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password!!");

    // CEEATE AND SIGN A TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    res.send('Logged in !!!');
})

router.get('/all', async(req,res) => {
    const users = await User.findAll();
    res.send(users);
});

router.put('/activate/:id', async(req, res) => {
    const id = req.params.id
    let user = await User.findOne({ where: { username: id } })
    user.isVerified = req.body.activate
    console.log("---------------", req.body.activate)
    const savedUser = await user.save();
    res.send(savedUser); 
});


module.exports = router;