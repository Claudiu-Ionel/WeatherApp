const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt')
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
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
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    db.query('INSERT INTO users (username, email, password) VALUES(?, ?, ?);', [username, email, hash],
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send('User registered');
        }
      })
  })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT username, password from users u WHERE u.username = ?', username, (err, result) => {
    if (err) {
      res.send(err);
    }

    if (result.length > 0) {
      const dbPassword = result[0]?.password
      bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
          res.send("Wrong Password")
        } else {
          res.send("user logged in!")
        }
      })
    } else {
      res.send("user not found")
    }
  })
})

app.listen(3001)