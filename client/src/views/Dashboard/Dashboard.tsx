import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Issue } from "../types/interface";
import Issues from "../../components/Issues";
import Symptoms from "../../components/Symptoms";

const Dashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const [issues, setIssues] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError("");
    const getIssues = async () => {
      try {
        const res = await axios.get("/api/rules/issues");
        console.log(res.data);
        setIssues(res.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
      }
    };
    const getSymptoms = async () => {
      try {
        const res = await axios.get("/api/rules/symptoms");
        setSymptoms(res.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
      }
    };
    getIssues();
    getSymptoms();
  }, [currentUser]);
  if (currentUser && currentUser == "loading") {
    return <div></div>;
  }
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex">
      <div className="left relative h-screen w-[300px] flex flex-col  items-center">
        <p className="text-white pt-10 pb-3">Welcome, {currentUser.username}</p>
        <div className="img  bg-white rounded-full w-[150px] h-[150px] overflow-hidden">
          <img src="https://cdn-icons-png.flaticon.com/512/2206/2206368.png" />
        </div>
        <div className="absolute bottom-10 w-full p-4">
          <button className="btn w-full" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="container p-4  flex flex-col items-center">
        <h1 className="font-bold text-3xl">Admin Dashboard Portal</h1>
        <div className="flex flex-col items-center bg-red-300 w-full">
          <h2 className="font-bold text-2xl 0">Issues</h2>
          <Issues issues={issues} />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-2xl">Symptoms</h2>
          <Symptoms symptoms={symptoms} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
