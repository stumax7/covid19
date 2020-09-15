var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const app = express();
var port = process.env.PORT || 1337;

var con = mysql.createConnection({
    host: "192.168.158.36",
    user: "admin",
    password: "password",
    database: "covid19"
});

var sql = "SELECT * FROM covid19DataByCounty LIMIT 1"
var qback = con.connect(function (err) {
    if (err) throw err;
    console.log("Database connected");
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log("Query : " + sql);
        console.log("Result: err " + err + " result " + JSON.stringify(result) + " fields " + fields);
        y = result;
        return y;
    });
});

console.log("Main output: " + qback);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log("Function output: " + JSON.stringify(y));
    res.send({ express: y });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen.port
