const { app } = require("./app");
const http = require("http");
require("dotenv").config();
const server = http.createServer(app);
const db = require("./config");
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
server.listen(
  process.env.USER_PORT,
  console.log(`server is running at port http://${process.env.USER_SERVER}`)
);
