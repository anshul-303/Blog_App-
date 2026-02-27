import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../../api/authApi/authApi.js";
import { useAuth } from "../../contexts/authContext.jsx";
import { checkAuth } from "../../api/authApi/authApi.js";
import { useRole } from "../../contexts/roleContexts.jsx";

export default function CreateBlog() {
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
    if (role !== "author" && role) {
      navigate("/403");
      return;
    }
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
      <div className="overflow-hidden">
        <Navbar />
        <div className="h-screen max-w-screen flex flex-col justify-top p-3 items-center text-white bg-zinc-900  border border-white border-[2px] ">
          <input type="text" className="bg-zinc-800  text-center text-[1em] w-[95%] h-[2em] border border-[2px] border-white rounded-sm" placeholder="Enter the title of the blog"/>
        </div>

      </div>
    </>
  );
}
