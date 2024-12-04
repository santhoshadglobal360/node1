const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Replace with your MySQL password
  database: 'user'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});

// Route to save user data
app.post('/save-user', (req, res) => {
  const { name, phone } = req.body;
  const sql = 'INSERT INTO users (name, phone) VALUES (?, ?)';
  db.query(sql, [name, phone], (err, result) => {
    if (err) throw err;
    res.send({ message: 'User added', userId: result.insertId });
  });
});
// Route to show list of saved data
app.get('/get-users', (req, res) => {
  db.query('SELECT name, phone FROM users', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);  // Send data as JSON
    }
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});