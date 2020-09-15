'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var mariadb = require('mariadb');

var con = mariadb.createConnection({
    user: "admin",
    password: "password",
    database: 'covid19',
    host: "192.168.158.36",
    port: '3306'
})
    .then(conn => {
        console.log("Connection succesful");
        conn.end();
    })
    .catch(err => {
        console.log("Error: " + err.message);
    })

http.createServer(function (req, res) {


    if (err) throw err;
    con.query("SELECT * FROM helloWorld", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('result');
}).listen(port);

