const dotenv = require("dotenv");
dotenv.config();
const jwt=require('jsonwebtoken')
const db = require("../config");
const { registerValidation,loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");

function checkIfUserExists(req) {
  return new Promise((resolve, reject) => {
    console.log("Checking if user exists");
    let sqlverif = "SELECT * FROM users WHERE email= ? OR ref= ?";

    db.query(sqlverif, [req.body.email,req.body.ref], (err, result) => {
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
    console.log(req.body)
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
      
    }
  
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    // Create new user
    const data = [req.body.ref,req.body.name, req.body.email, hashedPassword,req.body.admin, req.body.age, req.body.gender];
    const sql = "INSERT INTO users (ref,name, email, Password, admin, age,gender) VALUES (?,?,?,?,?,?,?)";
    const userExists = await checkIfUserExists(req);
    if (userExists === false) {
      await db.query(sql, data, function (err, result) {
        if (err) {
          console.error(err);
          return res.status(500).send("Error inserting user into the database");
        }
        res.status(200).send("User registered successfully");
      });
    } else {
      res.status(400).send("User with that information already exists");
    }
  }
  




module.exports={registerUser,checkIfUserExists} 