import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../api/authApi/authApi.js";
import { useAuth } from "../contexts/authContext.jsx";
import { useRole } from "../contexts/roleContexts.jsx";
import { checkAuth } from "../api/authApi/authApi.js";
import Navbar from "../components/Navbar.jsx";

export default function MenuPage() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { role, setRole } = useRole();
  const url = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const callCheckAuthAPI = async () => {
      await checkAuth(navigate, setIsAuthenticated, setRole);
    };
    if (!isAuthenticated) {
      callCheckAuthAPI();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Guard: Role-based access
    // if (role !== "author" && role) {
    //   navigate("/403");
    //   return;
    // }
    const fetchtrial = async () => {
      const res = await fetch(`${url}/test`, {
        credentials: "include",
      });
      if (res.status === 403 || res.status === 401) {
        const newres = await fetch(`${url}/auth/refresh`, {
          credentials: "include",
        });
        if (newres.ok) {
          fetchtrial();
        } else {
          throw Error("The access token is not there.");
        }
      }
    };

    fetchtrial();
  }, [isAuthenticated, role, navigate]);

  return (
    <>
      <Navbar />
      <div className="justify-center flex flex-col items-center h-screen w-screen text-center text-[2em] bg-zinc-900 text-white">
        <button
          className="w-[20%] p-1 border rounded-sm hover:bg-zinc-800 active:bg-zinc-700
        active:scale-95 transition-transform duration-150
        "
          onClick={() => {
            LogoutUser(navigate, setIsAuthenticated, setRole);
          }}
        >
          Log out
        </button>
      </div>
    </>
  );
}
