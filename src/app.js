const express = require("express");
const app = express();
require('dotenv').config()
const cors =require('cors')
const bodyparser = require('body-parser')
app.use(cors());
app.use(express.json())

// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true 
}))  

const path = require("path");
 


app.use(express.static(path.join(__dirname, '/public')));
//import routes 
const authRoute=require('./routes/auth')
const requestRoute=require('./routes/request')

//route middlewares 
app.use('/backend/user',authRoute)
app.use('/backend/request',requestRoute)


module.exports = { app };
 