const db = require("../database/db");
const { formatIssues, formatSymptoms } = require("../utils/format");

// get issues
const getIssues = (req, res) => {
  const stmt =
    db.prepare(`SELECT Issues.id AS id, Issues.name AS issue, GROUP_CONCAT(Symptoms.id || '-' || Symptoms.name, ', ') AS symptoms
FROM Issues
JOIN IssueSymptomMapping ON Issues.id = IssueSymptomMapping.issue_id
JOIN Symptoms ON IssueSymptomMapping.symptom_id = Symptoms.id
GROUP BY Issues.id;
`);

  stmt.all((err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(200).json(formatIssues(rows));
    }
  });
  stmt.finalize();
};

// get symptoms
const getSymptoms = (req, res) => {
  const stmt =
    db.prepare(`SELECT Symptoms.id AS id, Symptoms.name AS symptom, GROUP_CONCAT(Issues.id || '-' || Issues.name, ', ') AS issues
FROM Symptoms  
JOIN IssueSymptomMapping ON Symptoms.id = IssueSymptomMapping.symptom_id
JOIN Issues ON IssueSymptomMapping.issue_id = Issues.id
GROUP BY Symptoms.id;
`);
  stmt.all((err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(200).json(formatSymptoms(rows));
    }
  });
  stmt.finalize();
};

// add a new issue
const addIssue = (req, res) => {
  const { issue, symptoms } = req.body;
  const stmt = db.prepare("INSERT INTO Issues (name) VALUES (?)");
  stmt.run(issue, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      const issueId = this.lastID;
      const symptomIds = symptoms.map((symptom) => symptom.id);
      const insertStmt = db.prepare(
        `INSERT INTO IssueSymptomMapping (issue_id, symptom_id) VALUES (?, ?)`
      );
      for (let i = 0; i < symptomIds.length; i++) {
        insertStmt.run(issueId, symptomIds[i], function (err) {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
          }
        });
      }
      insertStmt.finalize();
      res.status(201).json({ message: "Issue added successfully" });
    }
  });
  stmt.finalize();
};

// add a new symptom to issues
const addSymptom = (req, res) => {
  const { symptom, issues } = req.body;
  const stmt = db.prepare("INSERT INTO Symptoms (name) VALUES (?)");
  stmt.run(symptom, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      const symptomId = this.lastID;
      const issuesIds = issues.map((issue) => issue.id);
      const insertStmt = db.prepare(
        `INSERT INTO IssueSymptomMapping (issue_id, symptom_id) VALUES (?, ?)`
      );
      for (let i = 0; i < issuesIds.length; i++) {
        insertStmt.run(issuesIds[i], symptomId, function (err) {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
          }
        });
      }
      insertStmt.finalize();
      res.status(201).json({ message: "Symptom added successfully" });
    }
  });
  stmt.finalize();
};

// delete issue
const deleteIssue = (req, res) => {
  const stmt = db.prepare("DELETE FROM Issues WHERE id = ?");
  stmt.run(req.params.id, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(200).json({ message: "Issue deleted successfully" });
    }
  });
  stmt.finalize();
};

// delete symptom
const deleteSymptom = (req, res) => {
  const stmt = db.prepare("DELETE FROM Symptoms WHERE id = ?");
  stmt.run(req.params.id, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(200).json({ message: "Symptom deleted successfully" });
    }
  });
  stmt.finalize();
};

// update issue

const updateIssue = (req, res) => {
  const { issue, symptoms } = req.body;
  const stmt = db.prepare("UPDATE Issues SET name = ? WHERE id = ?");
  stmt.run(issue, req.params.id, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      const issueId = req.params.id;
      const symptomIds = symptoms.map((symptom) => symptom.id);
      const deleteStmt = db.prepare(
        `DELETE FROM IssueSymptomMapping WHERE issue_id = ?`
      );
      deleteStmt.run(issueId, function (err) {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Internal server error" });
        } else {
          const insertStmt = db.prepare(
            `INSERT INTO IssueSymptomMapping (issue_id, symptom_id) VALUES (?, ?)`
          );
          for (let i = 0; i < symptomIds.length; i++) {
            insertStmt.run(issueId, symptomIds[i], function (err) {
              if (err) {
                console.log(err);
                res.status(500).json({ message: "Internal server error" });
              }
            });
          }
          insertStmt.finalize();
          res.status(200).json({ message: "Issue updated successfully" });
        }
      });
    }
  });
  stmt.finalize();
};

// update symptom
const updateSymptom = (req, res) => {
  const { symptom, issues } = req.body;
  const stmt = db.prepare("UPDATE Symptoms SET name = ? WHERE id = ?");
  stmt.run(symptom, req.params.id, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      const symptomId = req.params.id;
      const issuesIds = issues.map((issue) => issue.id);
      const deleteStmt = db.prepare(
        `DELETE FROM IssueSymptomMapping WHERE symptom_id = ?`
      );
      deleteStmt.run(symptomId, function (err) {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Internal server error" });
        } else {
          const insertStmt = db.prepare(
            `INSERT INTO IssueSymptomMapping (issue_id, symptom_id) VALUES (?, ?)`
          );
          for (let i = 0; i < issuesIds.length; i++) {
            insertStmt.run(issuesIds[i], symptomId, function (err) {
              if (err) {
                console.log(err);
                res.status(500).json({ message: "Internal server error" });
              }
            });
          }
          insertStmt.finalize();
          res.status(200).json({ message: "Symptom updated successfully" });
        }
      });
    }
  });
  stmt.finalize();
};
module.exports = {
  getIssues,
  getSymptoms,
  addIssue,
  addSymptom,
  deleteIssue,
  deleteSymptom,
  updateIssue,
  updateSymptom,
};
