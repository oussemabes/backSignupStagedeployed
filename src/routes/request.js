const {   Display,
    createRequest,
    updateRequestState,
    countRequests,
    countAcceptedRequest}=require("../controllers/requestController")
const express = require("express");
const router = express.Router();
router.route('/display').get((req,res)=>{
    Display(req,res)
}); 
router.route('/createRequest').post((req,res)=>{
    createRequest(req,res)
}); 
router.route('/updateRequestState/:id/:ref/:study_id').patch((req,res)=>{
    updateRequestState(req,res)
}); 
router.route('/count').get((req,res)=>{
    countRequests(req,res)
}); 
router.route('/countaccepted').get((req,res)=>{
    countAcceptedRequest(req,res)
}); 


module.exports = router; 
      