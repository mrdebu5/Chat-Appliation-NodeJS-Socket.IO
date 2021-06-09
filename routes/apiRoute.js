var express = require("express");
var router = express.Router();

// API ROUTER

router.get("/", function (req, res, next) {
    res.status(200).send("this is the api main page")
});

module.exports = router;
