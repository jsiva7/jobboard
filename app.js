const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const job = require('./api/jobs');
const token = require('./api/token');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('www'));
app.use('/api/', job);
app.use('/api/', token);

app.listen(port, () => {
    console.info("App listening to port - " + port);
});

module.exports = app;