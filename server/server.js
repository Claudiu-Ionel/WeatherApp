const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

var app = express();
app.use(cors());
app.use(express.json());

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'codeUntilTheEnd94!',
  database: 'weatherapp',
})

db.connect((err) => {
  if (!err) {
    console.log('connected');
  } else {
    console.log('connection Failed');
  }

})

app.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  db.query('INSERT INTO users (username, email, password) VALUES(?, ?, ?);', [username, email, password],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send('User registered');
      }
    })
})

app.get('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query('SELECT id, username from users u WHERE u.username = ? AND u.password = ?', [username, password], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result)
    }
  })
})

app.listen(3001)