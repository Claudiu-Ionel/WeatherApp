const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rooty',
  database: 'world',
})

db.connect((err) => {
  if (!err) {
    console.log('connected');
  } else {
    console.log('connection Failed');
  }

})

app.get('/cities', (req, res) => {
  db.query('SELECT name from city', (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})


app.listen(3002)