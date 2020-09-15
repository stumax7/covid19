var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.158.36",
  user: "admin",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});