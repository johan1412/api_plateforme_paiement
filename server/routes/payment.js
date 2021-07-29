const { Router } = require("express");
const fetch = require('node-fetch');


const router = Router();

router
    .get("/", (req, res) => {
        res.render("payment", {
            items: [],
        });
    })
    .post("/", async (req, res) => {
        const response = await fetch('http://psp:3000/psp', { method: 'POST'});
    });

module.exports = router;