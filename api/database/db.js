const sqlite3 = require("sqlite3").verbose();
const { issues, symptoms, issueSymptoms } = require("./rules");
const bcrypt = require("bcryptjs");


const db = new sqlite3.Database("./database/data.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the database.");
  }
});

module.exports = db;
