const {registerUser,loginUser}=require("../controllers/userController")
const express = require("express");
const router = express.Router();
router.route('/register').post((req,res)=>{
  registerUser(req,res)
});
router.route('/login').post((req,res)=>{
  loginUser(req,res)
});


module.exports = router;
