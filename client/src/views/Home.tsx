import React, { useEffect, useState } from "react";
import axios from "axios";

interface Symptom {
  id: number;
  symptom: string;
  issues: Array<Issue>;
}

const Home = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [issues, setIssues] = useState([] as Array<Issue>);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSymptoms, setSelectedSymptoms] = useState([] as Array<number>);
  const [potentialIssues, setPotentialIssues] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0)
      return alert("Please select at least one symptom");
    try {
      const res = await axios.post("/api/diagnosis", selectedSymptoms);
      console.log(res.data);
      const result: Array<Issue> = [];
      for (let i = 0; i < issues.length; i++) {
        if (res.data.includes(issues[i].id)) {
          result.push(issues[i].issue);
        }
      }
      setPotentialIssues(result);
      setUserInput("");
      console.log("potential issues: ", potentialIssues);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getSymptoms = async () => {
      try {
        const res = await axios.get("/api/rules/symptoms");
        setLoading(false);
        setSymptoms(res.data);
      } catch (error) {
        setError("Error fetching symptoms");
      }
    };
    const getIssues = async () => {
      try {
        const res = await axios.get("/api/rules/issues");
        setIssues(res.data);
      } catch (error) {
        console.log("Could not fetch data");
      }
    };
    getSymptoms();
    getIssues();
  }, []);

  return (
    <div className=" flex flex-col items-center w-full mb-10">
      <div className="wrap w-3/4">
        <div className="header flex flex-col p-4 mt-10 justify-center items-center">
          <h1 className="text-6xl">Damage Diagnosis</h1>
          <h4 className="text-2xl mt-8 ml-8">
            Detecting defective computer components
          </h4>
        </div>

        <div className="form-container flex flex-col  w-full">
          <form className=" p-10 flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="" className="mb-3">
              Describe some symptoms you observed{" "}
            </label>
            <input
              type="text"
              className="input"
              placeholder="blue screen, noisy fans, ..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <div className="symptoms-wrap">
              <h1 className="text-3xl my-8">
                Select one or more symptoms from the ones below
              </h1>
              <div className="symptoms text-lg">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  symptoms.map((symptom: Symptom) => (
                    <div className="symptom" key={symptom.id}>
                      <input
                        type="checkbox"
                        name={symptom.symptom}
                        id={symptom.id}
                        value={symptom.id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSymptoms([
                              ...selectedSymptoms,
                              symptom.id,
                            ]);
                          } else {
                            setSelectedSymptoms(
                              selectedSymptoms.filter((id) => id !== symptom.id)
                            );
                          }
                        }}
                      />
                      <label
                        className="ml-2 mb-6 cursor-pointer"
                        htmlFor={symptom.id}
                      >
                        {symptom.symptom}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </div>
            <button
              type="submit"
              className=" my-10 btn w-full bg-purple-600 text-white hover:bg-purple-900"
            >
              Submit
            </button>
          </form>
          {potentialIssues.length > 0 && (
            <div className="">
              <h1 className="text-2xl mb-4">
                Here are some potential issues your computer may suffer from
              </h1>
              {potentialIssues.length > 0 && (
                <div className="result">
                  <ul>
                    {potentialIssues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
