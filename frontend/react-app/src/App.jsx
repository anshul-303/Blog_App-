import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <BrowserRouter>

        <Toaster
          toastOptions={{
            // Default style for all toasts
            style: {
              background: "#fff",
              color: "#333",
              border: "1px solid #e2e8f0", // Light grey border for a premium feel
              padding: "16px",
              borderRadius: "10px",
            },
            // Customize the icons' colors specifically
            success: {
              iconTheme: {
                primary: "#10B981", // Emerald green tick
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444", // Bright red cross
                secondary: "#fff",
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
