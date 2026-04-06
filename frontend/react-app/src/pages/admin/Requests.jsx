import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useRole } from "../../contexts/roleContexts";
import { checkAuth } from "../../api/authApi/authApi";
import AdminRoleChangeRequestCard from "../../components/admin/AdminRoleChangeRequestCard.jsx";
import { getAdminRoleChangeRequests } from "../../api/authApi/adminApi.js";

export default function Requests() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { role, setRole } = useRole();
  const url = import.meta.env.VITE_APP_API_URL;

  //The useStates usd in the respective Requests page
  const [roleChangeRequestsList, setRoleChangeRequestsLists] = useState([]);

  useEffect(() => {
    const getRoleChangeRequestsListAPI = async () => {
      console.log("Fetching admin role change requests!");
      const data = await getAdminRoleChangeRequests();
      setRoleChangeRequestsLists(data.rows);
    };
    getRoleChangeRequestsListAPI();
  }, []);

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
    <div className="text-white bg-zinc-900 overflow-hidden">
      <Navbar />
      <div className="w-full min-h-[40vh] py-9 px-4 rounded-lg border border-zinc-800 flex justify-center items-center">
        <div className="w-[70%] bg-zinc-900 rounded-xl p-6 flex flex-col gap-5 border border-zinc-800 transition-all duration-300 hover:bg-zinc-800">
          {/* Heading */}
          <h2 className="text-white font-bold text-xl tracking-wide">
            Role Change Requests
          </h2>

          {/* Divider */}
          <div className="w-full h-[1px] bg-zinc-800"></div>

          {/* Disclaimer Points */}
          <ul className="list-disc pl-6 text-base text-zinc-300 space-y-3 leading-relaxed">
            <li>
              Accepting a request upgrades the user from viewer to author.
            </li>
            <li>
              Authors can create, manage drafts, and publish blog content.
            </li>
            <li>Declining keeps the user restricted to viewer permissions.</li>
            <li>This action directly affects content access and control.</li>
          </ul>
        </div>
      </div>
      <div className="w-full min-h-[40vh] py-3 px-3 bg-zinc-900 flex flex-col justify-start items-start gap-2 pb-4">
        <p className=" w-full text-xl pb-2 text-zinc-500 uppercase font-semibold text-md pl-2  md:pl-2 flex justify-center items-center ">
          R E Q U E S T S
        </p>
        {roleChangeRequestsList.map((element, index) => (
          <AdminRoleChangeRequestCard
            key={element.requestedId}
            requestId={element.requestId}
            index={index}
            name={element.name}
            requestedBy={element.requestedBy}
            createdAt={new Date(element.createdAt).toLocaleDateString("en-GB")}
          />
        ))}
        {/* <AdminRoleChangeRequestCard/> */}
      </div>
      <footer className="border-t border-t-zinc-700 w-full h-[8vh] justify-center flex items-center font-bold text-lg text-zinc-700 bg-zinc-900">
        ©Anshul Patil • All rights reserved, 2026
      </footer>

      {/* <div className="w-full h-[100vh] bg-zinc-800"></div> */}
    </div>
  );
}
