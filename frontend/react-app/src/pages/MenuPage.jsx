import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext.jsx";
import { useRole } from "../contexts/roleContexts.jsx";
import { checkAuth } from "../api/authApi/authApi.js";
import Navbar from "../components/Navbar.jsx";
import { RoleChangeRequestCard } from "../components/viewer/RoleChangeReqeustCard.jsx";
import {
  roleChangeRequest,
  getRoleChangeRequests,
} from "../api/authApi/viewerApi.js";

export default function MenuPage() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { role, setRole } = useRole();
  const url = import.meta.env.VITE_APP_API_URL;

  //UseStates for this Menu page
  const [roleChangeRequests, setRoleChangeRequests] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const data = await getRoleChangeRequests(setRoleChangeRequests);
    };
    callApi();
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
    if (role !== "viewer" && role) {
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
      <div className="text-white bg-zinc-900 overflow-hidden">
        <Navbar />
        <div className="w-full flex items-center justify-center px-4 py-10 md:py-16 border-b border-b-zinc-600">
          {/* Main Card */}
          <div
            className="
              w-full 
              max-w-2xl 
              bg-zinc-900 
              rounded-3xl 
              shadow-lg 
              p-6 md:p-10
              flex flex-col justify-between
              border border-zinc-700
            "
          >
            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                Request Author Access
              </h2>
              <p className="text-zinc-400 text-sm md:text-base">
                Submit a request to gain author privileges on the platform.
              </p>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-medium mb-3">
                As an Author, you will be able to:
              </h3>

              <ul className="list-disc list-inside space-y-2 text-zinc-300 text-sm md:text-base">
                <li>Create blogs</li>
                <li>Draft blogs before publishing</li>
                <li>Edit your existing blogs</li>
                <li>View statistics of your published blogs</li>
                <li>Manage unpublished or pending blog posts</li>
              </ul>

              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-zinc-800 rounded-xl text-zinc-400 text-xs md:text-sm">
                <p>
                  Note: Author access is granted after review by the admin team.
                  Misuse of privileges may result in revocation of access.
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="mt-8">
              <button
                onClick={async () => {
                  console.log("Hello world!");
                  await roleChangeRequest(setRoleChangeRequests);
                }}
                className="
                w-full 
                bg-zinc-700 
                hover:bg-zinc-600 
                active:bg-zinc-500
                transition-all duration-200
                py-3 
                rounded-xl 
                text-sm md:text-base 
                font-medium
                shadow-md
                "
              >
                Submit Request to be an Author
              </button>
            </div>
          </div>
        </div>
        <div className="w-full py-6 bg-zinc-900 flex flex-col justify-start items-start px-5 gap-2 pb-4">
          <p className="pb-2 text-zinc-500 uppercase font-semibold text-md pl-2  md:pl-2">
            R E Q U E S T S
          </p>
          <div
            className="w-[95vw] mx-auto flex justify-between px-6 py-4 
                    bg-zinc-900 border border-zinc-700 rounded-xl 
                    text-zinc-400 text-sm font-medium shadow-sm"
          >
            <p className="text-center w-[20%]">Request ID</p>
            <p className="text-center w-[20%]">Resolved By (User ID)</p>
            <p className="text-center w-[20%]">Request Date</p>
            <p className="text-center w-[20%]">Resolution Date</p>
          </div>

          {roleChangeRequests.map((element, index) => (
            <RoleChangeRequestCard
              key={element.requestId}
              index={index}
              requestId={element.requestId}
              resolvedAt={
                element.resolvedAt === null
                  ? "-"
                  : new Date(element.resolvedAt).toLocaleDateString("en-GB")
              }
              createdAt={new Date(element.createdAt).toLocaleDateString(
                "en-GB",
              )}
              resolvedBy={
                element.resolvedBy === null ? "-" : element.resolvedBy
              }
            />
          ))}
        </div>
        <footer className="border-t border-t-zinc-700 w-full h-[8vh] justify-center flex items-center font-bold text-lg text-zinc-700 bg-zinc-900">
          ©Anshul Patil • All rights reserved, 2026
        </footer>
        {/* <div className="w-full h-[100vh] bg-zinc-800"></div> */}
      </div>
    </>
  );
}
