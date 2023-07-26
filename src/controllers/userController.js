const dotenv = require("dotenv");
dotenv.config();
const jwt=require('jsonwebtoken')
const db = require("../config");
const { registerValidation,loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const mysql = require('mysql2');

const mysqlConfig = {
  host: "18.197.128.8",
  user: "root",
  port: "3306",
  password: "mysecretpassword",
  database: "portail",
}

let con = null

function checkIfUserExists(req) {
  con =  mysql.createConnection(mysqlConfig);

  return new Promise((resolve, reject) => {
    console.log("Checking if user exists");
    let sqlverif = "SELECT * FROM users WHERE email= ?";

    db.query(sqlverif, [req.body.email], (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
async function registerUser(req, res) {
    // Validate data before creating a user
    con =  mysql.createConnection(mysqlConfig);

  
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    // Create new user
    const data = [req.body.ref,req.body.name, req.body.email, hashedPassword,req.body.admin, req.body.age, req.body.gender];
    const sql = "INSERT INTO users (ref,name, email, Password, admin, age,gender) VALUES (?,?,?,?,?,?,?)";
    con.query(sql, data, function (err, result) {
        if (err) {
          console.error(err);
          return res.status(500).send("Error inserting user into the database");
        }
        res.status(200).send("User registered successfully");
      });
    
  }
  



module.exports={registerUser} 