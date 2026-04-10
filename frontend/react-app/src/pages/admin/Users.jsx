import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext.jsx";
import { checkAuth } from "../../api/authApi/authApi.js";
import { useRole } from "../../contexts/roleContexts.jsx";
import UserDisplayCard from "../../components/admin/UserDisplayCard.jsx";
import { getUsersList } from "../../api/authApi/adminApi.js";

export default function Users() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { role, setRole } = useRole();
  const url = import.meta.env.VITE_APP_API_URL;

  //Important use states for users page
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const callgetUsers = async () => {
      const data = await getUsersList();
      console.log(data);
      setUsersList(data.users);
    };
    callgetUsers();
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
    <div className="text-white bg-zinc-800 overflow-hidden">
      <Navbar />
      <div className="w-full h-[10vh] font-bold text-white text-2xl flex justify-center items-center bg-zinc-900 ">
        Users
      </div>
      <div className="w-full p-4 justify-start items-center flex flex-col bg-zinc-900 gap-4 min-h-[90vh]">
        {usersList.map((user) => (
          <UserDisplayCard
            key={user.userId}
            userId={user.userId}
            name={user.name}
            email={user.email}
            role={user.role}
          />
        ))}
      </div>
      <footer className="border-t border-t-zinc-700 w-full h-[8vh] justify-center flex items-center font-bold text-lg text-zinc-700 bg-zinc-900">
        ©Anshul Patil • All rights reserved, 2026
      </footer>
      {/* <div className="w-full h-[100vh] bg-zinc-900"></div> */}
    </div>
  );
}
