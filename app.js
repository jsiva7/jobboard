const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT;

//CORS
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization");
    next();
});

app.use(express.static('www'));

var job = require('./api/jobs');
app.use('/', job);

var token = require('./api/token');
app.use('/', token);

app.listen(port, () => {
    console.log("App listening to port - " + port);
});
