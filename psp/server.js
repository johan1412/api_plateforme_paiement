
const express = require("express");
//const router = require("express").Router();
const cors = require("cors");
const fetch = require('node-fetch');

const app = express();



app.use(cors()) // Use this after the variable declaration
app.post('/psp', async (req, res,next) => {
    res.sendStatus(202);
    setTimeout( ()=>{
        fetch('https://www.google.com/')},10000);
});



app.listen(3000, () => console.log("psp is listening"));
