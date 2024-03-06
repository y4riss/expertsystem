// import { useState } from "react";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Admin } from "../types/interface";
import { AxiosError } from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState("" as string);

  const { currentUser }: Admin = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr("");
    try {
      await login({ username, password });
      navigate("/dashboard");
    } catch (error: AxiosError) {
      setErr(error.response?.data.error);
    }
  };

  if (currentUser && currentUser == "loading") {
    return <div></div>;
  }

  if (currentUser) navigate("/dashboard");

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center p-8 "
      >
        <div className="login-title">
          <h1 className="text-2xl font-bold">Login</h1>
        </div>
        <div className="relative">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            className="input"
            placeholder="Username"
          />
          <i className="material-icons absolute left-0 bottom-4">person</i>
        </div>
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            className="input"
            placeholder="Password"
          />
          <i className="material-icons absolute left-0 bottom-4">lock</i>
        </div>
        <button
          type="submit"
          className="btn w-full bg-purple-600 text-white hover:bg-purple-900"
        >
          Sign In
        </button>
      </form>
      {err && <div className="text-red-600 font-bold">{err}</div>}
    </div>
  );
};

export default Login;
