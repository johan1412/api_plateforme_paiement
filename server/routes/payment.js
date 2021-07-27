const { Router } = require("express");
const fetch = require('node-fetch');


const router = Router();

router
    .get("/", (req, res) => {
        res.render("payment", {
            items: [{ title: "spoon", quantity: "1" }],
        });
    })
    .post("/", async (req, res) => {
        const response = await fetch('http://localhost:3003/psp', { method: 'POST'});
        console.log(response);
    });

module.exports = router;