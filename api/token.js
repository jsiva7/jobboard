const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.get('/token', function (req, res) {

    let data = {
        id: 1,
        purpose: "demo"
    }

    var token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });

    console.info("/api/token -- DONE")
});



module.exports = router;