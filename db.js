var mysql = require('mysql');



var connection = mysql.createPool ({
    connectionlimit: 10,
    multipleStatements: true,
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB
});

module.exports = connection;