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
        <div className="max-w-screen md:h-[4vw] h-[4vh] flex justify-center items-center text-white text-[1.5em] bg-zinc-900 border-b-[1px] border-zinc-600">
          <p className=" w-[97.5%] flex justify-center items-center">
            Create a Blog{" "}
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row   ">
          <div className="w-full min-h-[50vh] md:w-[60vw] md:min-h-[100vh] bg-zinc-800 flex justify-center items-center border-r-[2px] border-zinc-700">
            Input div
          </div>
          <div className="w-full min-h-[50vh] md:w-[40vw] md:min-h-[100vh]  bg-zinc-800 flex justify-center items-center">
            Preview div
          </div>
        </div>
      </div>
    </>
  );
}
