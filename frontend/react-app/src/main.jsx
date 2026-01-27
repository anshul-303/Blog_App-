import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./contexts/authContext.jsx";
import { RoleContextProvider } from "./contexts/roleContexts.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <RoleContextProvider>
      <App />
    </RoleContextProvider>
  </AuthContextProvider>,
);
