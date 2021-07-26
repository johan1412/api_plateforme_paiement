const router = require("express").Router();

router
    .get("/", (req, res) => {
        res.render("payment", {
            items: [{ title: "spoon", quantity: "1" }],
        });
    })
    .post("/", (req, res) => {
        console.log(req.body);
        res.render("payment", {
            success: true,
            items: [{ title: "spoon", quantity: "1" }],
        });
    });

module.exports = router;