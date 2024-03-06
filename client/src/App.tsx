import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";
import Home from "./views/Home";
import Login from "./views/Login";

const App = () => {
  // const { user } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          /> */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
