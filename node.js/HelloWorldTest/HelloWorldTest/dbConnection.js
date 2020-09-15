var mariadb = require('mariadb');

mariadb.createConnection({
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