const { app } = require("./app");
const http = require("http");
require("dotenv").config();
const server = http.createServer(app);
const mysql = require('mysql2');

const mysqlConfig = {
  host: "18.197.128.8",
  user: "root",
  port: "3306",
  password: "mysecretpassword",
  database: "portail",
}

let con = null


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/connect', function (req, res) {
  con =  mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) throw err;
    res.send('connected')
  });
}) 
app.get('/create-table', function (req, res) {
  con =  mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) throw err;
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      ref INT(11) UNSIGNED UNIQUE,
      name VARCHAR(30),
      email VARCHAR(30),
      password VARCHAR(255),
      admin VARCHAR(10),
      age INT(3),
      gender VARCHAR(30)
    )  ENGINE=INNODB;
  `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send("numbers table created");
    });
  });
})
async function createUsersTable() {
  try {
    await con.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        ref INT(11) UNSIGNED UNIQUE,
        name VARCHAR(30),
        email VARCHAR(30),
        password VARCHAR(255),
        admin VARCHAR(10),
        age INT(3),
        gender VARCHAR(30)
      )
    `);
    console.log("users TABLE created.");
    connection.end();
  } catch (err) {
    console.error("Error creating users table:", err);
  }
}

//createUsersTable();
server.listen(
  3001,
  console.log(`server is running at port http://3005`)
);
