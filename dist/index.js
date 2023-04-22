"use strict";

const {
  app
} = require('./app');
const http = require('http');
require('dotenv').config();
const server = http.createServer(app);
const db = require('./config');
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
server.listen(3004, console.log(`server is running at port http://${process.env.USER_SERVER}`));