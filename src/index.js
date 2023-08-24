const { app } = require("./app");
const http = require("http");
require("dotenv").config();
const server = http.createServer(app);
const db = require("./config");
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
async function createTables() {
  await db.query(
    "CREATE TABLE IF NOT EXISTS users (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,name VARCHAR(30), email VARCHAR(30), password VARCHAR(255),admin VARCHAR(30));",
    function (err) {
      if (err) throw err;
      console.log("admins TABLE created.");
    }
  ); 







  await db.query(
    "CREATE TABLE IF NOT EXISTS requests (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, ref INT(11) UNSIGNED, study_id INT(11) UNSIGNED,  connection_id VARCHAR(255),state VARCHAR(10), date DATETIME);",
    function (err) {
      if (err) throw err;
      console.log("requests TABLE created.");
    }
  );
}
 
 
 
createTables()

server.listen(
  3004,
  console.log(`server is running at port http://3004`)
);
 