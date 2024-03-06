import React, { useState } from "react";
import axios from "axios";
const UpdateIssueModal = ({ issue_param, symptoms }) => {
  const [name, setName] = useState(issue_param.issue);
  const [selectedSymptoms, setSelectedSymptoms] = useState(
    issue_param.symptoms.map((s) => s.id)
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && selectedSymptoms.length > 0) {
      const data = {
        issue: name,
        symptoms: selectedSymptoms.map((s) => ({ id: s })),
      };
      console.log(data);
      try {
        await axios.put(`/api/rules/issue/${issue_param.id}`, data);
        alert("Issue updated successfully");
        window.location.reload();
      } catch (error) {
        alert("Error adding issue");
      }
    }
  };
  return (
    <dialog id={`update_issue_modal_${issue_param.id}`} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add a new issue</h3>
        <form className="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            className="input w-full"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <h1 className="font-bold my-2">Select symptoms</h1>
          <div>
            {symptoms.map((symptom: Symptom) => (
              <div key={symptom.id}>
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(symptom.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSymptoms([...selectedSymptoms, symptom.id]);
                    } else {
                      setSelectedSymptoms(
                        selectedSymptoms.filter((id) => id !== symptom.id)
                      );
                    }
                  }}
                />
                <label className="cursor-pointer">{symptom.symptom}</label>
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

export default UpdateIssueModal;
