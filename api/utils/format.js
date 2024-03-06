function helper(x) {
  return x.split(", ").map((x) => {
    const [id, name] = x.split("-");
    return { id: parseInt(id), name };
  });
}

function formatIssues(result) {
  return result.map((item) => {
    return {
      id: item.id,
      issue: item.issue,
      symptoms: helper(item.symptoms),
    };
  });
}

function formatSymptoms(result) {
  return result.map((item) => {
    return {
      id: item.id,
      symptom: item.symptom,
      issues: helper(item.issues),
    };
  });
}

module.exports = { formatIssues , formatSymptoms };
