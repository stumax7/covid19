'use strict';
var path = require('path');
var express = require('express');
var app = express();


app.use(express.static('./'));

app.get('/index.html', function (req, res) {
    console.log("0 sending /index.html");
    res.sendFile("index.html");
    console.log("1 sent /index.html");
})

app.get('/api/getdata', function (req, res) {
    console.log("2 sending the data");
    res.send({"v1": "a1", "v2": "a2"});
    console.log("3 sent the data");
})


// Allows you to set port in the project properties.
//app.set('port', process.env.PORT || 1337);

var server = app.listen(1337, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

