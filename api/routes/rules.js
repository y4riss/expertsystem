const router = require("express").Router();
const { requireAuth } = require("../middlewares/requireAuth");
const { getIssues, getSymptoms, addIssue, addSymptom, deleteIssue, deleteSymptom, updateIssue, updateSymptom } = require("../controllers/rules");



router.get("/issues", requireAuth, getIssues);
router.get("/symptoms", requireAuth, getSymptoms);
router.post("/issue", requireAuth, addIssue);
router.post("/symptom", requireAuth, addSymptom);
router.delete("/issue/:id", requireAuth, deleteIssue);
router.delete("/symptom/:id", requireAuth, deleteSymptom);
router.put("/issue/:id", requireAuth, updateIssue);
router.put("/symptom/:id", requireAuth, updateSymptom);


module.exports = router;
