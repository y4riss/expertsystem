import React, { useState } from "react";
import axios from "axios";
const AddsymptomModal = ({ issues }) => {
  const [name, setName] = useState("");
  const [selectedIssues, setSelectedIssues] = useState([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, selectedIssues);
    if (name && selectedIssues.length > 0) {
      const data = {
        symptom: name,
        issues: selectedIssues.map((s) => ({ id: s })),
      };
      console.log(data);
      try {
        await axios.post("/api/rules/symptom", data);
        alert("Symptom added successfully");
        window.location.reload();
      } catch (error) {
        alert("Error adding issue");
      }
    }
  };
  return (
    <dialog id="add_symptom_modal" className="modal">
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
                  id={issue.id*900}
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
                <label className="cursor-pointer" htmlFor={issue.id*900}>
                  {issue.issue}
                </label>
              </div>
            ))}
          </div>
          <button className="btn mt-2 w-full bg-green-500 text-black">Submit</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddsymptomModal;
