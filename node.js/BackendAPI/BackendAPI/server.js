'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "192.168.158.36",
    user: "admin",
    password: "password",
    database: "covid19"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send({ express: 'Hello From Researcher' });
});

app.get('/api/hello', (req, res) => {
//    res.send({ express: 'Hello From Express' });
    //Connect to database
    var response = con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        con.query("SELECT * FROM covid19DataByCounty LIMIT 20", function (err, result, fields) {
            if (err) throw err;
            console.log("Result : " + JSON.stringify(result) + " Err : " + err);
            //        return result;
            res.send(result);
            console.log("Response sent")
        });
    });
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));