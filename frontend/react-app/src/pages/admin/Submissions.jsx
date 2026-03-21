import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext.jsx";
import { checkAuth } from "../../api/authApi/authApi.js";
import { useRole } from "../../contexts/roleContexts.jsx";

export default function Submissions() {
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
    if (role !== "admin" && role) {
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
      <div className="text-white bg-zinc-800 overflow-hidden">
        <Navbar />
        <div className="w-screen md:h-[4vw] h-[4vh] flex justify-center items-center text-white text-[1.5em] bg-zinc-900 border-b-[1px] border-zinc-600">
          <p className=" w-[97.5%] flex justify-center items-center">
            Submissions
          </p>
        </div>
        <div className="w-full  py-4 flex flex-col">
          <div className="border-[4px] border-zinc-700 rounded-lg w-[95vw] md:w-[97vw] md:min-h-[22.5vh] h-[25vh] gap-4 flex flex-col ml-2 py-2">
            <p className="pl-4 font-bold uppercase tracking-widest text-zinc-200">
              Summary
            </p>
            <div className="w-full md:h-full h-[70%] flex gap-4 flex-wrap md:justify-center justify-start items-center pl-2">
              <div className="h-[50%] w-[47%] md:h-[90%] md:w-[23%] border rounded-lg border-zinc-700 border-[3px] rounded-lg "></div>
              <div className="h-[50%] w-[47%] md:h-[90%] md:w-[24%] border rounded-lg border-zinc-700 border-[3px] rounded-lg "></div>
              <div className="h-[50%] w-[47%] md:h-[90%] md:w-[24%] border rounded-lg border-zinc-700 border-[3px] rounded-lg "></div>
              <div className="h-[50%] w-[47%] md:h-[90%] md:w-[24%] border rounded-lg border-zinc-700 border-[3px] rounded-lg "></div>
            </div>
          </div>
          <div className="w-[100vw] h-[60vh] border-t mt-5"></div>
        </div>
      </div>
    </>
  );
}
