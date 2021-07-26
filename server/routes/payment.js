const { Router } = require("express");
const fetch = require('node-fetch');


const router = Router();

router
    .get("/", (req, res) => {
        res.render("payment", {
            items: [{ title: "spoon", quantity: "1" }],
        });
    })
    .post("/", (req, res) => {
        fetch('http://psp/psp', { method: 'POST'})
            .then(res => res.json()) // expecting a json response
            .then(json => console.log(json));
    });

module.exports = router;