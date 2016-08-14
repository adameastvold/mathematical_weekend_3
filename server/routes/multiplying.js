var express = require('express');
var router = express.Router();
var result = 0;

router.post("/", function(req, res) {
    var calculation = req.body;
    result = parseFloat(calculation.firstNumber) * parseFloat(calculation.secondNumber);
    res.sendStatus(201);
});
router.get("/", function(req, res) {
    res.status(201).send((result).toString());
});
module.exports = router;
