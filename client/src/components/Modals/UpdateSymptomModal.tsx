import React, { useState } from "react";
import axios from "axios";
const UpdateSymptomModal = ({ symptom_param, issues }) => {
  const [name, setName] = useState(symptom_param.symptom);
  const [selectedIssues, setSelectedIssues] = useState(
    symptom_param.issues.map((s) => s.id)
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && selectedIssues.length > 0) {
      const data = {
        symptom: name,
        issues: selectedIssues.map((s) => ({ id: s })),
      };
      try {
        await axios.put(`/api/rules/symptom/${symptom_param.id}`, data);
        alert("Symptom added successfully");
        window.location.reload();
      } catch (error) {
        alert("Error adding issue");
      }
    }
  };
  return (
    <dialog id={`update_symptom_modal_${symptom_param.id}`} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add a new Symptom</h3>
        <form className="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            className="input w-full"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <h1 className="font-bold my-2">Select issues</h1>
          <div>
            {issues.map((issue: Symptom) => (
              <div key={issue.id}>
                <input
                  type="checkbox"
                  checked={selectedIssues.includes(issue.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIssues([...selectedIssues, issue.id]);
                    } else {
                      setSelectedIssues(
                        selectedIssues.filter((id) => id !== issue.id)
                      );
                    }
                  }}
                />
                <label className="cursor-pointer">{issue.issue}</label>
              </div>
            ))}
          </div>
          <button className="btn mt-2 w-full bg-green-500 text-black">
            Submit
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UpdateSymptomModal;
