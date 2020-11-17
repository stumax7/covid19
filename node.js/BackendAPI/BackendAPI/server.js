'use strict';

var http = require('http');
var port = process.env.PORT || 1337;

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var mysql = require('mysql');

//Create database connection and read host, user, password, and port
var con = mysql.createConnection({
    host: "192.168.158.36",
    user: "admin",
    password: "password",
    database: "covid19"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to database
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    app.get('/', (req, res) => {
        res.send({ express: 'Hello From Researcher' });
    });

    //Set up get request for localhost:3000/api/hello
    app.get('/api/hello', (req, res) => {
        //Query database with sql select statement and send result
        con.query("SELECT * FROM covid19DataByCounty", function (err, result, fields) {
            if (err) throw err;
            console.log("Result : " + JSON.stringify(result) + " Err : " + err);
            res.send(result);
            console.log("Response sent")
        });
    });

    //Set up post request for localhost:3000/api/world
    app.post('/api/world', (req, res) => {
        //Query database with sql select statement and send result
        con.query(`SELECT * FROM covid19DataByCounty WHERE ProvinceState = "${req.body.post}"`, function (err, result, fields) {
            if (err) throw err;
            console.log("Result : " + JSON.stringify(result) + " Err : " + err);
            res.send(result);
            console.log("Response sent")
        });
    });

    //Set up post request for localhost:3000/api/filter
    app.post('/api/filter', (req, res) => {
        //Query database with sql select statement and send result
        let query = `SELECT * FROM covid19DataByCounty WHERE ProvinceState = "${req.body.state}"`;
        if (req.body.county !== "") {
            query += ` AND County = "${req.body.county}"`;
        } 
        if (req.body.date1 !== "" && req.body.date2 !== "") {
            query += ` AND ReportDate BETWEEN "${req.body.date1}" AND "${req.body.date2}"`;
        }
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            console.log("Result : " + JSON.stringify(result) + " Err : " + err);
            res.send(result);
            console.log("Response sent")
        });
    });

    app.listen(port, () => console.log(`Listening on port ${port}`));
});