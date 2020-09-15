const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 1337;

var con = mysql.createConnection({
  host: "192.168.158.36",
  user: "admin",
  password: "password",
  database: "covid19"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  console.log('Get request fired')
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log('Post request fired')
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));