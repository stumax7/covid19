'use strict';
var path = require('path');
var express = require('express');
var app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "192.168.158.36",
    user: "admin",
    password: "password",
    database: "covid19"
});

app.use(express.static('./'));

app.get('/index.html', function (req, res) {
    console.log("S1: sent /index.html");
    res.sendFile("index.html");
    console.log("S2: sent /index.html");
})

app.get('/api/getdata', function (req, res) {
    //Connect to database
    console.log("S3: In API");
    var response = con.connect(function (err) {
        console.log("S4: err :" + err);
        if (err) throw err;
        console.log("S5: Connected to database");

        con.query("SELECT * FROM covid19DataByCounty LIMIT 1", function (err, result, fields) {
            if (err) throw err;
            console.log("S6: Result : " + JSON.stringify(result) + " Err : " + err);
            res.end(JSON.stringify(result));
        });

        con.end(function (err) {
            if (err) {
                throw err;
                console.log('S7: error:' + err.message);
            }
            console.log('S7: Closed the database connection.');
        });
    });
})

var server = app.listen(1337, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("S0: Example app listening at http://%s:%s", host, port)
})

