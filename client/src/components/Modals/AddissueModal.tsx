import React, { useState } from "react";
import axios from "axios";
const AddissueModal = ({ symptoms }) => {
  const [name, setName] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, selectedSymptoms);
    if (name && selectedSymptoms.length > 0) {
      const data = {
        issue: name,
        symptoms: selectedSymptoms.map((s) => ({ id: s })),
      };
      try {
        await axios.post("/api/rules/issue", data);
        alert("Issue added successfully");
        window.location.reload();
      } catch (error) {
        alert("Error adding issue");
      }
    }
  };
  return (
    <dialog id="add_issue_modal" className="modal">
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
                  id={symptom.id}
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
                <label className="cursor-pointer" htmlFor={symptom.id}>
                  {symptom.symptom}
                </label>
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

export default AddissueModal;
