const dotenv=require('dotenv');
dotenv.config();
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "3.122.234.138",
  user: "root",
  port: "3306",
  password: "mysecretpassword",
  database: "centermed",
});
module.exports = db    