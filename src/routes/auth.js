const {registerUser}=require("../controllers/userController")
const express = require("express");
const router = express.Router();
router.route('/register').post((req,res)=>{
  registerUser(req,res)
});

     
module.exports = router; 
     