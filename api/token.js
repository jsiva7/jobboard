const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.get('/api/token', function (req, res) {

    let data = {
        id: 1,
        purpose: "demo"
    }

    // create a demo token
    var token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });

});



module.exports = router;