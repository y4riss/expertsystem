const router = require("express").Router();
const { findIssue } = require("../controllers/diagnosis");
router.post("/", findIssue);

module.exports = router;
