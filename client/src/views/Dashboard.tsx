import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);

  useEffect(() => {
    console.log(currentUser);
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
      </div>
    </div>
  );
};

export default Dashboard;
