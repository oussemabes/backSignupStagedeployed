const {registerUser,loginUser,displayUsersByID}=require("../controllers/userController")
const express = require("express");
const router = express.Router();
router.route('/register').post((req,res)=>{
  registerUser(req,res)
}); 
router.route('/login').post((req,res)=>{
  loginUser(req,res)
}); 
router.route('/displaybyid/:user_id').get((req,res)=>{
  displayUsersByID(req,res)
});  // 
module.exports = router; 
      