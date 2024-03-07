const { formatIssues } = require("../utils/format");

const db = require("../database/db");
const findIssue = (req, res) => {
  const symptoms = req.body;
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
      const issues = formatIssues(rows);
      const mostLikelyIssues = {};
      for (let i = 0; i < issues.length; i++) {
        const issue = issues[i];
        const symptomsArr = issue.symptoms;
        mostLikelyIssues[issue.id] = 0;
        console.log("symptoms array : ", symptomsArr);
        console.log("symptoms : ", symptoms);
        symptomsArr.forEach((s) => {
          if (symptoms.includes(s.id)) {
            mostLikelyIssues[issue.id]++;
          }
        });
      }

      let sortable = [];
      for (let issue in mostLikelyIssues) {
        sortable.push([issue, mostLikelyIssues[issue]]);
      }
      sortable.sort(function (a, b) {
        return b[1] - a[1];
      });
      let result = [];
      for (let i = 0; i < Math.min(3, sortable.length); i++) {
        result.push(parseInt(sortable[i][0]));
      }
      console.log(sortable);
      return res.json(result);
    }
  });
};

module.exports = { findIssue };
