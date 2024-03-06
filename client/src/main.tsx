import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./context/authContext.jsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <Theme>
      <App />
    </Theme>
  </AuthContextProvider>
);
