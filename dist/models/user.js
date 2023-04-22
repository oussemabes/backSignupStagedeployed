"use strict";

const {
  faker
} = require('@faker-js/faker');
const mysql = require('mysql');
const data = [];
for (let i = 0; i < 100; i++) {
  // Runs 5 times, with values of step 0 through 4.
  let randomName = faker.name.fullName();
  let randomEmail = faker.internet.email();
  let randomPassword = faker.internet.password();
  let randomBalance = faker.random.numeric(7);
  data.push([randomName, randomEmail, randomPassword, randomBalance]);
}
const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = "INSERT INTO users (name, email, password,balance) VALUES ?";
  db.query(sql, [data], function (err, result) {
    if (err) throw err;
    console.log("records inserted");
  });
});