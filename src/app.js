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


//import routes
const authRoute=require('./routes/auth')
const verifyTokenRoute=require('./routes/verifyToken')

//route middlewares 
app.use('/backend/user',authRoute)
app.use('/backend/verifyToken',verifyTokenRoute)

module.exports = { app };
