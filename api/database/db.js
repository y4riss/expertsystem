const sqlite3 = require("sqlite3").verbose();
const { issues, symptoms, issueSymptoms } = require("./rules");

// SQL statements for table creation
const createIssuesTable = `CREATE TABLE IF NOT EXISTS Issues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);`;

const createSymptomsTable = `CREATE TABLE IF NOT EXISTS Symptoms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL
);`;

const createIssueSymptomsTable = `CREATE TABLE IF NOT EXISTS IssueSymptoms (
    issue_id INTEGER,
    symptom_id INTEGER,
    PRIMARY KEY (issue_id, symptom_id),
    FOREIGN KEY (issue_id) REFERENCES Issues(id),
    FOREIGN KEY (symptom_id) REFERENCES Symptoms(id)
);`;

const createAdminTable = `CREATE TABLE IF NOT EXISTS Admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);`;

// Open database connection
const db = new sqlite3.Database("diagnosis.db", (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  // Execute table creation statements
  try {
    db.serialize(() => {
      db.run(createIssuesTable);
      db.run(createSymptomsTable);
      db.run(createIssueSymptomsTable);
      db.run(createAdminTable);
    });
    db.serialize(() => {
      // insert admin
      const data = {
        username: "admin",
        password: bcrypt.hashSync("admin", 10),
      };

      const stmt = db.prepare(
        "INSERT INTO Admin (username, password) VALUES (?, ?)"
      );
      stmt.run(data.username, data.password);
      stmt.finalize();
    });
  } catch (error) {
    console.log(error);
  }

  console.log("Connected to the diagnosis database.");
});

const bcrypt = require("bcryptjs");

// SQL statements for dropping tables
// const dropIssuesTable = `DROP TABLE IF EXISTS Issues;`;
// const dropSymptomsTable = `DROP TABLE IF EXISTS Symptoms;`;
// const dropIssueSymptomsTable = `DROP TABLE IF EXISTS IssueSymptoms;`;
// const dropAdminTable = `DROP TABLE IF EXISTS Admin;`;

// Execute table dropping statements
// db.serialize(() => {
//   db.run(dropIssueSymptomsTable);
//   db.run(dropSymptomsTable);
//   db.run(dropIssuesTable);
//   db.run(dropAdminTable);
// });

// Close database connection
module.exports = db;